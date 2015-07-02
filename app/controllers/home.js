'use strict';

// var _ = require('lodash');
// var async = require('async');

module.exports.index = function(req, res, next) {
  res.render('home/index', {
    title: 'First',
    description: 'Our first page'
  });
};
