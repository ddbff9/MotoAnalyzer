const express = require('express');

const Router = express.Router();


// ********************************
// ********* ADMIN ROUTES *********
// ********************************
// Router.use((req,res,next)=>{
//   if(req.query.isAdmin){
//     next()
//   }
//     res.send('Sorry, not an admin!')
// })

Router.get('/', (req, res) => {
  res.render('admin');
});

Router.get('/admin', (req, res) => {
  res.render('admin');
});

module.exports = Router;