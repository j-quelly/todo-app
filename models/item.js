/*
 * to do item model/schema
 */


/* require mongoose for data modeling */
var mongoose = require('mongoose'),

    /* schema class */
    Schema = mongoose.Schema;

/* defines our item schema */
var Item = new Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    complete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('items', Item);
