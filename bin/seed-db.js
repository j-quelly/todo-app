/*
 * require dependencies
 */
var async = require('async'),
    mongoose = require('mongoose');

    /* require database connection */
    require(process.cwd() + '/lib/connection');

    var User = mongoose.model('User');


// object to seed our db
var data = {
    users: [{
        name: {
            first: 'Jamie',
            last: 'Kelly'
        },
        username: 'jamie@studio174.ca',
        password: 'pass1234'
    }, {
        name: {
            first: 'Jamie',
            last: 'Kelly'
        },
        username: 'jamie@kellyjg.com',
        password: 'test1234'
    }]
};

var deleteUsers = function(callback) {
    console.info('Deleting users');
    User.remove({}, function(error, response) {
        if (error) {
            console.error('Error deleting users: ' + error);
        }

        console.info('Done deleting users');
        callback();
    });
};

var addUsers = function(callback) {
    console.info('Adding users');
    User.create(data.users, function(error) {
        if (error) {
            console.error('Error: ' + error);
        }

        console.info('Done adding users');
        callback();
    });
};

// var deleteTeams = function(callback) {
//     console.info('Deleting teams');
//     Team.remove({}, function(error, response) {
//         if (error) {
//             console.error('Error deleting teams: ' + error);
//         }

//         console.info('Done deleting teams');
//         callback();
//     });
// };

// var addTeams = function(callback) {
//     console.info('Adding teams');
//     Team.create(data.teams, function(error, team1) {
//         if (error) {
//             console.error('Error: ' + error);
//         } else {
//             data.team_id = team1[0]._id;
//             // console.log(team1[0]._id);
//             // console.log(data.team_id); 
//         }

//         console.info('Done adding teams');
//         callback();
//     });
// };

// var updateEmployeeTeams = function(callback) {
//     console.info('Updating employee teams');
//     var team = data.teams[0];

//     // Set everyone to be on the same team to start
//     Employee.update({}, {
//         team: data.team_id
//     }, {
//         multi: true
//     }, function(error, numberAffected, response) {
//         if (error) {
//             console.error('Error updating employe team: ' + error);
//         }

//         console.info('Done updating employee teams');
//         callback();
//     });
// };

// series control flow to perform each operation one after the other
// ...like procedural php
async.series([
    deleteUsers,
    addUsers
], function(error, results) {
    if (error) {
        console.error('Error: ' + error);
    }

    /* close db connection */
    mongoose.connection.close();
    console.log('Done!');
});
