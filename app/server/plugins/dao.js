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
            const result = await this.collection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount;
        }
        catch (err) {
            return err;
        }
    } 
    
    async update(quote) {
        try {
            const id = new ObjectId(quote._id);
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
        console.log(url, db, collection);
        const client = new MongoClient(url);
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