/* 
 * user api 
 */


/* express server app dependencies */
var express = require('express'),
    router = express.Router(),

    /* passport package for easy authentication */
    passport = require('passport'),

    /* require our user model */
    User = require('../models/user.js');


/* route for user registration */
router.post('/register', function(req, res) {

    /* register a new user */
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, account) {

        /* if there is an error return a 500 error code */
        if (err) {
            return res.status(500).json({
                err: err
            });
        }

        /* otherwise authenticate the new user? */
        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });
});


/* route for logging the user into the application */
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(200).json({
                err: info
            });
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            // store a cookie or session var?
            // console.log(req.user);

            res.status(200).json({
                status: 'Login successful!'
            });
        });

    })(req, res, next);
});


/* for logging the user out of the app */
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


/* check to see the user is logged in */
router.get('/get-login', function(req, res) {
    res.send(req.user);
});


module.exports = router;
