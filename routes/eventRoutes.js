const express = require('express');
const mysqlConnection = require('../utils/database');

const Router = express.Router();

Router.get('/', (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Event",
    (err, results, fields) => {
      if(!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  )
});

Router.get('/events', (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Event",
    (err, results, fields) => {
      if(!err) {
        let events = results;
        res.render('events/index', {events});
      } else {
        console.log(err);
      }
    }
  )
});

Router.get('/events/new', (req,res)=>{
  res.render('events/new');
});

Router.post('/events', async (req, res)=>{

  mysqlConnection.query("INSERT INTO `motoanal_db`.`Event` (`Type`, `Name`) VALUES (?, ?);",[req.body.Event.Type, req.body.Event.Name],
  (err, results,fields)=> {
    if(!err){
      res.render('events');
    }else {
      console.log(err);
    }
  }
);
});

Router.get('/events/:id', async (req,res)=>{
  mysqlConnection.query("SELECT Event.Id, Event.Ama_id, Event.Type AS Event_Type, Event.Name AS Event_Name, Event.Region, Event.Round_Number, Event.Triple_Crown, Event.Gate_Drop, Event.Whoop_Section, Event.Sand_Section, Event.Soil_Id, Venue.Name AS Venue_Name, CONCAT(Venue.City, ', ', Venue.State) AS `Location`FROM Event INNER JOIN Venue ON Venue.Id = Event.Venue_Id WHERE Event.Id = ?;",
    [req.params.id],
    (err, results,fields)=> {
    if(!err){
      let event = results[0]
      res.render('events/show', { event });
    }else {
      console.log(err);
    }
  }
);
});

Router.post("/", (req, res) => {
  console.log(req.body)
  const event = req.body;
  const sql = "SET @Id = ?;SET @Ama_id = ?;SET @Type = ?;SET @Name = ?;SET @Region = ?;SET @Venue_ID = ?;SET @Round_Number = ?;SET @Triple_Crown = ?;SET @Gate_Drop = ?;SET @Whoop_Section = ?;SET @Sand_Section = ?;SET @Soil_Id = ?; CALL Add_or_Update_Event(@Id, @Ama_id, @Type, @Name, @Region, @Venue_ID, @Round_Number, @Triple_Crown, @Gate_Drop, @Whoop_Section, @Sand_Section, @Soil_Id);";
  mysqlConnection.query(sql,
  [
    event.Id,
    event.Ama_id,
    event.Type,
    event.Name,
    event.Region,
    event.Venue_ID,
    event.Round_Number,
    event.Triple_Crown,
    event.Gate_Drop,
    event.Whoop_Section,
    event.Sand_Section,
    event.Soil_Id,
  ],
    (err, results, fields) => {
      if (!err) {
        results.forEach((element) => {
          if (element.constructor == Array) res.send(element);
        });
      } else {
        console.log(err);
      }
    }
  );
});

Router.put("/", (req, res) => {
  let event = req.body;
  const sql = 
     "SET @Id = ?; SET @Ama_id = ?; SET @Type = ?; SET @Name = ?; SET @Region = ?; SET @Venue_ID = ?; SET @Round_Number = ?; SET @Triple_Crown = ?; SET @Gate_Drop = ?; SET @Whoop_Section = ?; SET @Sand_Section = ?; SET @Soil_Id = ?; CALL Add_or_Update_Event(@Id, @Ama_id, @Type, @Name, @Region, @Venue_ID, @Round_Number, @Triple_Crown, @Gate_Drop, @Whoop_Section, @Sand_Section, @Soil_Id);";
  
  mysqlConnection.query(
    sql,
    [
      event.Id,
      event.Ama_id,
      event.Type,
      event.Name,
      event.Region,
      event.Venue_ID,
      event.Round_Number,
      event.Triple_Crown,
      event.Gate_Drop,
      event.Whoop_Section,
      event.Sand_Section,
      event.Soil_Id,
    ],
    (err, results, fields) => {
      if (!err) {
        res.send(
          "The data for the selected event has been successfully updated."
        );
      } else {
        console.log(err);
      }
    }
  );
});

Router.delete("/:Id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Event WHERE Id = ?",
    [req.params.Id],
    (err, results,fields)=> {
      if(!err){
        res.send("The selected event has successfully been deleted.");
      }else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;