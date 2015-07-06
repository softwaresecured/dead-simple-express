'use strict';

var path = require('path');
var fs = require('fs');

var express = require('express');
var passport = require('passport');

var config = require('./config');
var error = require('./config/middleware/error');

var app = express();

require('./config/mongoose');
// boostrap our models
var modelsDir = path.join(__dirname, 'app', 'models');
fs.readdirSync(modelsDir).forEach(function(file) {
  if (file.indexOf('.js')) {
    require(path.join(modelsDir, file));
  }
});

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);


// Handle 404
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
  res.render('500', {title:'500: Internal Server Error', error: error});
});

process.on('uncaughtException', function(err) {
  console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

module.exports = app;

if (!module.parent) {
  app.listen(app.get('port'), function() {

    if (app.get('env') === 'production') {
      process.setgid(config.gid);
      process.setuid(config.uid);
    }

    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
  });
}
