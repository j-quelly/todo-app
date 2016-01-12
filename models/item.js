/*
 * to do item model/schema
 */


/* require mongoose for data modeling */
var mongoose = require('mongoose'),

    /* schema class */
    Schema = mongoose.Schema;

/* defines our user schema */
var Item = new Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('items', Item);
