/*
 * define our user schema
 */

// require mongoose for object modeling
var mongoose = require('mongoose'),

    // create a schema
    Schema = mongoose.Schema,

    // passport helps with authenticating
    passportLocalMongoose = require('passport-local-mongoose'),

    // instantiate a user schema
    UserSchema = new Schema({
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
