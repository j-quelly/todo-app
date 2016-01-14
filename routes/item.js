/** 
 * Item
 */


// express server app dependencies 
var express = require('express'),
    router = express.Router(),

    // colors for dev
    colors = require('colors'),

    // require our item model 
    Item = require('../models/item.js');


/**
 * Create Item
 */
router.post('/', function(req, res) {

    // pass the item body and the user id
    Item.create({
        body: req.body.body,
        user: req.user._id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        // find all items where the user id matches who's logged in
        Item.find({
            user: req.user._id
        }, function(err, items) {
            // on error
            if (err) {
                res.send(err);
            }

            // return the object
            // .json sets the headers, yay frameworks!
            res.json(items);
        });

    });
});


/**
 * Read Item
 */
router.get('/', function(req, res) {

    // use mongoose to find all items that match the user
    Item.find({
        user: req.user._id
    }, function(err, items) {
        // if there is an error, send it!
        if (err) {
            res.send(err);
        }

        // return javascript obejct notation
        res.json(items);
    });
});


/**
 * Update Item
 */
router.put('/:item_id', function(req, res, next) {

    // update the items status
    Item.update({
        _id: req.params.item_id
    }, {
        complete: req.body.status
    }, function(err, items, response) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});


/**
 * Delete Item
 */
router.delete('/:item_id', function(req, res) {

    // remove item
    Item.remove({
        _id: req.params.item_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        // find all items that match user and return them
        Item.find({
            user: req.user._id
        }, function(err, items) {
            if (err) {
                res.send(err);
            }

            // return json object
            res.json(items);
        });
    });
});


// expose the route to our app with module.exports
module.exports = router;
