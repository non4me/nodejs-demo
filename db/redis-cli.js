'use strict';

const redis = require('redis');
const port = 6379;
const host = '127.0.0.1';
const client = redis.createClient(port, host);

client
    .on('connect', function () {
        return console.log('Redis connected');
    })
    .on('error', function (error) {
        console.log(' !'.repeat(42),'\n',
            "Didn't find Redis connection! Please set up right Port and Host in /db/redis-cli.js",
            '\n', '! '.repeat(42));
        process.exit(0);
    });

module.exports = client;