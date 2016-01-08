angular.module('myApp').controller('AppCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.appState = 'loggedIn';
        console.log($scope.hello);
    }
]);

angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', 'AuthService',

    function($scope, $location, AuthService) {

        // console.log(AuthService.getUserStatus());
        $scope.myValue = true;

        $scope.login = function() {


            if ($scope.loginForm === undefined) {

                // return an error when the user trys to submit the form without entering credentials
                $scope.error = true;
                $scope.errorMessage = "Invalid username or password, please try again";

            } else {

                // no error
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                    // handle success
                    .then(function() {
                        $location.path('/');
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    })
                    // handle error
                    .catch(function() {
                        $scope.error = true;
                        $scope.errorMessage = "Invalid username or password, please try again";
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    });
            }


        };

    }
]);


angular.module('myApp').controller('LogoutCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            console.log(AuthService.getUserStatus());

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);


angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        console.log(AuthService.getUserStatus());

        $scope.register = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function() {
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };

    }
]);
