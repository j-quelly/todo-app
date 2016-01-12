/*
 * services for sharing code across the app 
 */

/* a service to tell our controllers the current state of the application */
angular.module('myApp').service('AppStateService', function() {

    var appState = null;

    function getState() {
        return appState;
    }

    function setState(arg) {
        appState = arg;
        return appState;
    }

    return ({
        getState: getState,
        setState: setState
    });

});


/* authentication service */
angular.module('myApp').factory('AuthService', ['$q', '$http',
    function($q, $http) {

        /* create user var */
        var user = null;

        /* a function for registering user accounts */
        function register(firstName, lastName, username, password) {

            /* create a new instance of deferred */
            var deferred = $q.defer();

            /* send a post request to the server */
            $http.post('/user/register', {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password
                })
                /* handle success */
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

        /* a function to ping the server to see if the user is still logged in */
        function isLoggedIn() {

            /* create a new instance of deferred 
             * defer is a service to help run functions asynchronously
             * this way no other code is executed until a promise is made
             */
            var deferred = $q.defer();

            /* use the angular core http service to interact with the server
             * I think we could also use the ngResource module, but I'm more familiar with $http */
            $http.get('/user/get-login')
                /* on success set the user to true 
                 * resolve the promise 
                 * or reject the promise
                 */
                .success(function(data, status) {
                    if (status === 200 && data.username) {
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                /* on error set the user to false
                 * and reject the promise 
                 */
                .error(function() {
                    user = false;
                    deferred.reject();
                });

            /* return the promise object */
            return deferred.promise;
        }

        /* a useless function at this point... */
        function getUserStatus() {
            return user;
        }

        /* function for logging users into the app */
        function login(username, password) {

            /* create a new instance of deferred */
            var deferred = $q.defer();

            /* send a post request to the server */
            $http.post('/user/login', {
                    username: username,
                    password: password
                })
                /* on success set the user to true 
                 * resolve the promise 
                 * otherwise reject the promise
                 */
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                /* on error set the user to false
                 * and reject the promise 
                 */
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });

            /* return the promise object */
            return deferred.promise;

        }

        function logout() {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get('/user/logout')
                // handle success
                .success(function(data) {
                    user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }



        /* return the available functions for use in our app controllers */
        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        });
    }
]);
