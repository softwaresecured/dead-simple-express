'use strict';

module.exports = {

  'gid': process.env.GID || 'www-data',
  'uid': process.env.UID || 'www-data',

  'db': process.env.MONGODB || 'mongodb://localhost:27017/test',

  'sessionSecret': process.env.SESSION_SECRET || 'your secrets here',

  'cookieSecret': process.env.COOKIE_SECRET || 'your secrets here',

  "google": {
    "clientID": process.env.GOOGLE_ID || "your secret",
    "clientSecret": process.env.GOOGLE_SECRET || "your secret",
    "callbackURL": "/auth/google/callback",
    "passReqToCallback": true
  },

  "linkedin": {
    "clientID": process.env.LINKEDIN_ID || "your secret",
    "clientSecret": process.env.LINKEDIN_SECRET || "your secret",
    "callbackURL": process.env.LINKEDIN_CALLBACK_URL || "/auth/linkedin/callback",
    "scope": ["r_basicprofile", "r_emailaddress", "r_network"],
    "passReqToCallback": true
  },

  "github": {
    "clientID": process.env.GITHUB_ID || "your secret",
    "clientSecret": process.env.GITHUB_SECRET || "your secret",
    "callbackURL": process.env.GITHUB_CALLBACK_URL || "/auth/github/callback",
    "passReqToCallback": true
  }
};
