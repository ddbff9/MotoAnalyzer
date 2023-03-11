const express = require('express');
const { exit } = require('process');

const Router = express.Router();

// *** EVENT HANDLER FUNCIONS **
Router.get('/', async (req, res) => {
  const { getAllEvents } = require('../utils/databaseFunctions');
  const events = await getAllEvents();
  res.render('events/index', { events });
});;

Router.get('/new', async (req, res) => {
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
});

Router.post('/', async (req, res) => {
  const { addEvent } = require('../utils/databaseFunctions');
  try {
    await addEvent(req);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

Router.get('/:id', async (req, res) => {
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
});

Router.get('/:id/edit', async (req, res) => {
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
});

Router.put('/:id', async (req, res) => {
  const { updateEvent } = require('../utils/databaseFunctions');

  try {
    await updateEvent(req);
    res.redirect(`${req.params.id}`);
  } catch (err) {
    throw err;
  }
});

module.exports = Router
