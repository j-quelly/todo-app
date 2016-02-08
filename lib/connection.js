/**
 * mongodb connection script
 */

// require mongoose and set the path for connecting 
var mongoose = require('mongoose'),
    dbUrl = 'mongodb://xxxxx:xxxxx@ds037095.mongolab.com:37095/heroku_x5f6lbxh';

// connect to mongo 
mongoose.connect(dbUrl);

// close the Mongoose connection on Control+C 
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

// used when populating the database for dev purposes only 
require('../models/user');
require('../models/item');
