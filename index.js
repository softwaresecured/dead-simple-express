'use strict';

// node dependencies
var path = require('path');
var fs = require('fs');

var express = require('express');

var error = require('./config/middleware/error');

var app = express();

// boostrap our models
var modelsDir = path.join(__dirname, 'app', 'models');
fs.readdirSync(modelsDir).forEach(function(file) {
  if (file.indexOf('.js')) {
    require(path.join(modelsDir, file));
  }
});

require('./config/express')(app);
require('./config/routes')(app);

app.use(error.logErrors);
app.use(error.notFoundHandler);
app.use(error.errorHandler);

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
