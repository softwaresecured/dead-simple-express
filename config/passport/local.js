'use strict';

// var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('../mongoose');
var User = mongoose.model('User');

//
// Sign in using Email and Password
//
module.exports = new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
  email = email.toLowerCase();
  User.findOne({email: email}, function(err, user) {
    if (!user) {
      return done(null, false, {message: 'Email ' + email + ' not found'});
    }
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid email or password.'});
      }
    });
  });
});
