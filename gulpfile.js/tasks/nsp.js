'use strict';

var gulp = require('gulp');
var nsp = require('gulp-nsp');

var config = require('../config/nsp');

gulp.task('nsp', ['shrinkwrap'], function(cb) {
  nsp(config, cb);
});
