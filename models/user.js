/**
 * User model
 */

// require mongoose for data modeling 
var mongoose = require('mongoose'),

    // schema class 
    Schema = mongoose.Schema,

    // passport's local strat 
    passportLocalMongoose = require('passport-local-mongoose');

// defines our user schema 
var User = new Schema({
    username: String,
    password: String
});

// plugs into our user schema to take care of salting and hashing the password 
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
