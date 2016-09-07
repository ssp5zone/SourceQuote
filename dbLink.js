module.exports = {

	db: undefined,	// made global for future
	pool: undefined,
	con: undefined,
	
	getQuotes: function(callback) {
		this.con.query('SELECT * FROM source_quote',function(err,rows){
		    if(err) throw err;
		    console.log(rows.length + ' rows received from DB.');
		    callback(rows);
		  });
	},

	addQuote: function(data, callback) {
		this.con.query("INSERT INTO source_quote SET ?", data, function(err,res){
		    if(err) throw err;
		    console.log('Last insert ID:', res.insertId);
		    callback(res.insertId);
		  });
	},

	deleteQuote: function(data, callback) {
		this.con.query("DELETE FROM source_quote WHERE id=?", data, function(err,res){
		    if(err) throw err;
		    console.log('Deleted ' + res.affectedRows + ' rows');
		    callback(res.affectedRows);
		  });
	},

	updateQuote: function(id, data, callback) {
		var queryBuilder = new Array();
		queryBuilder.push(data.quote);
		queryBuilder.push(data.source);
		queryBuilder.push(data.type);
		queryBuilder.push(id);
		this.con.query("UPDATE source_quote SET quote=?, source=?, type=? WHERE id=?", queryBuilder, function(err,res){
		    if(err) throw err;
		    console.log('Updated ' + res.affectedRows + ' rows');
		    callback(res.affectedRows);
		  });
	},

	initDB: function() {
	  this.db = require('./dbConnection.js');
	  this.db.createConnection();
	  this.db.connect();
	  this.con = this.db.con;
	  console.log("Connected to db.");
	}
}