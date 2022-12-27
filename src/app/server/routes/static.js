const express = require('express');
const path = require('path');

class StaticRoutes {
    static init(app) {

        const client = "../../client/";
        
        // Registering public(accessible) paths in express
        app.use("/assets", express.static(path.join(__dirname, client, 'assets')));
        app.use("/", express.static(path.join(__dirname, client)));

        // Binding Callbacks for different uri-request (REST) patterns
        app.get('/', function (req, res) {
            console.log("Got a GET request for the homepage");
            res.sendFile( path.join(__dirname, client, "index.html"));
        });
    }
}

module.exports = StaticRoutes;