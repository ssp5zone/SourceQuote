const ObjectId = require('mongodb').ObjectId;


/**
 * Quotes DAO
 * ********************************
 * The DAO layer specifically for the Quotes Collection.
 */
class QuotesDao {

    constructor(collection) {
        this.collection = collection;
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

}

module.exports = QuotesDao;
