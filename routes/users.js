const express = require('express');

const Router = express.Router();

Router.get('/register', (req, res) => {
  res.render('user/register');
});

Router.post('/register', async (req, res) => {
  const { addUser, isValidPassword } = require('../utils/databaseFunctions');
  try {
    await addUser(req);
    res.redirect('login');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/login', (req, res) => {
  res.render('user/login');
});

Router.post('/login', async (req, res) => {
  const {
    getUserByUserName,
    isValidPassword,
  } = require('../utils/databaseFunctions');

  try {
    const user = await getUserByUserName(req);

    if (user === null) {
      console.log('Incorrect username or password!');
    } else {
      try {
        const validPassword = await isValidPassword(user, req);
        if (validPassword) {
          res.cookie('username', req.body.User.username);
          res.redirect('/events');
        } else {
          res.send('Incorrect username or password!');
        }
      } catch (err) {
        throw err;
      }
    }
  } catch (err) {
    throw err;
  }
});

module.exports = Router;
