'use strict';

const express = require('express');
const fs = require('fs');
const redis = require('../db/redis-cli');
const errHandler = require('../utils/error-handler');

const router = express.Router();
const logStream = fs.createWriteStream('log.txt', {flag: 'a'});
const COUNTER = 'count:1:int';

const route = (req) => {
    return new Promise(
        function (resolve, reject) {
            let loggedData = '';
            let count = 0;

            if (req.query) {
                try {
                    loggedData = JSON.stringify(req.query) + "\n";
                    count = parseInt(req.query.count, 10);
                }
                catch (error) {
                    reject(error);
                }

                // initially I used fs.appendFile here, but after I resolved to use
                // stream for more performance. A discuss welcome.
                //
                // fs.appendFile('log.txt', loggedData, (error) => {
                //    return error ? reject(error)
                //        : console.log(`Data logged: ${loggedData}`)
                // });
                if (loggedData) {
                    logStream.write(loggedData);
                }

                if (count > 0) {
                    redis.incrby(COUNTER, count, (error, replay) => {
                        return error ? reject(error)
                            : resolve(replay);
                    });
                }
                else resolve();
            }
            else resolve();
        }
    )
};

exports.route = route;
exports.router = router.get('/', function (req, res) {
        route(req)
            .then(function () {
                redis.get(COUNTER, function (error, replay) {
                    error ? errHandler(error)
                        : res.send(`Actual counter is: ${replay}. Thank you for your request =)`);
                });
            })
            .catch(function (error) {
                errHandler(error);
            })
    }
);
