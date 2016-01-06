/*
 * express app for PLAR
 */

// express app dependencies
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    // for user authentication
    hash = require('bcrypt-nodejs'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,

    // our express app
    app = express(),

    // require our user schema/model
    User = require('./models/user.js');

// require mongolab database connection
require('./lib/connection');

// tell the application to use JADE as its templating engine when using .render
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/*
 * define our middlewares 
 */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// for session managment
app.use(require('express-session')({
    secret: 'flying spaghetti monster',
    resave: false,
    saveUninitialized: false
}));

// passport auth middleware
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// path to app assetts 
app.use(express.static(path.join(__dirname, 'public')));

// allows the server to serve up injected bower dependencies
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// application routes
app.use('/', require('./routes/index.js'));
app.use('/user/', require('./routes/api.js'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/*
 * error handling
 */
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
