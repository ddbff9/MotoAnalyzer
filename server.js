// Require Node Express framework
const express = require('express');
const app = express();

// Node.js body parsing middleware. Parse incoming request bodies
// in a middleware before your handlers, available under the req.body property.
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// The Path module provides a way of working with directories and file paths.
// https://www.w3schools.com/nodejs/ref_path.asp
const path = require('path');

// Helper file where routes are defined:
const eventRoutes = require('./routes/eventRoutes');

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
app.set('views', path.join(__dirname, 'views'));

// The app.use() function is used to mount the specified middleware function(s) at the
// path which is being specified.
https://www.geeksforgeeks.org/express-js-app-use-function/
app.use(eventRoutes);

// The app.listen() function is used to bind and listen the connections on the
// specified host and port. This method is identical to Node’s http.Server.listen() method.
// https://www.geeksforgeeks.org/express-js-app-listen-function/
app.listen(3000, ()=>{
  console.log('Serving on port 3000')
});