/**
 * myApp Controllers
 */


/**
 * To do list Controller
 */
angular.module('myApp').controller('TodoListController', ['$rootScope', '$scope', 'ItemService', 'UserService',
    function($rootScope, $scope, ItemService, UserService) {

        // start with an empty array of items
        $scope.items = [];
        // set the icon for the search bar (see main.jade for why)
        $scope.icon = 'search';
        $scope.username = $rootScope.username;

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

        // function for clearing search field
        $scope.clearSearch = function() {
            $scope.icon = 'search';
            $scope.query = '';
        };

        // function used for adding items
        $scope.createItem = function() {

            // assume there are no errors
            $scope.error = false;

            // use item service to add to db
            ItemService.createItem($scope.todoList.todoText)
                // handle success
                .then(function(data) {
                    // push in new data from the server
                    $scope.items.push(data[data.length - 1]);
                    // reset input field
                    $scope.todoList.todoText = '';
                })
                // handle error and display friendly error message 
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong, please try again.";
                });

        };

        // function used for deleting items
        $scope.deleteItem = function(id, index) {

            // use item service to remove from db
            ItemService.deleteItem(id)
                // handle success
                .then(function(data) {
                    // remove the item 
                    $scope.items.splice(index, 1);
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

        // let the user know how many items remain
        $scope.remaining = function() {
            // set a count
            var count = 0;
            // loop thru items
            angular.forEach($scope.items, function(item) {
                // if the item is not done then increase
                count += item.complete ? 0 : 1;
            });
            // return the count to the DOM
            return count;
        };

        // archive one or many items
        $scope.archive = function() {
            // loop thru items
            angular.forEach($scope.items, function(item) {
                // if the item is complete
                if (item.complete) {
                    // use item service to remove from db
                    ItemService.deleteItem(item._id)
                        // on success
                        .then(function(data) {
                            // repopualte the list from db
                            $scope.items = data;
                        })
                        // handle error and display friendly error message 
                        .catch(function() {
                            // set an error
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
angular.module('myApp').controller('LoginController', ['$rootScope', '$scope', '$location', 'UserService',

    function($rootScope, $scope, $location, UserService) {

        // create an empty object for the form 
        $scope.loginForm = {};

        $scope.login = function() {

            // assume our form is pristine 
            $scope.error = false;

            // call login from the authentication service 
            UserService.login($scope.loginForm.username, $scope.loginForm.password)
                // on success redirect to root 
                .then(function(data) {
                    $rootScope.loggedIn = true;
                    $rootScope.username = data.username;
                    $location.path('/');
                })
                // on error retrun a friendly message that the td-toast directive is watching for 
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
angular.module('myApp').controller('RegisterController', ['$scope', '$location', 'UserService',
    function($scope, $location, UserService) {

        // create an empty object for our model 
        $scope.registerForm = {};

        $scope.register = function() {

            // initialize vars 
            $scope.error = false;

            // call register from service 
            UserService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success and forward to the login page 
                .then(function() {
                    $location.path('/');
                })
                // handle error and display friendly error message 
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
angular.module('myApp').controller('LogoutController', ['$rootScope', '$scope', '$location', 'UserService',
    function($rootScope, $scope, $location, UserService) {

        // function for loggin the user out
        $scope.logout = function() {
            // call logout from service
            UserService.logout()
                // on success
                .then(function() {
                    // redirect to the login page
                    $location.path('/login');
                    // let the app know the user has logged out
                    $rootScope.loggedIn = false;
                });

        };

    }
]);
