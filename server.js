const mysql = require ('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/event');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());

app.use(eventRoutes);

app.listen(3000, ()=>{
  console.log('Serving on port 3000')
});