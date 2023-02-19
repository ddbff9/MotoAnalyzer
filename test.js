class Database {
  constructor(mysqlHost, mysqlPort,mysqlUser,mysqlPass,mysqlDB){
    this.mysql2 = require("mysql2/promise");
    this.mysql = require("mysql");
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

let db = new Database('108.167.133.28',3306,'motoanal_db_admin','H0ckey1!DB','motoanal_db')
let connection = db.mysql.createConnection(db.connectionOptions);

let sql = `SELECT Session_Type, Position FROM Results_Attrs_View WHERE Rider_Name = ? AND Whoops = ? AND Session_Type = ?`;

connection.query(sql, ['Eli Tomac', 1, 'Main Event'], (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);

});

    connection.end();