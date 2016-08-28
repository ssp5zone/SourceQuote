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

  testInsert();    
});

function getDummyData() {
  return {quote: 'na na na na na na', source: 'Batman'}
}

function testInsert() {

  var data = getDummyData();
  con.query("INSERT INTO source_quote SET ?", data, function(err,res){
    if(err) throw err;
    console.log('Last insert ID:', res.insertId);
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