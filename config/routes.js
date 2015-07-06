//
// Our route definitions
//

'use strict';

var auth = require('./middleware/authorization');

//
// controllers
//
var home = require('../app/controllers/home');
var user = require('../app/controllers/user');

module.exports = function(app, passport) {

  app.get('/', home.index);

  app.get('/login', user.getLogin);
  app.post('/login', user.postLogin);
  app.get('/logout', user.getLogout);
  app.get('/signup', user.getSignup);
  app.post('/signup', user.postSignup);

  app.get('/account', auth.isAuthenticated, user.getAccount);
  app.post('/account/profile', auth.isAuthenticated, user.postUpdateProfile);
  app.post('/account/password', auth.isAuthenticated, user.postUpdatePassword);
  app.post('/account/delete', auth.isAuthenticated, user.postDeleteAccount);
  app.get('/account/unlink/:provider', auth.isAuthenticated, user.getOauthUnlink);

  //
  // OAuth routes for sign-in.
  //
  app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login', failureFlash: true}), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/login', failureFlash: true}), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });
};
