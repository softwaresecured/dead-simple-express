'use strict';

var _ = require('lodash');
var async = require('async');
var passport = require('passport');

var db = require('../../config/mongoose');
var User = db.model('User');

var loginHeaderInfo = {
  title: 'Login',
  description: 'login'
};

var headerInfo = {
  title: 'Login',
  description: 'login'
};

//
// GET /
// login page.
//
module.exports.getLogin = function(req, res) {
  if (req.user) { return res.redirect('/'); }
  res.render('account/login', loginHeaderInfo);
};

//
// POST /login
// Sign in using email and password.
//
module.exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

//
// GET /
// logout page.
//
module.exports.getLogout = function(req, res) {
  req.logout();
  res.redirect('/');
};

//
// GET /signup
// Signup page.
//
module.exports.getSignup = function(req, res) {
  if (req.user) { return res.redirect('/'); }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

//
// POST /signup
// Create a new local account.
//
module.exports.postSignup = function(req, res, next) {
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password must be at least 4 characters long').len(4);
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var email =  req.body.email;
  var password =  req.body.password;

  var user = new User({
    email: email,
    password: password
  });

  User.findOne({email: email}, function(err, existingUser) {
    if (existingUser) {
      req.flash('errors', {msg: 'Account with that email address already exists.'});
      return res.redirect('/signup');
    }
    user.save(function(err) {
      if (err) { return next(err); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
};

//
//  GET /account
//  Profile page.
//
module.exports.getAccount = function(req, res) {
  res.render('account/profile', headerInfo);
};

//
//  POST /account/profile
//  Update profile information.
//
module.exports.postUpdateProfile = function(req, res, next) {
  req.assert('email', 'Email is not valid').notEmpty().isEmail();
  req.assert('name', 'Name is not valid').notEmpty().matches(/[A-Za-z\s]/g);

  req.sanitize('email').toString();
  req.sanitize('name').toString();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  var email = req.body.email;
  var name = req.body.name;
  var gender = req.body.gender;
  var location = req.body.location;
  var website = req.body.website;

  var user = req.user;

  user.email = email;
  user.profile.name = name;
  user.profile.gender = gender;
  user.profile.location = location;
  user.profile.website = website;

  async.series([function(callback) {

    user.save(function(err) {
      if (err) { return callback(err); }
      callback();
    });

  }], function(err) {
    if (err) { return next(err); }

    req.flash('success', {msg: 'Profile information updated.'});
    res.redirect('/account');
  });
};

//
// POST /account/password
// Update current password.
//
module.exports.postUpdatePassword = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function(err, user) {
    if (err) { return next(err); }

    user.password = req.body.password;

    user.save(function(err) {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

//
//  POST /account/delete
//  Delete user account.
//  @param id - User ObjectId
//
module.exports.postDeleteAccount = function(req, res, next) {
  User.remove({_id: req.user.id}, function(err) {
    if (err) { return next(err);}
    req.logout();
    req.flash('info', {msg: 'Your account has been deleted.'});
    res.redirect('/');
  });
};

//
//  GET /account/unlink/:provider
//  Unlink OAuth2 provider from the current user.
//  @param provider
//  @param id - User ObjectId
//
module.exports.getOauthUnlink = function(req, res, next) {
  var provider = req.params.provider;

  var user = req.user;

  if (user.tokens.length > 1) {
    user[provider] = undefined;
    user.tokens = _.reject(user.tokens, function(token) { return token.kind === provider; });
  } else {
    req.flash('errors', {msg: 'Cant unlink - need at least one linked account'});
    return res.redirect('/account');
  }

  async.series([function(callback) {

    user.save(function(err) {
      if (err) { return callback(err); }
      callback();
    });

  }], function(err) {
    if (err) { return next(err); }

    req.flash('success', {msg: provider + ' account has been unlinked.'});
    res.redirect('/account');
  });
};

