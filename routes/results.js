const express = require('express');

const Rider = require('../models/Rider');
const Result = require('../models/Result');
const Event_Class = require('../models/Event_Class');
const Event_Session = require('../models/Event_Session');

const Router = express.Router();


// ********************************
// ******** RESULTS ROUTES ********
// ********************************

Router.get('/new', async (req, res) => {
  const {getClassDDList, getSessionDDList, getRiderDDList} = require('../utils/databaseFunctions')

  try {
    // Get Class Name and Id for Drop Down List:
    let classIds = await getClassDDList();

    // Get Session Name and Id for Drop Down List:
    let sessions = await getSessionDDList();

    // Get Roder Name and Id for Drop Down List:
    let riders = await getRiderDDList();

    res.render('results/new', { classIds, sessions, riders });
  } catch (err) {
    console.log(err);
  }
});

Router.post('/', async (req, res) => {
  const {addEvent} = require('../utils/databaseFunctions')
  try {
    await addResult(req);
    res.redirect('/events');
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
