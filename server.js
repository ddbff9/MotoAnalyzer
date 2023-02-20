const mysql = require ('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/event');
const path = require('path');
const app = express();
const sxEvent = require('./class_definitions/sxEvent')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.get('/makeEvent',(req,res)=>{
  let sx_event = new sxEvent(0,'S2405','SX','Dan-Test Race','W',1,2,1,'2024-02-20T03:00:00.000Z',2,1,1)
  res.send(sx_event)
})

app.use(eventRoutes);

app.listen(3000, ()=>{
  console.log('Serving on port 3000')
});