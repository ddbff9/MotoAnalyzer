const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const app = express();

const {motoanal_db} = require('./__private__/environment')
let db = motoanal_db.mysql.createConnection(motoanal_db.connectionOptions);


// db.on("error", console.error.bind(console, "Connection Error:"));

// db.once("open", () =>{
//   console.log("Database Connected");
// });

// db.connect((err) => {
//   if (err) {
//     console.log("Database Connection Failed !!!", err);
//   } else {
//     console.log("connected to Database");
//   }
// })

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.listen(3000, (req, res)=>{
  console.log('Serving on port 3000')
});