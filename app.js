const createServer = require( "./utils/server");
// const mysqlConnection = require('./utils/database');

const app = createServer();

// The app.listen() function is used to bind and listen the connections on the
// specified host and port. This method is identical to Node’s http.Server.listen() method.
// https://www.geeksforgeeks.org/express-js-app-listen-function/
app.listen(3000, ()=>{
  console.log('Serving on port 3000')
});

// To prevent connection timeout, the below function sends a query to
// mySQL Server every 5 seconds:
// setInterval(function () {
//   mysqlConnection.query('SELECT 1');
// }, 5000);
