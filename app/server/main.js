const express = require('express');
const app = express();

const DynamicRoutes = require("./routes/rest");
const StaticRoutes = require("./routes/static");

DynamicRoutes.init(app);
StaticRoutes.init(app);

// Configuring app's IP and PORT
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8787;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// Start listening to server requests
const server = app.listen(server_port, server_ip_address, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.debug("App listening at http://%s:%s", host, port);
});
