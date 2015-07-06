'use strict';

module.exports = {

  'gid': process.env.GID || 'www-data',
  'uid': process.env.UID || 'www-data',

  'db': process.env.MONGODB || 'mongodb://localhost:27017/test',

  'sessionSecret': process.env.SESSION_SECRET || 'your secrets here',

  'cookieSecret': process.env.COOKIE_SECRET || 'your secrets here',

};
