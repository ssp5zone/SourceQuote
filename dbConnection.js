module.exports = {

	con: undefined,
	connection: undefined,

	createConnection: function() {
		var mysql = require("mysql");
		this.con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "xnode"
		});
		this.connection=this.con;
	},	

	connect: function() {
		this.con.connect(function(err) {
		  if(err)
		  {
		    console.log('Error connecting to Db');
		    return;
		  }
		  console.log('Connection established');
		});
	},

	disconnect: function() {
		this.con.end(function(err) {
		// The connection is terminated gracefully
		// Ensures all previously enqueued queries are still
		// before sending a COM_QUIT packet to the MySQL server.
		});
	}
}