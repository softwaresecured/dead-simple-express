'use strict';

module.exports.notFound = function(next) {
  var error = new Error();
  error.status = 404;
  return next(error);
};

module.exports.notFoundHandler = function(req, res, next) {
  res.status(404).json({status: 'error', error: 'Not found'});
};

module.exports.logErrors = function(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

module.exports.errorHandler = function(err, req, res, next) {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || 500).json({status: 'error', error: err});
};
