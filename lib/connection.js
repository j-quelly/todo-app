// require mongoose 
var mongoose = require('mongoose'),
	dbUrl = 'mongodb://studio174:studio1742015!@ds037095.mongolab.com:37095/heroku_x5f6lbxh';
 
// connect to mongodb
mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

// used when seeding the database for dev purposes
require('../models/user');