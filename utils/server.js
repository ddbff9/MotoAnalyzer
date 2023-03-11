// Require Node Express framework
const express = require('express');

// Node.js body parsing middleware. Parse incoming request bodies
// in a middleware before your handlers, available under the req.body property.
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

// The Path module provides a way of working with directories and file paths.
// https://www.w3schools.com/nodejs/ref_path.asp
const path = require('path');

const methodOverride = require('method-override')

const exp = require('constants');
const userRoutes = require('../routes/users');
const eventRoutes = require('../routes/events');
const riderRoutes = require('../routes/riders');
const resultsRoutes = require('../routes/results');
const venuesRoutes = require('../routes/venues');
const adminRoutes = require('../routes/admin');

function createServer(){
  const app = express();
  app.use(bodyParser.json());
  app.use(methodOverride('_method'))
  app.use(express.urlencoded({extended: true}));
  
  // The app.use() function is used to mount the specified middleware function(s) at the
  // path which is being specified.
  // https://www.geeksforgeeks.org/express-js-app-use-function/
  app.use('/events',eventRoutes)
  app.use('/users',userRoutes)
  app.use('/admin',adminRoutes)
  app.use('/riders',riderRoutes)
  app.use('/results',resultsRoutes)
  app.use('/venues',venuesRoutes)
  app.use('/',adminRoutes)

  // A template engine enables you to use static template files in your application.
  // At runtime, the template engine replaces variables in a template file with 
  // actual values, and transforms the template into an HTML file sent to the client. 
  // This approach makes it easier to design an HTML page.
  // https://expressjs.com/en/guide/using-template-engines.html
  app.set('view engine', 'ejs');

  // To setup view engine, you need the write this middleware, where path is the global
  // object and __dirname holds current directory address. Views is the folder where our
  // all web pages will be kept.
  // https://www.geeksforgeeks.org/how-to-setup-view-engine-in-node-js/
  app.set('views', path.join(__dirname, '../views'));
  
  return app;
}



module.exports = {createServer};