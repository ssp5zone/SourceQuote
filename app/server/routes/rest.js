const Dao = require("../plugins/dao");
const Quote = require("../models/quote");
const bodyParser = require('body-parser');

const url = process.env.DB;
const dbName = process.env.DBNAME;
const collection = process.env.COLLECTION;

const db = new Dao(url, dbName, collection);

class DynamicRoutes {
    
    static init(app) {

        // Adding middleware to understand json format
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.get('/get_quotes', async (req, res) => {
            console.log("Got a GET request for /get_quotes");
            let quotes = await db.fetch();
            quotes = quotes.map(Quote.fromMin);
            res.send(quotes);

         });
         
         app.post('/add_quote', async (req, res) => {
            console.log("Got a POST request for add_quote", req.body);
            let quote = new Quote(req.body);
            const id = await db.add(quote.getMinified());
            console.log(id);
            res.send(id); 
         });
         
         app.delete('/delete_quote/:id', async (req, res) => {
            console.log("Got a DELETE request for /del_quote");
            let rowsAffected = await db.remove(req.params.id);  
            res.send(String(rowsAffected)); // Converted to string as response interprets raw numbers as server's response (Eg. 404).
         });
         
         app.put('/update_quote', async (req, res) => {
            console.log("Got a PUT request for /update_quote", req.body);
            let quote = new Quote(req.body);
            let rowsAffected = await db.update(quote.getMinified());
            res.send(String(rowsAffected));
         });
    }
}

module.exports = DynamicRoutes;