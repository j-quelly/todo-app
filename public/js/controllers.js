/**
 * App Controllers
 */


/**
 * To do list Controller
 */
angular.module('myApp').controller('TodoListController', ['$scope', 'ItemService', 'AuthService',
    function($scope, ItemService, AuthService) {

        // start with an empty array of items
        $scope.items = [];

        // use this service to get the username
        AuthService.userStatus()
            .then(function(data) {
                $scope.username = data.username;
            })
            // handle error 
            .catch(function() {
                $location.path('/login');
            });

        // use our service to get all the users items
        ItemService.getItems()
            // handle success
            .then(function(data) {
                $scope.items = data;
            })
            // handle error and display friendly error message 
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Something went wrong, please try again.";
            });

        // function used for adding items
        $scope.createItem = function() {

            // use item service to add to db
            ItemService.createItem($scope.todoText)
                // handle success
                .then(function(data) {
                    // push in new data from the server
                    $scope.items = data;
                    // reset input field
                    $scope.todoText = '';
                })
                // handle error and display friendly error message 
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong, please try again.";
                });
        };

        // function used for deleting items
        $scope.deleteItem = function(id) {

            // use item service to remove from db
            ItemService.deleteItem(id)
                // handle success
                .then(function(data) {
                    $scope.items = data;
                })
                // handle error and display friendly error message 
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong, please try again.";
                });
        };

        // toggle item status
        $scope.toggleItem = function(id, index) {

            // status var so our service knows what to do
            var status = $scope.items[index].complete;

            // use item service to remove from db
            ItemService.toggleItem(id, status)
                // handle error and display friendly error message 
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong, please try again.";
                });
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.items, function(item) {
                count += item.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var oldItems = $scope.items;
            $scope.items = [];
            angular.forEach(oldItems, function(item) {
                if (item.done) {
                    // use item service to remove from db
                    ItemService.deleteItem(item._id)
                        // handle success
                        .then(function(data) {
                            // this needs to be improved
                            $scope.items = data;
                        })
                        // handle error and display friendly error message 
                        .catch(function() {
                            $scope.error = true;
                            $scope.errorMessage = "Something went wrong, please try again.";
                        });

                }
            });
        };

    }
]);


/**
 * Login Controller
 */
angular.module('myApp').controller('LoginController', ['$scope', '$location', 'AuthService', 'AppStateService',

    function($scope, $location, AuthService, AppStateService) {

        /* create an empty object for the form */
        $scope.loginForm = {};

        $scope.login = function() {

            /* assume our form is pristine */
            $scope.error = false;

            /* call login from the authentication service */
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                /* on success redirect to root */
                .then(function() {
                    /* set the state of the application */
                    AppStateService.setState(true);
                    // console.log(AppStateService.getState());
                    $location.path('/');
                })
                /* on error retrun a friendly message that the td-toast directive is watching for */
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username or password, please try again";
                });

        };

    }
]);


/**
 * Registration Controller
 */
angular.module('myApp').controller('RegisterController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        /* create an empty object for our model */
        $scope.registerForm = {};

        $scope.register = function() {

            /* initialize vars */
            $scope.error = false;

            /* call register from service */
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                /* handle success and forward to the login page */
                .then(function() {
                    $location.path('/login');
                })
                /* handle error and display friendly error message */
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong, please try again.";
                });
        };
    }
]);


/**
 * Log out Controller
 */
angular.module('myApp').controller('LogoutController', ['$scope', '$location', 'AuthService', 'AppStateService',
    function($scope, $location, AuthService, AppStateService) {

        // $scope.appState = AppStateService.getState();

        // // console.log($scope.appState);


        $scope.logout = function() {
            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);
