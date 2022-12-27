class Quote {

    constructor(raw) {
        this.source = raw.source || raw.s;
        this.quote = raw.quote || raw.q;
        this.type = raw.type || raw.t;
        this.updatedAt = raw.updatedAt || raw.u || this.getStamp();
        this.id = raw.id || raw._id;
    }

    getMinified() {
        let min = {
            s: this.source,
            q: this.quote,
            t: this.type,
            u: this.updatedAt
        };
        if(this.id) {
            min._id = this.id
        }
        return min;

    }

    static fromMin(min) {
        if(!min) return undefined;
        let quote = new Quote(min);
        return quote;
    }
    
    getStamp() {
        return Date.now();
    }

}

module.exports = Quote;