const express = require('express');
const { exit } = require('process');
const Rider = require('../models/Rider');
const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Soil = require('../models/Soil');
const Result = require('../models/Result');
const Event_Class = require('../models/Event_Class');
const Event_Session = require('../models/Event_Session');
const Venue_Type = require('../models/Venue_Type');
const Sequelize = require('sequelize');
const sequelize = require('../models/index');
const { createAmaId } = require('../utils/helper_functions');

const Router = express.Router();

// ********************************
// ********* ADMIN ROUTES *********
// ********************************
Router.get('/admin', (req, res) => {
  res.render('admin');
});

// ********************************
// ******** RESULTS ROUTES ********
// ********************************
Router.get('/results/new', async (req, res) => {
  try {
    // Get Class Name and Id for Drop Down List:
    let classIds = await Event_Class.findAll({
      attributes: ['Id', 'Name'],
      order: ['Name'],
    });

    // Get Session Name and Id for Drop Down List:
    let sessions = await Event_Session.findAll({
      attributes: ['Id', 'Name'],
      order: ['Name'],
    });

    // Get Roder Name and Id for Drop Down List:
    let riders = await Rider.findAll({
      attributes: ['Id', 'Name'],
      order: ['Name'],
    });

    res.render('results/new', { classIds, sessions, riders });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/results', async (req, res) => {
  try {
    // Insert result from page into database:
    let result = Result.build({
      Rider_Id: req.body.Event_Results.Rider_Id,
      Event_Id: req.body.Event_Results.Event_Id,
      Class_Id: req.body.Event_Results.Class_Id,
      Session_Id: req.body.Event_Results.Session_Id,
      Position: req.body.Event_Results.Position,
    });
    await result.save();
    res.redirect('/events');
  } catch (err) {
    console.log(err);
  }
});

// ********************************
// ********* EVENT ROUTES *********
// ********************************

Router.get('/events', async (req, res) => {
  try {
    let events = await Event.findAll();
    res.render('events/index', { events });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/events/new', async (req, res) => {
  try {
    // Get Venue Name and Id for Drop Down list:
    let venues = await Venue.findAll({
      attributes: ['Id', 'Name'],
      order: ['Name'],
    });

    // Get Soil Type and Id for Drop Down list:
    let soils = await Soil.findAll({
      attributes: ['Id', 'Type'],
      order: ['Type'],
    });

    res.render('events/new', { venues, soils });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/events', async (req, res) => {
  try {
    let event = Event.build({
      Ama_Id: createAmaId(
        req.body.Event.Type,
        req.body.Event.Gate_Drop,
        req.body.Event.Round_Number
      ),
      Type: req.body.Event.Type,
      Name: req.body.Event.Name,
      Region: req.body.Event.Region,
      Venue_Id: req.body.Event.Venue_ID,
      Round_Number: req.body.Event.Round_Number,
      Triple_Crown: req.body.Event.Triple_Crown,
      Gate_Drop: req.body.Event.Gate_Drop,
      Whoop_Section: req.body.Event.Whoop_Section,
      Sand_Section: req.body.Event.Sand_Section,
      Soil_Id: req.body.Event.Soil_Id,
    });
    await event.save();
    res.redirect('/events');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/events/:id', async (req, res) => {
  try {
    let events = await Event.findAll({
      include: [
        { model: Venue, required: true },
        { model: Soil, required: true },
      ],
      where: { Id: req.params.id },
    });
    if (events[0] == undefined) {
      res.status(404).send('Sorry cannot find that Event!');
      exit;
    } else {
      events.forEach(async (event) => {
        let results = await Result.findAll({
          include: [
            { model: Rider, required: true },
            { model: Event, required: true },
            { model: Event_Class, required: true },
            { model: Event_Session, required: true },
          ],
          where: { Event_Id: req.params.id },
          order: ['Position'],
        });
        res.render('events/show', { event, results });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// ********************************
// ********* VENUE ROUTES *********
// ********************************
Router.get('/venues', async (req, res) => {
  try {
    let venues = await Venue.findAll();
    res.render('venues/index', { venues });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/venues/new', async (req, res) => {
  try {
    // Get Venue_Type Type and Id for Drop Down list:
    let stadiums = await Venue_Type.findAll({
      attributes: ['Id', 'Type'],
      order: ['Type'],
    });

    res.render('venues/new', { stadiums });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/venues', async (req, res) => {
  try {
    // Insert new venue into database:
    let venue = Venue.build({
      Name: req.body.Venue.Name,
      Type_Id: req.body.Venue.Type_Id,
      Open_Air: req.body.Venue.Open_Air,
      Street: req.body.Venue.Street,
      City: req.body.Venue.City,
      State: req.body.Venue.State,
      Zipcode: req.body.Venue.Zipcode,
    });
    await venue.save();
    res.redirect('/Venues');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/venues/:id', async (req, res) => {
  try {
    let venues = await Venue.findAll({
      where: { Id: req.params.id },
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

// ********************************
// ********* RIDER ROUTES *********
// ********************************

Router.get('/riders', async (req, res) => {
  try {
    let riders = await Rider.findAll();
    res.render('riders/index', { riders });
  } catch (err) {
    console.log(err);
  }
});

Router.get('/riders/new', (req, res) => {
  res.render('riders/new');
});

Router.post('/riders', async (req, res) => {
  try {
    let rider = Rider.build({
      Name: req.body.Rider.Name,
    });
    await rider.save();
    res.redirect('/riders');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/riders/:id', async (req, res) => {
  try {
    let riders = await Rider.findAll({
      attributes: ['Id', 'Name'],
      where: { Id: req.params.id },
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

// ********************************
// ******** GENERAL ROUTES ********
// ********************************
Router.get('/', (req, res) => {
  res.render('admin');
});

module.exports = Router;
