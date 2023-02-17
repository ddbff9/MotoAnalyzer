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

  // Function that queries the database to return a list of finishing positions for the specified rider in the specified session with the specified attribute.
  getResults = async (rider, session, attr_type, attr)=> {
    try{
      const connection = await this.mysql.createConnection(this.connectionOptions);
      const [results, schema] = await connection.query(`SELECT Session_Type, Position FROM Results_Attrs_View WHERE Rider_Name = '${rider}' AND ${attr_type} = '${attr}' AND Session_Type = '${session}'`);
      connection.end();
      return results;
    } catch(ex){
      console.error(ex);
    }
  }

  // Function that takes a list of results and gets the average finish from those results.
  getAveragePosition = (results)=>{
    let numerator = 0;
    let denominator = results.length

    for (const result of results){
      numerator += result['Position'];
    }

    let averagePosition = numerator/denominator

    return averagePosition
  }
}

module.exports = Database;