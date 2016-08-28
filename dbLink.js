module.exports = {
	
	getQuotes: function(con, callback) {
		  con.query('SELECT * FROM source_quote',function(err,rows){
		    if(err) throw err;
		    console.log('Data received from Db:\n');
		    console.log(rows);
		    callback(rows);
		  });
	},

	addQuote: function(con, data, callback) {
		con.query("INSERT INTO source_quote SET ?", data, function(err,res){
		    if(err) throw err;
		    console.log('Last insert ID:', res.insertId);
		    callback(res.insertId);
		  });
	},

	deleteQuote: function(con, data, callback) {
		con.query("DELETE FROM source_quote WHERE id=?", data, function(err,res){
		    if(err) throw err;
		    console.log('Deleted ' + res.affectedRows + ' rows');
		    callback(res.affectedRows);
		  });
	},

	updateQuote: function(con, id, data, callback) {
		var queryBuilder = new Array();
		queryBuilder.push(data.quote);
		queryBuilder.push(data.source);
		queryBuilder.push(data.type);
		queryBuilder.push(id);
		con.query("UPDATE source_quote SET quote=?, source=?, type=? WHERE id=?", queryBuilder, function(err,res){
		    if(err) throw err;
		    console.log('Updated ' + res.affectedRows + ' rows');
		    callback(res.affectedRows);
		  });
	}
}