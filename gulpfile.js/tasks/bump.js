'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');

var minimist = require('minimist');

var config = require('../config/bump');

gulp.task('bump', function() {

  var options = minimist(process.argv.slice(2), config.knownOptions);

  return gulp.src(config.src)
    .pipe(bump({
      type: options.type
    }))
    .pipe(gulp.dest(config.dest));
});
