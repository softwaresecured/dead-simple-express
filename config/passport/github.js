//
// Sign in with Google.
//

'use strict';

var mongoose = require('mongoose');
var GithubStrategy = require('passport-github').Strategy;
var config = require('../');
var User = mongoose.model('User');

module.exports = new GithubStrategy(config.github, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ github: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Github account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.github = profile.id;
          user.tokens.push({kind: 'github', accessToken: accessToken});
          user.profile.name = user.profile.name || profile.displayName;
          user.save(function(err) {
            req.flash('info', { msg: 'Github account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({github: profile.id}, function(err, existingUser) {
      if (existingUser) { return done(null, existingUser); }
      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Github manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.email = profile._json.email;
          user.github = profile.id;
          user.tokens.push({kind: 'github', accessToken: accessToken});
          user.profile.name = profile.displayName;

          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
});
