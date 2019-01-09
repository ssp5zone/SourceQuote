const DataSource =  require('nedb');
const { promisify } = require('util');

class Dao {

    constructor() {
        
        this.database = new DataSource({
            filename: "app/db/quotes.db",
            autoload: true,
            timestampData: true,
        });

        // Initialize async versions of the standard nedb calls
        this._init();
        
    }

    add(quote) {
        return this._asyncAdd(quote);
    }
    
    remove(id) {
        return this._asyncRemove({ _id: id }, {});  
    } 
    
    update(quote){
        return this._asyncUpdate({ _id: quote._id }, quote, {});
    } 
    
    fetch(page, limit) {
        return new Promise((resolve, reject) => {
            this.database.find({}).sort({ updatedAt: 1 }).exec((err, docs) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        });
    }

    _init() {
        this._asyncAdd = promisify(this.database.insert.bind(this.database));
        this._asyncRemove = promisify(this.database.remove.bind(this.database));
        this._asyncUpdate = promisify(this.database.update.bind(this.database));
    }

}

module.exports = Dao;