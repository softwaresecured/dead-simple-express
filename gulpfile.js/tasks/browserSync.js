'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var config = require('../config/browser-sync');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(config);
});
