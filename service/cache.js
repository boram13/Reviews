const redis = require('redis');

class Cache {
    constructor() {
        this.client = null;
        // this.connect();
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

// const redis = require('redis');

// class Cache {
//     constructor(config) {
//         this.client = redis.createClient(config);
//         this.client.on('error', err => {
//             console.error("Redis connection error:", err);
//         });
//     }

//     async set(key, value) {
//         return new Promise((resolve, reject) => {
//             this.client.set(key, value, (err, reply) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(reply);
//                 }
//             });
//         });
//     }

//     async get(key) {
//         return new Promise((resolve, reject) => {
//             this.client.get(key, (err, reply) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(reply);
//                 }
//             });
//         });
//     }
// }

// module.exports = Cache;