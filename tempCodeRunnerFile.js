connect();

// async function connect() {
//   try{

//     const con = await mysql.createConnection({
//       "host" : "localhost",
//       "port": 3306,
//       "user": "root",
//       "password": "password",
//       "database": "MotoAnalytics"
//     });
//     const name = 'Dan';

//     const [rows,schema] = await con.query(`SELECT * FROM EMPLOYEES WHERE NAME = ?`,[name]);

//     console.table(rows);

//   }
//   catch(ex){
//     console.error(ex);
//   }
// }