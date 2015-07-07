'use strict';

module.exports = {
  'port': process.env.PORT || '3000',

  'gid': process.env.GID || 'www-data',
  'uid': process.env.UID || 'www-data',

  'db': process.env.MONGODB || 'mongodb://localhost:27017/test',
};
