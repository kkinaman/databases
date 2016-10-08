var mysql = require('mysql');

var dbConnection;
dbConnection = mysql.createConnection({
  user: 'root',
  password: 'pass',
  database: 'chat'
});

dbConnection.connect();

module.exports = dbConnection;
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


