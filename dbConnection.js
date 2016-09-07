module.exports = {

	mysql: undefined,
	pool: undefined,
	dbConfig: undefined,

	createConnection: function() {
		this.init();
		this.pool = this.mysql.createPool(this.dbConfig);
	},


	// A custom 'query' function. Takes care of Connection Pooling.
	// No need to explicitly handle error in callback. The
	// format "callback(err, res);" is just to maintain consistency.
	execute: function(param1, param2, param3) {
		var query = param1, data = undefined, callback;
		if (param3) {
			data = param2;
			callback = param3;
		} else {
			callback = param2;
		}
		this.getConnection(function(connection) {
			if (data) {
				connection.query(query, data, function(err, res) {
					if(err) {
						console.log("DB error: " + err.code);
						throw err;
					}
					callback(err, res);
					connection.release();
				});
			} else {
				connection.query(query, function(err, res) {
					if(err) {
						console.log("DB error: " + err.code);
						throw err;
					}
					callback(err, res);
					connection.release();
				});
			}
		});
	},


	// raw function. While using this, remember to call connection.release()
	getConnection: function(callback) {
		this.pool.getConnection(function(err, connection) {
			if (err) {
				console.log("Unable to fetch connections from pool: "+err.code);
				throw err; // TO DO: Add logic to re-connect
			} else {
				callback(connection);				
			}
		});
	},


	// added for future use
	disconnect: function() {
		this.pool.end(function (err) {
		  console.log("All connections in the pool have ended");
		});
	},

	init: function() {
		this.mysql = require("mysql");
		this.dbConfig={};
		this.dbConfig.connectionLimit = 10;
		this.dbConfig.host = process.env.OPENSHIFT_MYSQL_DB_HOST || "localhost";
		this.dbConfig.user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || "root";
		this.dbConfig.password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || "root";
		this.dbConfig.database = "xnode";
	}
}