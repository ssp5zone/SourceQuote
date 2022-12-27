const express = require('express');
const Dao = require('./db/dao');
const app = express();
const DynamicRoutes = require("./routes/rest");
const StaticRoutes = require("./routes/static");

// Configuring app's IP and PORT
const server_port = process.env.PORT || 8787;
const server_ip_address = process.env.IP || '0.0.0.0';

function start() {
  // Start listening to server requests
  const server = app.listen(server_port, server_ip_address, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.debug("App listening at http://%s:%s", host, port);
  });
}

async function Main() {
  
  console.info('Connecting to MongoDB server');
  // First connect to MongoDB ad wait for connection
  await Dao.init();
  console.info('MongoDB connect -- SUCCESS!');

  // Init Backend Routes
  DynamicRoutes.init(app);

  // Init Frontend Routes
  StaticRoutes.init(app);

  start();
}

Main();