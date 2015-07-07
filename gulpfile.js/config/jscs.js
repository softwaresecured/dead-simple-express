'use strict';

var path = require('path');

var config = require('./');

module.exports = {
  src: [
    path.join(config.root, 'index.js'),
    path.join(config.root, 'app', '**', '*.js'),
    path.join(config.root, 'config', '**', '*.js'),
    path.join(config.root, 'lib', '**', '*.js'),
    path.join(config.root, 'test', '**', '*.js'),
    path.join(config.root, 'public', 'javascripts', '**', '*.js')
  ]
};
