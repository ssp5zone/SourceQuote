const QuotesDao = require('./quotes/QuotesDao');

const MongoClient = require('mongodb').MongoClient;

const url = process.env.DB;
const dbName = process.env.DBNAME;
const collection = process.env.COLLECTION;

class Dao {

    static Quotes = null;

    static async init() {
        if (url == null) {
            console.error("The DB URL was null");
            console.info("1. Make sure you have a .env file");
            console.info("2. The .env file has correct env variables set");
            console.info("3. And you are running the app using 'npm run local'");
        }
        const client = new MongoClient(url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        try {
            await client.connect();
            const database = client.db(dbName);
            const quotesCollection = database.collection(collection);
            Dao.Quotes = new QuotesDao(quotesCollection); 
        } catch (err) {
            console.log(err.stack);
        }
    }

}

module.exports = Dao;