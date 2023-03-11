const express = require('express');
const { exit } = require('process');
const Venue = require('../models/Venue');
const Venue_Type = require('../models/Venue_Type');

const Router = express.Router();

// ********************************
// ********* VENUE ROUTES *********
// ********************************
Router.get('/', async (req, res) => {
  const {getAllVenues} = require('../utils/databaseFunctions')
  try {
    let venues = await getAllVenues();
    res.render('venues/index', { venues });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/new', async (req, res) => {
  const {getVenueTypeDDList} = require('../utils/databaseFunctions')
  try {
    // Get Venue_Type Type and Id for Drop Down list:
    let stadiums = await getVenueTypeDDList();

    res.render('venues/new', { stadiums });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/', async (req, res) => {
  try {
    // Insert new venue into database:
    let venue = Venue.build({
      name: req.body.Venue.Name,
      type_id: req.body.Venue.Type_Id,
      open_air: req.body.Venue.Open_Air,
      street: req.body.Venue.Street,
      city: req.body.Venue.City,
      state: req.body.Venue.State,
      zipcode: req.body.Venue.Zipcode,
    });
    await venue.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/:id', async (req, res) => {
  try {
    let venues = await Venue.findAll({
      where: { id: req.params.id },
    });
    if (venues[0] == undefined) {
      res.status(404).send('Sorry cannot find that Venue!');
      exit;
    } else {
      venues.forEach(async (venue) => {
        res.render('venues/show', { venue });
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = Router;
