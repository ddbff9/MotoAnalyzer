const express = require('express');
const mysqlConnection = require('../utils/database');

setInterval(function () {
  mysqlConnection.query('SELECT 1');
}, 5000);

const Router = express.Router();

// ********************************
// ********* ADMIN ROUTES *********
// ********************************
Router.get('/admin', (req, res) => {
  res.render('admin')
});

// ********************************
// ******** RESULTS ROUTES ********
// ********************************
Router.get('/results/new', (req, res) => {
  mysqlConnection.query("SELECT Id, Name FROM Event_Class ORDER BY Name;",
  (err, results, fields)=>{
    if(!err) {
      let classIds = results;
      mysqlConnection.query("SELECT Id, Name FROM Event_Session ORDER BY Name;",
      (err, results, fields)=>{
        if(!err) {
          let sessions = results;
          res.render('results/new',{ classIds, sessions})
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

Router.post('/results', async (req, res)=>{
  const sql = "SET @Rider_Name = ?; SET @Event_Id = ?; SET @Class_Id = ?; SET @Session_Id=?;  SET @Position = ?; CALL Add_or_Update_Result(@Rider_Name, @Event_Id, @Class_Id, @Session_Id,  @Position);";

  const createNewResult = mysqlConnection.query(sql,[
    req.body.Event_Results.Rider_Name,
    req.body.Event_Results.Event_Id,
    req.body.Event_Results.Class_Id,
    req.body.Event_Results.Session_Id,
    req.body.Event_Results.Position,
  ],
  (err, results,fields)=> {
    if(!err){
     
    }else {
      console.log(err);
    }
  }
);
  createNewResult;
  // res.redirect('/results/new')
});

// ********************************
// ********* EVENT ROUTES *********
// ********************************
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
  mysqlConnection.query("SELECT DISTINCT Id, Name FROM Venue ORDER BY Name;",
  (err, results, fields)=>{
    if(!err) {
      let venues = results;
      mysqlConnection.query("SELECT DISTINCT Id, Type FROM Event_Soil ORDER BY Type;",
      (err, results, fields)=>{
        if(!err) {
          let soils = results;
          res.render('events/new',{venues, soils})
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });


});

Router.post('/events', async (req, res)=>{
  const sql = "SET @Id = 0; SET @Type = ?;SET @Name = ?;SET @Region = ?;SET @Venue_ID = ?;SET @Round_Number = ?;SET @Triple_Crown = ?;SET @Gate_Drop = ?;SET @Whoop_Section = ?;SET @Sand_Section = ?;SET @Soil_Id = ?; CALL Add_or_Update_Event(@Id, @Type, @Name, @Region, @Venue_ID, @Round_Number, @Triple_Crown, @Gate_Drop, @Whoop_Section, @Sand_Section, @Soil_Id);";
  
  const createNewEvent = mysqlConnection.query(sql,[
    req.body.Event.Type,
    req.body.Event.Name,
    req.body.Event.Region,
    req.body.Event.Venue_ID,
    req.body.Event.Round_Number,
    req.body.Event.Triple_Crown,
    req.body.Event.Gate_Drop,
    req.body.Event.Whoop_Section,
    req.body.Event.Sand_Section,
    req.body.Event.Soil_Id,
  ],
  (err, results,fields)=> {
    if(!err){
     
    }else {
      console.log(err);
    }
  }
);
  createNewEvent;
  res.redirect('/events')
});

Router.get('/events/:id', (req,res)=>{
 
  mysqlConnection.query("SELECT Event.Id, Event.Ama_id, Event.Type AS Event_Type, Event.Name AS Event_Name, Event.Region, Event.Round_Number, Event.Triple_Crown, Event.Gate_Drop, Event.Whoop_Section, Event.Sand_Section, Event_Soil.Type AS Soil_Type, Venue.Name AS Venue_Name, CONCAT(Venue.City, ', ', Venue.State) AS `Location`FROM Event INNER JOIN Venue ON Venue.Id = Event.Venue_Id INNER JOIN Event_Soil ON Event_Soil.Id = Event.Soil_Id WHERE Event.Id = ?;",
  [req.params.id],
  (err, results,fields)=> {
  if(!err){
    let event = results[0];
    mysqlConnection.query(" SELECT Rider.Name AS Rider_Name,Event_Class.Name AS Event_Class,Event_Session.Name AS Session_Type,Event_Results.Position AS Position FROM (((((Event_Results JOIN Rider ON ((Rider.Id = Event_Results.Rider_Id)))    JOIN Event ON ((Event.Id = Event_Results.Event_Id))) JOIN Event_Class ON ((Event_Class.Id = Event_Results.Class_Id))) JOIN Event_Session ON ((Event_Results.Session_Id = Event_Session.Id)))) WHERE Event.Id = ? GROUP BY Session_Type, Position;",[req.params.id],(err, results, fields)=>{
      let eventResults = results;
      res.render('events/show', { event, eventResults });
    })

  }else {
    console.log(err);
  }
}
);
  });

// ********************************
// ********* VENUE ROUTES *********
// ********************************
Router.get('/venues', (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Venue",
    (err, results, fields) => {
      if(!err) {
        let venues = results;
        res.render('venues/index', {venues});
      } else {
        console.log(err);
      }
    }
  )
});

Router.get('/venues/new', (req,res)=>{
  mysqlConnection.query("SELECT Id, Type FROM Venue_Type ORDER BY Type;",
  (err, results, fields)=>{
    if(!err) {
      let stadiums = results;
      res.render('venues/new',{stadiums})
    } else {
      console.log(err);
    }
  });
});

Router.post('/venues', async (req, res)=>{
  const sql = "SET @Id = 0; SET @Name = ?;SET @Type_Id = ?;SET @Open_Air = ?;SET @Street = ?;SET @City = ?;SET @State = ?;SET @Zipcode = ?; CALL Add_or_Update_Venue(@Id, @Name, @Type_Id, @Open_Air, @Street, @City, @State, @Zipcode);";
  mysqlConnection.query(sql,[
    req.body.Venue.Name,
    req.body.Venue.Type_Id,
    req.body.Venue.Open_Air,
    req.body.Venue.Street,
    req.body.Venue.City,
    req.body.Venue.State,
    req.body.Venue.Zipcode,
  ],
  (err, results,fields)=> {
    if(!err){
    }else {
      console.log(err);
    }
  }
);
  res.redirect('/events')
});

Router.get('/venues/:id', async (req,res)=>{
  mysqlConnection.query("SELECT Venue.Id, Venue.Name, Venue.Type_Id, Venue.Open_Air, Venue.Street, Venue.City, Venue.State, Venue.Zipcode FROM Venue WHERE Venue.Id = ?;",
    [req.params.id],
    (err, results,fields)=> {
    if(!err){
      let venue = results[0]
      res.render('venues/show', { venue });
    }else {
      console.log(err);
    }
  }
);
});

// ********************************
// ********* RIDER ROUTES *********
// ********************************
Router.get('/riders', (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Rider ORDER BY Name;",
    (err, results, fields) => {
      if(!err) {
        let riders = results;
        res.render('riders/index', {riders});
      } else {
        console.log(err);
      }
    }
  )
});

Router.get('/riders/new', (req,res)=>{
  res.render('riders/new')
});

Router.post('/riders', async (req, res)=>{
  const sql = "SET @Id = 0; SET @Name = ?; CALL Add_or_Update_Rider(@Id, @Name);";
  mysqlConnection.query(sql,[
    req.body.Rider.Name,
  ],
  (err, results,fields)=> {
    if(!err){
    }else {
      console.log(err);
    }
  }
);
  res.redirect('/riders')
});

Router.get('/riders/:id', async (req,res)=>{
  mysqlConnection.query("SELECT Rider.Id, Rider.Name FROM Rider WHERE Rider.Id = ?;",
    [req.params.id],
    (err, results,fields)=> {
    if(!err){
      let rider = results[0]
      res.render('riders/show', { rider });
    }else {
      console.log(err);
    }
  }
);
});

// ********************************
// ******** GENERAL ROUTES ********
// ********************************
Router.get('/', (req, res) => {
  res.render('admin')
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