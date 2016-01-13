/* 
 * item API
 */


/* express server app dependencies */
var express = require('express'),
    router = express.Router(),

    // colors for dev
    colors = require('colors'),

    /* require our item model */
    Item = require('../models/item.js');


// create item then send back all items 
router.post('/', function(req, res) {

    console.log(req.userr.red);

    /* create a todo, information comes from AJAX request from Angular */
    Item.create({
        body: req.body.body,
        user: req.user._id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        // return all the items
        Item.find({
            user: req.user._id
        }, function(err, items) {
            if (err) {
                res.send(err);
            }

            res.json(items);
        });
    });
});


// get all items
router.get('/', function(req, res) {

    // use mongoose to get all todos in the database
    Item.find({
        user: req.user._id
    }, function(err, items) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        // return all todos in JSON format
        res.json(items);
    });
});


/**
 * update 
 */
// complete item
router.put('/:item_id', function(req, res, next) {

    console.log(req.body.status);

    // update the items status
    Item.update({
        _id: req.params.item_id
    }, {
        complete: req.body.status
    }, function(err, numberAffected, response) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});


// delete a todo
router.delete('/:item_id', function(req, res) {

    // remove item
    Item.remove({
        _id: req.params.item_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        // get and return all the todos after you create another
        // do we really have to do this?
        Item.find({
            user: req.user._id
        }, function(err, items) {
            if (err) {
                res.send(err);
            }

            res.json(items);
        });
    });
});


// expose the route to our app with module.exports
module.exports = router;
