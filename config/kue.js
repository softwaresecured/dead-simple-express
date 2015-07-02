'use strict';

var path = require('path');
var fs = require('fs');

var kue = require('kue');
var config = require('./');

var jobs = kue.createQueue({
  redis: config.redis
});

module.exports = jobs;
