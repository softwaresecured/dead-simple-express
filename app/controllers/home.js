'use strict';

// var _ = require('lodash');
// var async = require('async');

var kue = require('../../config/kue');

module.exports.index = function(req, res, next) {
  res.render('home/index', {
    title: 'First',
    description: 'Our first page'
  });
};

module.exports.jobs = function(req, res, next) {

  var task = 'email';

  var data =  {
    name: 'email',
    title: 'Account renewal required',
    to: 'tj@learnboost.com',
    template: 'renewal-email'
  };

  var job = kue.create(task, data).save();

  job.on('complete', function(result) {
    console.log(result);
    console.log('Job', job.id, 'with name', job.data.name, 'is done');
  });
  job.on('failed', function() {
    console.log('Job', job.id, 'with name', job.data.name, 'has failed');
  });

  res.render('home/index', {
    title: 'Jobs',
    description: 'Jobs'
  });
};


