jest.unmock('../track');

import {route} from '../track'

let request = {
    query: {
        count: 0
    }
};
const response = {
    send: function (data) {
        console.log('response.send ', data);
    }
};

describe('track router', () => {

    pit("first request must init a db", () => {
        request.query.count = 11;
        return route(request, response)
            .then(function (result) {
                //console.info('result ', result);
                expect(result).toBe(11);
            })
            .catch(function (error) {
                console.log('error ', error);
            })
    });

    pit("second request must increment initial value", () => {
        request.query.count = 14;
        return route(request, response)
            .then(function (result) {
                //console.info('result ', result);
                expect(result).toBe(25);
            })
            .catch(function (error) {
                console.log('error ', error);
            })
    });

    pit("request without count can't change a db value", () => {
        request.query.count = null;
        return route(request, response)
            .then(function (result) {
                //console.info('result ', result);
                expect(result).toBe(undefined);
            })
            .catch(function (error) {
                console.log('error ', error);
            })
    });

    pit("request with incorrect count can't change a db value", () => {
        request.query.count = 'asdasdasdasda';
        return route(request, response)
            .then(function (result) {
                //console.info('result ', result);
                expect(result).toBe(undefined);
            })
            .catch(function (error) {
                console.log('error ', error);
            })
    });

    pit("check if two tests before don't change db value", () => {
        request.query.count = 1;
        return route(request, response)
            .then(function (result) {
                //console.info('result ', result);
                expect(result).toBe(26);
            })
            .catch(function (error) {
                console.log('error ', error);
            })
    });
});