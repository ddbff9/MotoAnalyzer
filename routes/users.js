const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const Router = express.Router();

// ********************************
// ********** USER ROUTES *********
// ********************************
Router.get('/register', (req, res) => {
  res.render('user/register');
});

Router.post('/register', async (req, res) => {
  const { password, username } = req.body.User;
  const hash = await bcrypt.hash(password, 12);
  try {
    // Insert username and hash into database:
    let user = User.build({
      username: username,
      password: hash,
    });
    await user.save();
    res.redirect('login');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/login', (req, res) => {
  res.render('user/login');
});

Router.post('/login', async (req, res) => {
  const { password, username } = req.body.User;
  const user = await User.findOne({ where: { username: username } });
  if (user === null) {
    console.log('Incorrect username or password!');
  } else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.cookie('username', req.body.User.username);
      res.redirect('/events');
    } else {
      res.send('Incorrect username or password!');
    }
  }
});

module.exports = Router;
