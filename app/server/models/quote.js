export class Quote {

    constructor(source, quote, type) {
        this.source = source;
        this.quote = quote;
        this.type = type;
    }

    get minified() {
        let min = {
            s: this.source,
            q: this.quote,
            t: this.type,
        };
        if(this.id) {
            min.$loki = id;
        }
        return min;
    }

    static fromMin(min) {
        if(!min) return undefined;
        let quote = new Quote(min.s, min.q, min.t);
        quote.id = min.$loki;
        return quote;
    }

}