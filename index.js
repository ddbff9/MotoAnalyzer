const Database =require('./database');
const User = require('./user');
const UserSelections = require('./userSelections')
const QueryResults = require('./queryResults');

let db = new Database( 'localhost',3306,'root','password','MotoAnalytics');

const getEvent = async (Event_Id) => {
  try{
    const connection = await db.mysql.createConnection(db.connectionOptions);

    const [rows,schema] = await connection.query(`SELECT * FROM Events_View WHERE Id = ?`, [Event_Id]);

    console.table(rows);
    returnedName = rows[0]['Name']
    connection.end();

    return returnedName;
  }
  catch(ex){
    console.error(ex);
  }
};






let user = new User(1,"Dan Bax","316 Heather Mill Dr.","Dan.D.Bax@gmail.com","(314) 406-5730");

let userSelections = new UserSelections(user.id,                                           // User ID
                                         ['Eli Tomac','Cooper Webb', 'Ken Roczen'],         // Rider_List
                                         [1],                                               // Round_List
                                         ['Anaheim, CA'],                                   // Location_List
                                         ['Baseball','Hard-Pack Soil','2 Sets of Whoops'],  // Venue_Attrs_List
                                         ['Main Event','Qualifying'],                       // Event_Session_List
                                         ['Avg Finish']);                                   // Result_Type_List

let riderResult = new QueryResults(1,                // Rider_ID
                                   'S2305',          // Event_ID
                                   'F1',             // Session_ID
                                   'Hard-Pack Soil', // Data_Field
                                   1);               // Position


getEvent(4).then(console.log);


user.createQuery();
user.deleteQuery();
user.modifyQuery();

userSelections.saveQuery();
userSelections.viewQuery();

riderResult.buildQueryOutput();
