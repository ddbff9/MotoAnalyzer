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

  getAvgFinish = async (rider, session, attr_type, attr) => {
    try{
      const connection = await this.mysql.createConnection(this.connectionOptions);
      const [results, schema] = await connection.query(`SELECT Session_Type, Position FROM Results_Attrs_View WHERE Rider_Name = '${rider}' AND ${attr_type} = '${attr}' AND Session_Type = '${session}'`);
  
      let result = 0;
  
      for (let i = 0; i < results.length; i++) {
        result += results[i]['Position'];
      }
      let averagePosition = result/results.length
      connection.end
      return averagePosition
    }
    catch(ex){
      console.error(ex);
    }
  };
}

module.exports = Database;