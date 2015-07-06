'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var config = require('../config/nodemon');

var BROWSER_SYNC_RELOAD_DELAY = 2500;

gulp.task('nodemon', ['jshint', 'jscs'], function(cb) {
  var called = false;

  function onStart() {
    if (!called) { cb(); }
    called = true;
    return;
  }

  function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  }

  return nodemon(config).on('start', onStart).on('restart', onRestart);
});
