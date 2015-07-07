'use strict';

var mongoose = require('mongoose');

var config = require('./');

function connect(options) {
  options = options || {};
  return mongoose.createConnection(config.db, options);
}
var db = connect();
db.on('error', console.error);
db.on('disconnect', connect);

module.exports = db;
