//
// Our route definitions
//

'use strict';

//
// controllers
//
var home = require('../app/controllers/home');

module.exports = function(app) {

  app.get('/', home.index);

};
