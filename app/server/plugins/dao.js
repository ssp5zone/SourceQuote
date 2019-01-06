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
    
    fetch(what) {
        what = what || {};
        return this._asyncFind(what);
    }

    _init() {
        this._asyncAdd = promisify(this.database.insert.bind(this.database));
        this._asyncRemove = promisify(this.database.remove.bind(this.database));
        this._asyncUpdate = promisify(this.database.update.bind(this.database));
        this._asyncFind = promisify(this.database.find.bind(this.database));
    }

}

module.exports = Dao;