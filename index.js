class Database {
  constructor(mysqlHost, mysqlPort,mysqlUser,mysqlPass,mysqlDB){
    this.mysql = require("mysql2/promise");
    this.mysqlHost = process.env.MYSQL_HOST || mysqlHost;
    this.mysqlPort = process.env.MYSQL_PORT || mysqlPort;
    this.mysqlUser = process.env.MYSQL_USER || mysqlUser;
    this.mysqlPass = process.env.MYSQL_PASS || mysqlPass;
    this.mysqlDB   = process.env.MYSQL_DB   || mysqlDB;
    this.connectionOptions = {
      host: this.mysqlHost,
      port: this.mysqlPort,
      user: this.mysqlUser,
      password: this.mysqlPass,
      database: this.mysqlDB
      };
  }
}

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

// const mysql = require("mysql2/promise");

// var mysqlHost = process.env.MYSQL_HOST || 'localhost';
// var mysqlPort = process.env.MYSQL_PORT || 3306;
// var mysqlUser = process.env.MYSQL_USER || 'root';
// var mysqlPass = process.env.MYSQL_PASS || 'password';
// var mysqlDB   = process.env.MYSQL_DB   || 'MotoAnalytics';

// var connectionOptions = {
//   host: mysqlHost,
//   port: mysqlPort,
//   user: mysqlUser,
//   password: mysqlPass,
//   database: mysqlDB
//   };

// // console.log('MySQL Connection config:');
// // console.log(connectionOptions);

// const getEvent = async (Event_Id) => {
//   try{
//     const connection = await mysql.createConnection(connectionOptions);

//     const [rows,schema] = await connection.query(`SELECT * FROM Events_View WHERE Id = ?`, [Event_Id]);

//     console.table(rows);
//     returnedName = rows[0]['Name']
//     connection.end();

//     return returnedName;
//   }
//   catch(ex){
//     console.error(ex);
//   }
// };

// const getResults = async (Event_Id) => {
//   try{
//     const connection = await mysql.createConnection(connectionOptions);

//     const [rows,schema] = await connection.query(`SELECT * FROM Results_View WHERE Event_Id = ?`, [Event_Id]);

//     console.table(rows);
//     connection.end();

//   }
//   catch(ex){
//     console.error(ex);
//   }
// };

class User{

  constructor(id, name, address, email, phone){
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  createQuery(){
    console.log(`${this.name} created a query!`);
  }

  deleteQuery(){
    console.log(`${this.name} deleted a query!`);
  }

  modifyQuery(){
    console.log(`${this.name} modified a query!`);
  }
}

class QuerySelections{
  constructor(user_id, rider_list, round_list, location_list, venue_attrs_list, event_session_list, result_type_list){
    this.user_id = user_id;
    this.rider_list = rider_list;
    this.round_list = round_list;
    this.location_list = location_list;
    this.venue_attrs_list = venue_attrs_list;
    this.event_session_list = event_session_list;
    this.result_type_list = result_type_list;
  }

  saveQuery(){
    console.log(`User ${this.user_id} saved the query selections!`)
  }

  viewQuery(){
    console.log(`User ${this.user_id} viewed the query!`)
  }
}

class QueryResults{
  constructor(rider_id, event_id, session_id, data_field, position){
    this.rider_id = rider_id;
    this.event_id = event_id;
    this.session_id = session_id;
    this.data_field = data_field;
    this.position = position;
  }

  buildQueryOutput(){
    let output = [this.rider_id, this.event_id, this.session_id, this.data_field, this.position]
    console.log(`This Row's output is: ${output}`)
  }
}

let user = new User(1,"Dan Bax","316 Heather Mill Dr.","Dan.D.Bax@gmail.com","(314) 406-5730");

let userSelections = new QuerySelections(user.id,                                           // User ID
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
// getResults(1);


// user.createQuery();
// user.deleteQuery();
// user.modifyQuery();

// userSelections.saveQuery();
// userSelections.viewQuery();

// riderResult.buildQueryOutput();
