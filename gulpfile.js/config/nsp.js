'use strict';

var path = require('path');

var root = require('./').root;

var shrinkwrap = path.join(root, 'npm-shrinkwrap.json');

module.exports = {
  path: shrinkwrap,
  stopOnError: false
};
