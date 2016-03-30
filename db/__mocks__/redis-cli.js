let db = {};

exports.incrby = function (key, value, callback) {
    //console.log('incrby', key, value, callback)

    db[key] = db[key] || 0;
    db[key] += value || 0;

    callback(null, db[key]);
};
