const redis = require('redis');

class Cache {
    constructor() {
        this.client = null;
        this.connect();
    }
    async connect(config) {
        this.client = redis.createClient(config);
        this.client.on('errors', err => {
            console.log("connection error", err);
        });
        await this.client.connect()
        return this.client;
    }

    async set(key, value) {
        return await this.client.set(key, value)
        
    }


    async get(key) {
        return await this.client.get(key)
     
    }
}

module.exports = new Cache();