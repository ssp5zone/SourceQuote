var express = require('express');
var bodyParser = require('body-parser')
var db = require('./dbConnection.js');
var dbLink = require('./dbLink.js');
var app = express();

app.use("/assets",express.static(__dirname +'/assets'));
app.use("/bower_components",express.static(__dirname +'/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
dbConnect();

app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "/" + "index.html" );
})


app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.get('/get_quotes', function (req, res) {
   console.log("Got a GET request for /get_quotes");
   dbLink.getQuotes(db.con, function(rows) {
     res.send(rows);
   });
});

app.post('/add_quote', function (req, res) {
   console.log("Got a POST request for add_quote");
   dbLink.addQuote(db.con, req.body, function(id) {
      res.send(String(id)); // does not allows number.
   });
});

app.delete('/delete_quote/:id', function (req, res) {
   console.log("Got a DELETE request for /del_quote");
   console.log(req.params.id);
   dbLink.deleteQuote(db.con, req.params.id, function(rowsAffected) {
     res.send(String(rowsAffected)); // does not allows number.
   });   
});

app.put('/update_quote/:id', function (req, res) {
   console.log("Got a PUT request for /update_quote");
   console.log(req.params.id);
   console.log(req.body);
   dbLink.updateQuote(db.con, req.params.id, req.body, function(rowsAffected) {
     res.send(String(rowsAffected)); // does not allows number.
   });
});

var server = app.listen(8787, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);

});


function dbConnect() {
  db.createConnection();
  db.connect();
  console.log("Connected to db.");
}
