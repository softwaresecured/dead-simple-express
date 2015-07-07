'use strict';

var path = require('path');

var root = require('../config').root;

module.exports = {
  dest: root,
  pkg: path.join(root, 'package.json')
};
