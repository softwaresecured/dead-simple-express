'use strict';

var gulp = require('gulp');
var shrinkwrap = require('gulp-shrinkwrap');

var config = require('../config/shrinkwrap');

gulp.task('shrinkwrap', function() {
  return gulp.src(config.pkg)
    .pipe(shrinkwrap.lock({devDependencies: false}))
    .pipe(gulp.dest(config.dest))
    .pipe(shrinkwrap())
    .pipe(gulp.dest(config.dest));
});
