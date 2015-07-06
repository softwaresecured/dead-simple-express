'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var lastMod = require('./lastMod');

var accessTokenSchema = new mongoose.Schema({
  accessToken: {type: String},
  kind: {type: String}
});

var userSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, required: true, unique: true},
  password: String,

  google: String,
  linkedin: String,
  github: String,

  tokens: [accessTokenSchema],

  profile: {
    name: {type: String, default: '', trim: true},
    gender: {type: String, default: '', trim: true},
    location: {type: String, default: '', trim: true},
    website: {type: String, default: '', trim: true},
    picture: {type: String, default: '', trim: true}
  },

  created_on: {type: Date, default: new Date()},
  last_modified: {type: Date}
});

userSchema.plugin(lastMod);

userSchema.index({email: 1}, {unique: true});

//
// Password hash middleware.
//
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

//
// Helper method for validating user's password.
//
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
