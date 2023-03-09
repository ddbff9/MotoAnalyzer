const express = require('express');
const { exit } = require('process');
const Rider = require('../models/Rider');
const Event = require('../models/Event');
const Venue = require('../models/Venue');
const Soil = require('../models/Soil');
const Result = require('../models/Result');
const Event_Class = require('../models/Event_Class');
const Event_Session = require('../models/Event_Session');
const { createAmaId } = require('../utils/helper_functions');

const Router = express.Router();

// ********************************
// ********* EVENT ROUTES *********
// ********************************

// ---------------- GET EVENTS ROUTE ----------------

Router.get('/', async (req, res) => {
  try {
    let events = await Event.findAll();
    res.render('events/index', { events });
  } catch (err) {
    console.log(err);
  }
});

// ---------------- CREATE NEW EVENT ROUTES ----------------

Router.get('/new', async (req, res) => {
  try {
    // Get Venue Name and Id for Drop Down list:
    let venues = await Venue.findAll({
      attributes: ['id', 'name'],
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

Router.post('/', async (req, res) => {
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
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

// ---------------- GET EVENT BY ID ROUTE ----------------

Router.get('/:id', async (req, res) => {
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

// ---------------- EDIT EVENT ROUTES ----------------

Router.get('/:id/edit', async (req, res) => {
  // Lookup the event info by the primary key:
  const event = await Event.findByPk(req.params.id);

  // Get Venue Name and Id for Drop Down list:
  let venues = await Venue.findAll({
    attributes: ['id', 'name'],
    order: ['name'],
  });

  // Get Soil Type and Id for Drop Down list:
  let soils = await Soil.findAll({
    attributes: ['id', 'type'],
    order: ['type'],
  });

  // Render the edit page, with data for event, venues, and soil passed in:
  res.render('events/edit', { event, venues, soils });
});

Router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.update(
      {
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
      },
      { where: { id: id } }
    );
    res.redirect(`${id}`);
  } catch (err) {
    throw err;
  }
});

module.exports = Router;
