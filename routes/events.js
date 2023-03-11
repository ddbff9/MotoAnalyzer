const express = require('express');
const { exit } = require('process');

const Router = express.Router();



// *** EVENT HANDLER FUNCIONS **

const getEventsIndexHandler = async (req, res) => {
  const { getAllEvents } = require('../utils/databaseFunctions');
  const events = await getAllEvents();
  res.render('events/index', { events });
};

const createEventFormHandler = async (req, res) => {
  const {
    getVenueDDList,
    getSoilDDList,
  } = require('../utils/databaseFunctions');
  try {
    const venues = await getVenueDDList();
    const soils = await getSoilDDList();
    res.render('events/new', { venues, soils });
  } catch (err) {
    console.log(err);
  }
};

const addNewEventHandler = async (req, res) => {
  const { addEvent } = require('../utils/databaseFunctions');
  try {
    await addEvent(req);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

const getEventByIdHandler = async (req, res) => {
  const {
    getEventByID,
    getResultsById,
  } = require('../utils/databaseFunctions');
  try {
    let event = await getEventByID(req);
    if (event == undefined) {
      res.status(404).send('Sorry cannot find that Event!');
      exit;
    } else {
      let results = await getResultsById(req);
      res.render('events/show', { event, results });
    }
  } catch (err) {
    console.log(err);
  }
};

const editEventFormHandler = async (req, res) => {
  const {
    getEventByID,
    etVenueDDList,
    getSoilDDList,
  } = require('../utils/databaseFunctions');

  // Lookup the event info by the primary key:
  // const event = await Event.findByPk(req.params.id);
  const event = await getEventByID(req);

  // Get Venue Name and Id for Drop Down list:
  const venues = await getVenueDDList();
  const soils = await getSoilDDList();

  // Render the edit page, with data for event, venues, and soil passed in:
  res.render('events/edit', { event, venues, soils });
};

const updateEventHandler = async (req, res) => {
  const { updateEvent } = require('../utils/databaseFunctions');

  try {
    await updateEvent(req);
    res.redirect(`${req.params.id}`);
  } catch (err) {
    throw err;
  }
};

// *** EVENT ROUTES ***
Router.get('/', getEventsIndexHandler);
Router.get('/new', createEventFormHandler);
Router.post('/', addNewEventHandler);
Router.get('/:id', getEventByIdHandler);
Router.get('/:id/edit', editEventFormHandler);
Router.put('/:id', updateEventHandler);

module.exports = Router, getEventsIndexHandler;
