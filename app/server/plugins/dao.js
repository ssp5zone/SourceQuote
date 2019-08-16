const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class Dao {

    constructor(url, db, collection) {
        this.init(url, db, collection);
    }

    async add(quote) {
        try {
            const result = await this.collection.insertOne(quote);
            return result.insertedId;    
        } catch (err) {
            return err;
        }
        
    }
    
    async remove(id) {
        try {
            // Update on newer format
            if(id != null && id.length === 24) {
                id = new ObjectId(id);
            }
            const result = await this.collection.deleteOne({_id: id});
            return result.deletedCount;
        }
        catch (err) {
            return err;
        }
    } 
    
    async update(quote) {
        try {
            let id = quote._id;
            // Update on newer format
            if(id != null && id.length === 24) {
                id = new ObjectId(id);
            }
            delete quote._id;
            const result = await this.collection.updateOne({_id: id}, {$set: quote});
            return result.modifiedCount;    
        } catch (err) {
            return err;
        }
        
    } 
    
    async fetch(page, limit) {
        try {
            const skip = page ? page * limit : 0;
            limit = limit || 1000;
            const data = await this.collection.find().sort({u:1}).skip(skip).limit(limit).toArray();
            return data;
        } catch (err) {
            return err;
        }
    }

    async init(url, db, collection) {
        if (url == null) {
            console.error("The DB URL was null");
            console.info("1. Make sure you have a .env file");
            console.info("2. The .env file has correct env variables set");
            console.info("3. And you are running the app using 'heroku local web'");
        }
        const client = new MongoClient(url, { useNewUrlParser: true });
        try {
            await client.connect();
            const database = client.db(db);
            this.collection = database.collection(collection);
        } catch (err) {
            console.log(err.stack);
        }
    }

}

module.exports = Dao;