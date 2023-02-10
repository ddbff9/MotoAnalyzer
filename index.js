const Database =require('./database');
const User = require('./user');
const Event = require('./event')
const UserSelections = require('./userSelections')
const QueryResults = require('./queryResults');

let db = new Database( 'localhost',3306,'root','password','MotoAnalytics');

const getEvent = async (eventId) => {
  try{
    const connection = await db.mysql.createConnection(db.connectionOptions);

    const [rows,schema] = await connection.query(`SELECT * FROM Events_View WHERE Id = ?`, [eventId]);

    eventName = rows[0]['Name'];
    eventRound = rows[0]['Round'];
    eventLocation = rows[0]['Location'];
    eventVenueType = rows[0]['Venue_Type'];
    eventSoilType = rows[0]['Soil_Type'];

    connection.end();

    const event = new Event(eventId, eventName, eventRound, eventLocation, eventVenueType, eventSoilType)

    return event;
  }
  catch(ex){
    console.error(ex);
  }
};

getAvgFinish = async (rider, session, attr_type, attr) => {
  try{
    const connection = await db.mysql.createConnection(db.connectionOptions);
    const [results, schema] = await connection.query(`SELECT Session_Type, Position FROM Results_Attrs_View WHERE Rider_Name = '${rider}' AND ${attr_type} = '${attr}' AND Session_Type = '${session}'`);

    let result = 0;

    for (let i = 0; i < results.length; i++) {
      result += results[i]['Position'];
    }
    averagePosition = result/results.length
    // console.log(`${rider}'s Average Position: ${averagePosition}`)
    connection.end
    return averagePosition
  }
  catch(ex){
    console.error(ex);
  }
};

let user = new User(1,"Dan Bax","316 Heather Mill Dr.","Dan.D.Bax@gmail.com","(314) 406-5730");

let userSelections = new UserSelections(user.id,                                            // User ID
                                         ['Eli Tomac','Cooper Webb', 'Ken Roczen'],         // Rider_List
                                         [1],                                               // Round_List
                                         ['Anaheim, CA'],                                   // Location_List
                                         ['Baseball'],                                      // Venue_Type_List
                                         ['Hard-Pack Soil'],                                // Soil_Type_List
                                         [2],                                               // Whoop_Section_List
                                         ['Main Event','Qualifying'],                       // Session_Type_List
                                         ['Avg Finish']);                                   // Result_Type_List

let riderResult = new QueryResults(1,                // Rider_ID
                                   'S2305',          // Event_ID
                                   'F1',             // Session_ID
                                   'Hard-Pack Soil', // Data_Field
                                   1);               // Position




const buildOutput = async (selections)=>{
  for (let i=0; i<selections['rider_list'].length; i++){

    for (let j=0; j<selections['session_type_list'].length;j++){
      console.log(`${await selections['rider_list'][i]}'s ${selections['session_type_list'][j]} Average Finish at Round 1: ${await getAvgFinish(selections['rider_list'][i],selections['session_type_list'][j],'Round',1)}`)
    }
    
  }
}
buildOutput(userSelections);
// getAvgFinish('Eli Tomac', 'Soil_Type', 'Hard-Pack')
// getAvgFinish('Cooper Webb','Round',1);
// getEvent(3).then(console.log);

// console.log(userSelections)
// user.createQuery();
// user.deleteQuery();
// user.modifyQuery();

// userSelections.saveQuery();
// userSelections.viewQuery();

// riderResult.buildQueryOutput();
