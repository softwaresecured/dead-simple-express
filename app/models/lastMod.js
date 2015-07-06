'use strict';

// lastMod.js
module.exports = exports = function lastModifiedPlugin (schema, options) {
  schema.add({last_modified: Date});
  
  schema.pre('save', function(next) {
    this.last_modified = new Date();
    next();
  });
  
  if (options && options.index) {
    schema.path('lastMod').index(options.index);
  }
};