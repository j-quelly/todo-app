var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    colors = require('colors');


User = require('../models/user.js');


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

router.post('/register', function(req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });
});



router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/get-login', function(req, res) {
    res.send(req.user);
});

module.exports = router;
