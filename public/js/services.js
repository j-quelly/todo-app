/**
 * App Services
 */


/**
 * To do list Service
 */
angular.module('myApp').factory('ItemService', ['$q', '$http', function($q, $http) {

    // function for creating an item
    function createItem(arg) {

        /* create a new instance of deferred 
         * defer is a service to help run functions asynchronously
         * this way no other code is executed until a promise is made
         */
        var deferred = $q.defer();

        // send a post request to the server 
        $http.post('/item', {
                body: arg
            })
            // handle success 
            .success(function(data, status) {
                if (status === 200) {
                    // processing is done, time to resolve
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function() {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    }


    // function to get all items for a user
    function getItems() {

        // create a new instance of deferred 
        var deferred = $q.defer();

        // send a get request to the server 
        $http.get('/item')
            // handle success 
            .success(function(data, status) {
                deferred.resolve(data);
            })
            // handle error
            .error(function(data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    }


    // a function for deleting an item
    function deleteItem(id) {

        // create a new instance of deferred 
        var deferred = $q.defer();

        // send a delete request to the server 
        $http.delete('/item/' + id)
            // handle success 
            .success(function(data, status) {
                deferred.resolve(data);
            })
            // handle error
            .error(function(data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    }


    // a function for marking an item as complete or incomplete
    function toggleItem(id, status) {

        // set the status to true or false
        status = (status === false ? true : false);

        // create a new instance of deferred 
        var deferred = $q.defer();

        // send a put request to the server 
        $http.put('/item/' + id, {
                status: status
            })
            // handle success 
            .success(function(data, status) {
                deferred.resolve();
            })
            // handle error
            .error(function(data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    }


    // return our functions
    return ({
        createItem: createItem,
        getItems: getItems,
        deleteItem: deleteItem,
        toggleItem: toggleItem
    });

}]);


/**
 * User authentication service 
 */
angular.module('myApp').factory('UserService', ['$q', '$http',
    function($q, $http) {

        // a function for registering user accounts 
        function register(username, password) {

            // create a new instance of deferred 
            var deferred = $q.defer();

            // send a post request to the server 
            $http.post('/user/register', {
                    username: username,
                    password: password
                })
                // handle success 
                .success(function(data, status) {
                    // if OK and server responds with a message then resolve the promise
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
        function userStatus() {

            /* create a new instance of deferred 
             * defer is a service to help run functions asynchronously
             * this way no other code is executed until a promise is made
             */
            var deferred = $q.defer();

            /* use the angular core http service to interact with the server
             * I think we could also use the ngResource module, but I'm more familiar with $http */
            $http.get('/user/status')
                /* on success set the user to true 
                 * resolve the promise 
                 * or reject the promise
                 */
                .success(function(data, status) {
                    if (status === 200 && data.username) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }
                })
                /* on error set the user to false
                 * and reject the promise 
                 */
                .error(function() {
                    deferred.reject();
                });

            /* return the promise object */
            return deferred.promise;
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
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                /* on error set the user to false
                 * and reject the promise 
                 */
                .error(function(data) {
                    deferred.reject();
                });

            /* return the promise object */
            return deferred.promise;

        }

        // function for logging out
        function logout() {

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get('/user/logout')
                // handle success
                .success(function(data) {
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

        /* return the available functions for use in our app controllers */
        return ({
            userStatus: userStatus,
            login: login,
            logout: logout,
            register: register
        });
    }
]);
