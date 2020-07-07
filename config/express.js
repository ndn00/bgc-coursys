const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
//add form validation later
//const expressValidator = require('express-validator');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const config = require('./');

module.exports = (app, passport, pool) => {
  //utilities
  //static directories
  app.use(express.static(path.join(process.cwd(), 'public')));

  //body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //EJS views and view engine
  app.set('views', path.join(process.cwd(), 'views'));
  app.set('view engine', 'ejs');

  //app.use(expressValidator());
  app.use(methodOverride(function (request) {
    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  //app.use(cookieParser());


  app.use(session({
    store: new pgSession({
      pool
    }),
    secret: 'test',
    resave: false,
    cookie: { maxAge: 14 * 24 * 3600 * 1000}
  }));

  //passport.js setup
  app.use(passport.initialize());
  app.use(passport.session());
}
