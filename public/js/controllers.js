/*
 * app controllers for pushing data to the DOM
 */

/* login controller */
angular.module('myApp').controller('LoginCtrl', ['$scope', '$location', 'AuthService',

    function($scope, $location, AuthService) {

        console.log('user status:' + AuthService.getUserStatus());

        $scope.loginForm = {};

        $scope.login = function() {

            /* reset the error object */
            $scope.error = false;
            // $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function() {
                    $location.path('/');
                    // $scope.disabled = false;
                    // $scope.loginForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username or password, please try again";
                    // $scope.disabled = false;
                    // $scope.loginForm = {};
                });

            // console.log($scope.loginForm);

        };

    }
]);


angular.module('myApp').controller('LogoutCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            console.log('user status:' + AuthService.getUserStatus());

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);


angular.module('myApp').controller('RegisterCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        console.log('user status:' + AuthService.getUserStatus());

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


/**
 * To do list controller
 *
 */
angular.module('myApp').controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [{
        text: 'learn angular',
        done: true
    }, {
        text: 'build an angular app',
        done: false
    }];

    todoList.addTodo = function() {
        todoList.todos.push({
            text: todoList.todoText,
            done: false
        });
        todoList.todoText = '';
    };

    todoList.remaining = function() {
        var count = 0;
        angular.forEach(todoList.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    todoList.archive = function() {
        var oldTodos = todoList.todos;
        todoList.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) todoList.todos.push(todo);
        });
    };
});
