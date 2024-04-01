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
        // the following is used in case of ioredis package
        // if (!this.client) {
        //     throw new Error('Client is not connected!');
        // }
        // return new Promise((resolve, reject) => {
        //     this.client.set(key, value, (err, reply) => {
        //         if (err) {
        //             console.error(err);
        //             reject(err);
        //         } else {
        //             resolve(reply);
        //         }
        //     });
        // });
    }


    async get(key) {
        return await this.client.get(key)
        // // the following is used in case of ioredis package
        // if (!this.client) {
        //     throw new Error('Client is not connected!');
        // }
        // return new Promise((resolve, reject) => {
        //     this.client.get(key, (err, reply) => {
        //         if (err) {
        //             console.error('problem in geting value', err);
        //             reject(err);
        //         } else {
        //             resolve(reply);
        //         }
        //     })
        // })
    }
}

module.exports = new Cache();