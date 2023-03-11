queryResults = async (rider, session, attr_type, attr) => {
  const sequelize = require('../models');

  try {
    let [results] = await sequelize.query(`
    SELECT Position 
    FROM (

    SELECT Riders.name AS Rider_Name, 
        Events.id AS Event_Id, 
          Venues.open_air AS Open_Air, 
          Events.whoop_section AS Whoops, 
          Events.sand_section AS Sand, 
          Events.round_number AS Round, 
          CONCAT(Venues.city,', ', Venues.state)AS Location, 
          Venue_Types.type AS Venue_Types, 
          Event_Soils.type AS Soil_Type, 
          Event_Sessions.name AS Session_Type, 
          Event_Results.position AS Position 
          
          FROM Event_Results
          
          JOIN Events ON Events.id = Event_Results.event_id 
          JOIN Venues ON Venues.id = Events.venue_id  
          JOIN Venue_Types ON Venue_Types.id = Venues.type_id 
          JOIN Event_Soils ON Event_Soils.id = Events.soil_id 
          JOIN Event_Sessions ON Event_Sessions.id = Event_Results.session_id
          JOIN Riders ON Riders.id = Event_Results.rider_id
          
    ) AS Results
    WHERE Results.Rider_Name = '${rider}' AND Results.Session_Type = '${session}' AND ${attr_type} = '${attr}' ;`);
    return results;
  } catch (ex) {
    console.error(ex);
  }
};

getAllEvents = async () => {
  const Event = require('../models/Event');
  try {
    return await Event.findAll();
  } catch (err) {
    console.log(err);
  }
};

getVenueDDList = async () => {
  const Venue = require('../models/Venue');
  try {
    return await Venue.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });
  } catch (err) {
    console.log(err);
  }
};

getSoilDDList = async () => {
  const Soil = require('../models/Soil');
  try {
    return await Soil.findAll({
      attributes: ['id', 'type'],
      order: ['type'],
    });
  } catch (err) {
    console.log(err);
  }
};

addEvent = async (req) => {
  const Event = require('../models/Event');
  const { createAmaId } = require('../utils/helper_functions');
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
  } catch (err) {
    console.log(err);
  }
};

updateEvent = async (req) => {
  const Event = require('../models/Event');
  const { createAmaId } = require('../utils/helper_functions');
  try {
    let event = await Event.update({
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
    {where: {id: req.params.id}});
  } catch (err) {
    console.log(err);
  }
};

getEventByID = async (req) => {
  const Event = require('../models/Event');
  const Venue = require('../models/Venue');
  const Soil = require('../models/Soil');
  try {
    return await Event.findOne({
      include: [
        { model: Venue, required: true },
        { model: Soil, required: true },
      ],
      where: { id: req.params.id },
    });
  } catch (err) {
    throw err;
  }
};

getResultsById = async (req) => {
  const Rider = require('../models/Rider');
  const Event = require('../models/Event');
  const Result = require('../models/Result');
  const Event_Class = require('../models/Event_Class');
  const Event_Session = require('../models/Event_Session');

  try {
    return await Result.findAll({
      include: [
        { model: Rider, required: true },
        { model: Event, required: true },
        { model: Event_Class, required: true },
        { model: Event_Session, required: true },
      ],
      where: { event_id: req.params.id },
      order: ['position'],
    });
  } catch (err) {
    throw(err);
  }
};

module.exports = {
  queryResults,
  getAllEvents,
  getVenueDDList,
  getSoilDDList,
  addEvent,
  getEventByID,
  getResultsById,
  updateEvent
};
