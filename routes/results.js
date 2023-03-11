const express = require('express');

const Rider = require('../models/Rider');
const Result = require('../models/Result');
const Event_Class = require('../models/Event_Class');
const Event_Session = require('../models/Event_Session');

const Router = express.Router();


// ********************************
// ******** RESULTS ROUTES ********
// ********************************

// ---------------- CREATE NEW RESULTS ROUTES ----------------
Router.get('/new', async (req, res) => {
  try {
    // Get Class Name and Id for Drop Down List:
    let classIds = await Event_Class.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    // Get Session Name and Id for Drop Down List:
    let sessions = await Event_Session.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    // Get Roder Name and Id for Drop Down List:
    let riders = await Rider.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    res.render('results/new', { classIds, sessions, riders });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/', async (req, res) => {
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

module.exports = Router;
