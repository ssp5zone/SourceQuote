class Quote {

    constructor(raw) {
        this.source = raw.source || raw.s;
        this.quote = raw.quote || raw.q;
        this.type = raw.type || raw.t;
        if(raw.id || raw._id){
            this.id = raw.id || raw._id;
        }
    }

    getMinified() {
        let min = {
            s: this.source,
            q: this.quote,
            t: this.type,
        };
        if(this.id) {
            min._id = this.id;
        }
        return min;
    }

    static fromMin(min) {
        if(!min) return undefined;
        let quote = new Quote(min);
        quote.id = min._id;
        return quote;
    }

}

module.exports = Quote;