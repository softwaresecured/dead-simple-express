'use strict';

module.exports = {
  files: ['public/**/*.*'],

  proxy: 'http://localhost:3000',

  port: 4000,

  browser: ['google-chrome']
};