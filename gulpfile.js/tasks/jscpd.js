'use strict';

var gulp = require('gulp');
var jscpd = require('gulp-jscpd');

var config = require('../config/jscpd');

gulp.task('jscpd', function() {
  return gulp.src(config.src)
    .pipe(jscpd(config.opts));
});
