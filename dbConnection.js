module.exports = {

	mysql: undefined,
	con: undefined,
	pool: undefined,
	dbConfig: undefined,

	createConnection: function() {
		this.init();
		this.con = this.mysql.createConnection(this.dbConfig);
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
	},

	init: function() {
		this.mysql = require("mysql");
		this.dbConfig={};
		// this.dbConfig.connectionLimit = 10;
		this.dbConfig.host = process.env.OPENSHIFT_MYSQL_DB_HOST || "localhost";
		this.dbConfig.user = process.env.OPENSHIFT_MYSQL_DB_USERNAME || "root";
		this.dbConfig.password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || "root";
		this.dbConfig.database = "xnode";		
		this.pool=this.con; // just an alias
	}
}