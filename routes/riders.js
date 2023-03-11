const express = require('express');
const { exit } = require('process');
const Rider = require('../models/Rider');

const Router = express.Router();

// ********************************
// ********* RIDER ROUTES *********
// ********************************

Router.get('/', async (req, res) => {
  try {
    let riders = await Rider.findAll();
    res.render('riders/index', { riders });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/new', (req, res) => {
  res.render('riders/new');
});

Router.post('/', async (req, res) => {
  try {
    let rider = Rider.build({
      name: req.body.Rider.Name,
    });
    await rider.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    let riders = await Rider.findAll({
      attributes: ['id', 'name'],
      where: { id: req.params.id },
    });

    if (riders[0] == undefined) {
      res.status(404).send('Sorry cannot find that Rider!');
      exit;
    } else {
      let rider = riders[0];
      res.render('riders/show', { rider });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = Router;
