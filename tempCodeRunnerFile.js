const getResults = async (Event_Id) => {
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