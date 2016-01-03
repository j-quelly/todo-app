var mongoose = require('mongoose');
var dbUrl = 'mongodb://studio174:studio1742015!@ds037095.mongolab.com:37095/mean-app';

mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

// used with populate_db
// require('../models/employee');
// require('../models/team');