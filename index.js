'use strict';

// node dependencies
var path = require('path');
var fs = require('fs');

var express = require('express');
var errorHandler = require('errorhandler');

var app = express();

require('./config/mongoose');
// boostrap our models
var modelsDir = path.join(__dirname, 'app', 'models');
fs.readdirSync(modelsDir).forEach(function(file) {
  if (file.indexOf('.js')) {
    require(path.join(modelsDir, file));
  }
});

require('./config/express')(app);
require('./config/routes')(app);

if (app.get('env') === 'production') {
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
} else {
  app.use(errorHandler());
}

process.on('uncaughtException', function(err) {
  console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

module.exports = app;

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
  });
}
