'use strict';

var mongoose = require('mongoose');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var config = require('../');
var User = mongoose.model('User');

//
//  OAuth Strategy Overview
//
//  - User is already logged in.
//    - Check if there is an existing account with a <provider> id.
//      - If there is, return an error message. (Account merging not supported)
//      - Else link new OAuth account with currently logged-in user.
//  - User is not logged in.
//    - Check if it's a returning user.
//      - If returning user, sign in and we are done.
//      - Else check if there is an existing account with user's email.
//        - If there is, return an error message.
//        - Else create a new account.

//
// Sign in with LinkedIn.
//

module.exports = new LinkedInStrategy(config.linkedin, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({linkedin: profile.id}, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.last_loggedin_on = Date.now();

          user.save(function(err) {
            req.flash('info', { msg: 'LinkedIn account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
      if (existingUser) { return done(null, existingUser); }
      User.findOne({ email: profile._json.emailAddress }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
          user.email = profile._json.emailAddress;
          user.profile.name = profile.displayName;
          user.last_loggedin_on = Date.now();
          user.emailPreferences = {
            payment: true,
            suggestion: true,
            information: true,
            authorized: true
          };

          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
});
