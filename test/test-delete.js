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

  testDelete();    
});

function getDeleteSource() {
  return 'Batman';
}

function testDelete() {

  var data = getDeleteSource();
  con.query("DELETE FROM source_quote WHERE source=?", data, function(err,res){
    if(err) throw err;
    console.log('Deleted ' + res.affectedRows + ' rows');
  });
  endConnection();
}

function endConnection() {
    con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });
}