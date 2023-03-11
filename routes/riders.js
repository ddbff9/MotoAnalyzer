const express = require('express');
const { exit } = require('process');

const Router = express.Router();

// ********************************
// ********* RIDER ROUTES *********
// ********************************

Router.get('/', async (req, res) => {
  const {getAllRiders} = require('../utils/databaseFunctions')
  try {
    let riders = await getAllRiders();
    res.render('riders/index', { riders });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/new', (req, res) => {
  res.render('riders/new');
});

Router.post('/', async (req, res) => {
  const {addRider} = require('../utils/databaseFunctions')
  try {
    await addRider(req);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/:id', async (req, res) => {
  const {getRiderByID} = require('../utils/databaseFunctions')
  try {
    // let riders = await Rider.findAll({
    //   attributes: ['id', 'name'],
    //   where: { id: req.params.id },
    // });

    const rider = await getRiderByID(req);

    if (rider == undefined) {
      res.status(404).send('Sorry cannot find that Rider!');
      exit;
    } else {
      res.render('riders/show', { rider });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = Router;
