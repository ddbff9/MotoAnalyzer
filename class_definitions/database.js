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

module.exports = Database;