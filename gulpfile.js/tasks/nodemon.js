'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var BROWSER_SYNC_RELOAD_DELAY = 4000;

gulp.task('nodemon', function(cb) {
  var called = false;

  return nodemon({
    script: 'index.js',
    ext: 'js jade less',
    watch: [
      'index.js',
      'app/',
      'config/',
      'lib/',
      'public/js/application.js',
      'public/js/main.js',
      'public/css/styles.less'
    ],
    env: {'NODE_ENV': 'development'},
    ignore: ['./node_modules/**', './public/bower_components/**']
  }).on('start', function onStart() {
    if (!called) { cb(); }
    called = true;
    return;
  }).on('restart', function onRestart() {

    setTimeout(function reload() {

      browserSync.reload({
        stream: false
      });

    }, BROWSER_SYNC_RELOAD_DELAY);

  });
});
