'use strict';

// node dependencies
var path = require('path');

// 3rd party dependencies
var express = require('express');
var compress = require('compression');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');
var helmet = require('helmet');
var hpp = require('hpp');
var contentLength = require('express-content-length-validator');

// var express_enforces_ssl = require('express-enforces-ssl');

// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')({session: session});
// var flash = require('express-flash');
// var lusca = require('lusca');

var _ = require('lodash');
var moment = require('moment');

var config = require('./');

var MAX_CONTENT_LENGTH_ACCEPTED = 5000;

module.exports = function(app) {

  var assets = path.join(config.root, 'public');

  var port = process.env.PORT || 3000;
  var environment = process.env.NODE_ENV || 'development';

  var hour = 3600000;
  var day = hour * 24;
  var week = day * 7;

  app.locals._ = _;
  app.locals.moment = moment;

  // app.enable('trust proxy');

  //
  // Express configuration
  //
  app.set('env', environment);
  app.set('port', port);
  app.set('views', path.join(config.root, 'app', 'views'));
  app.set('view engine', 'jade');
  app.use(compress());
  app.use(connectAssets({
    paths: [path.join(assets, 'stylesheets'), path.join(assets, 'javascripts'), path.join(assets, 'bower_components'), path.join(__dirname, '..', 'node_modules')],
    helperContext: app.locals
  }));
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger((app.get('env')==='development')?'dev':'common'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressValidator());
  // app.use(session({
  //   secret: 'abc',
  //   resave: true,
  //   saveUninitialized: true
  // }));
  // app.use(lusca.csrf());
  app.use(hpp());
  app.use(methodOverride());
  // app.use(cookieParser());
  // app.use(session({
  //   secret: config.sessionSecret,
  //   store: new MongoStore({
  //     url: config.db,
  //     autoReconnect: true
  //   }),
  //   resave: true,
  //   saveUninitialized: true
  // }));
  app.use(helmet());
  app.use(contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: "Too much content"}));
  // app.use(express_enforces_ssl());
  if (environment !== 'production') {
    app.use(express.static(assets, {maxAge: week}));
  }
};
