'use strict';

var path = require('path');

var config = require('./');

var root = config.root;

module.exports = {
  src: [path.join(root, 'package.json'), path.join(root, 'bower.json')],
  dest: root,
  knownOptions: {
    string: ['t', 'type']
  }
};
