/** 
 * User
 */


// express server app dependencies 
var express = require('express'),
    router = express.Router(),

    // passport package for easy authentication 
    passport = require('passport'),

    // colors for dev
    colors = require('colors'),

    // require our user model 
    User = require('../models/user.js');

/**
 * Create 
 */
// route for user registration 
router.post('/register', function(req, res, next) {

    // register a new user 
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, account) {

        // if there is an error return a 500 error code 
        if (err) {
            return res.status(500).json({
                err: err
            });
        }

        // automagically authenticate the user
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }

            // if no user return an error
            if (!user) {
                return res.status(200).json({
                    err: info
                });
            }

            // log the user in
            req.logIn(user, function(err) {
                // if error
                if (err) {
                    // return 500 status and message
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }

                // return 200 OK code and message
                res.status(200).json({
                    status: 'Registration & Login successful!'
                });
            });

            // self-invoke
        })(req, res, next);

    });
});


// route for logging the user into the application 
router.post('/login', function(req, res, next) {
    // authenticate
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(200).json({
                err: info
            });
        }

        // log the user in 
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            res.status(200).json({
                status: 'Login successful!',
                username: user.username
            });
        });

    })(req, res, next);
});


// for logging the user out of the app 
router.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});


// check to see the user is logged in 
router.get('/status', function(req, res) {
    res.send(req.user);
});


// expose the route to our app with module.exports
module.exports = router;
