class Database {
  constructor(localhost, port, user, password, database){
    this.mysql = require("mysql2/promise");
    var mysqlHost = process.env.MYSQL_HOST || 'localhost';
    var mysqlPort = process.env.MYSQL_PORT || 3306;
    var mysqlUser = process.env.MYSQL_USER || 'root';
    var mysqlPass = process.env.MYSQL_PASS || 'password';
    var mysqlDB   = process.env.MYSQL_DB   || 'MotoAnalytics';
    var connectionOptions = {
      host: mysqlHost,
      port: mysqlPort,
      user: mysqlUser,
      password: mysqlPass,
      database: mysqlDB
      };
  }
  

}

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

// console.log('MySQL Connection config:');
// console.log(connectionOptions);
let db = new Database();

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

getEvent(1)