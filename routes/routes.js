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
      attributes: ['id','name'],
      order: ['name'],
    });

    // Get Session Name and Id for Drop Down List:
    let sessions = await Event_Session.findAll({
      attributes: ['id','name'],
      order: ['name'],
    });

    // Get Roder Name and Id for Drop Down List:
    let riders = await Rider.findAll({
      attributes: ['id','name'],
      order: ['name'],
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
      rider_id: req.body.Event_Results.Rider_Id,
      event_id: req.body.Event_Results.Event_Id,
      class_id: req.body.Event_Results.Class_Id,
      session_id: req.body.Event_Results.Session_Id,
      position: req.body.Event_Results.Position,
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
      attributes: ['id','name'],
      order: ['name'],
    });

    // Get Soil Type and Id for Drop Down list:
    let soils = await Soil.findAll({
      attributes: ['id', 'type'],
      order: ['type'],
    });

    res.render('events/new', { venues, soils });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/events', async (req, res) => {
  try {
    let event = Event.build({
      ama_id: createAmaId(
        req.body.Event.Type,
        req.body.Event.Gate_Drop,
        req.body.Event.Round_Number
      ),
      type: req.body.Event.Type,
      name: req.body.Event.Name,
      region: req.body.Event.Region,
      venue_id: req.body.Event.Venue_ID,
      round_number: req.body.Event.Round_Number,
      triple_crown: req.body.Event.Triple_Crown,
      gate_drop: req.body.Event.Gate_Drop,
      whoop_section: req.body.Event.Whoop_Section,
      sand_section: req.body.Event.Sand_Section,
      soil_id: req.body.Event.Soil_Id,
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
      where: { id: req.params.id },
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
          where: { event_id: req.params.id },
          order: ['position'],
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
      attributes: ['id', 'type'],
      order: ['type'],
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
      name: req.body.Venue.Name,
      type_id: req.body.Venue.Type_Id,
      open_air: req.body.Venue.Open_Air,
      street: req.body.Venue.Street,
      city: req.body.Venue.City,
      state: req.body.Venue.State,
      zipcode: req.body.Venue.Zipcode,
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
      name: req.body.Rider.Name,
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
      attributes: ['id','name'],
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

// ********************************
// ******** GENERAL ROUTES ********
// ********************************
Router.get('/', (req, res) => {
  res.render('admin');
});

module.exports = Router;
