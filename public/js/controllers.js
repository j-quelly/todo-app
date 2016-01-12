/*
 * app controllers
 * for passing data to and from the DOM
 */

/* login controller */
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
                    console.log(AppStateService.getState());
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

/* registration contrller */
angular.module('myApp').controller('RegisterController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        /* create an empty object for our model */
        $scope.registerForm = {};

        $scope.register = function() {

            /* initialize vars */
            $scope.error = false;

            /* call register from service */
            AuthService.register($scope.registerForm.firstName, $scope.registerForm.lastName, $scope.registerForm.username, $scope.registerForm.password)
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

/* log out controller */
angular.module('myApp').controller('LogoutController', ['$scope', '$location', 'AuthService', 'AppStateService',
    function($scope, $location, AuthService, AppStateService) {

        $scope.appState = AppStateService.getState();

        console.log($scope.appState);

        $scope.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
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
