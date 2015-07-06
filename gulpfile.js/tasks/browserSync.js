'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('browser-sync', ['nodemon'], function() {

  browserSync.init({
    files: ['public/**/*.*'],

    proxy: 'http://localhost:3000',

    port: 4000,

    browser: ['google-chrome']
  });

});
