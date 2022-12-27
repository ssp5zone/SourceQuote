const Quote = require("../models/quote");
const bodyParser = require('body-parser');
const Dao = require("../db/dao");

class DynamicRoutes {
    
    static init(app) {

        // Adding middleware to understand json format
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.get('/get_quotes', async (req, res) => {
            console.log("Got a GET request for /get_quotes");
            let quotes = await Dao.Quotes.fetch();
            quotes = quotes.map(Quote.fromMin);
            res.send(quotes);

         });
         
         app.post('/add_quote', async (req, res) => {
            console.log("Got a POST request for add_quote", req.body);
            let quote = new Quote(req.body);
            const id = await Dao.Quotes.add(quote.getMinified());
            console.log(id);
            res.send(id); 
         });
         
         app.delete('/delete_quote/:id', async (req, res) => {
            console.log("Got a DELETE request for /del_quote");
            let rowsAffected = await Dao.Quotes.remove(req.params.id);  
            res.send(String(rowsAffected)); // Converted to string as response interprets raw numbers as server's response (Eg. 404).
         });
         
         app.put('/update_quote', async (req, res) => {
            console.log("Got a PUT request for /update_quote", req.body);
            let quote = new Quote(req.body);
            let rowsAffected = await Dao.Quotes.update(quote.getMinified());
            console.log(rowsAffected);
            res.send(String(rowsAffected));
         });
    }
}

module.exports = DynamicRoutes;