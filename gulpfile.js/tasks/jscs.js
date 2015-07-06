'use strict';

var gulp = require('gulp');
var jscs = require('gulp-jscs');

var config = require('../config/jscs');

gulp.task('jscs', function() {
  return gulp.src(config.src)
    .pipe(jscs());
});
