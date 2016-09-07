module.exports = {

	db: undefined,	
	
	getQuotes: function(callback) {
		this.db.execute('SELECT * FROM source_quote', function(err, rows) {
		    console.log(rows.length + ' rows received from DB.');
		    callback(rows);
		});
	},

	addQuote: function(data, callback) {
		this.db.execute("INSERT INTO source_quote SET ?", data, function(err, res) {
		    console.log('Last insert ID:', res.insertId);
		    callback(res.insertId);
		});
	},

	deleteQuote: function(data, callback) {
		this.db.execute("DELETE FROM source_quote WHERE id=?", data, function(err, res) {
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
		this.db.execute("UPDATE source_quote SET quote=?, source=?, type=? WHERE id=?", queryBuilder, function(err, res) {
		    console.log('Updated ' + res.affectedRows + ' rows');
		    callback(res.affectedRows);
		});
	},

	initDB: function() {
	  this.db = require('./dbConnection.js');
	  this.db.createConnection();
	  console.log("Connected to db.");
	}
}