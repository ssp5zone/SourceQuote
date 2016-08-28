var mysql = require("mysql");

// create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "xnode"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');

  con.query('SELECT * FROM source_quote',function(err,rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
  });

  con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });

});