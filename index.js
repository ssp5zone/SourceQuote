var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var dbLink = require('./dbLink.js');


// Configuring app's IP and PORT
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8787;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


// Registering public(accessible) paths in express
app.use("/assets",express.static(__dirname +'/assets'));
app.use("/bower_components",express.static(__dirname +'/bower_components'));

// Adding middleware to understand json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Initializing connections to DB.
dbLink.initDB();


// Binding Callbacks for different uri-request (REST) patterns
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
});

app.get('/get_quotes', function (req, res) {
   console.log("Got a GET request for /get_quotes");
   dbLink.getQuotes(function(rows) {
     res.send(rows);
   });
});

app.post('/add_quote', function (req, res) {
   console.log("Got a POST request for add_quote");
   dbLink.addQuote(req.body, function(id) {
      res.send(String(id)); // Converted to string as response interprets raw numbers as server's response (Eg. 404).
   });
});

app.delete('/delete_quote/:id', function (req, res) {
   console.log("Got a DELETE request for /del_quote");
   dbLink.deleteQuote(req.params.id, function(rowsAffected) {
     res.send(String(rowsAffected));
   });   
});

app.put('/update_quote/:id', function (req, res) {
   console.log("Got a PUT request for /update_quote");
   dbLink.updateQuote(req.params.id, req.body, function(rowsAffected) {
     res.send(String(rowsAffected));
   });
});


// Start listening to server requests
var server = app.listen(server_port, server_ip_address, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
