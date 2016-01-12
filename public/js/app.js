/*
 * Angularjs app
 */

/* 
 * create the myApp angular module
 * the app is small enough that we can use just one module 
 * all of the logic bolts on to this module
 * DI the angular route module
 */
var myApp = angular.module('myApp', ['ngRoute']);

/* 
 * configure the client-side routes 
 */
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/main',
            controller: 'TodoListController'
        })
        .when('/login', {
            templateUrl: 'partial/login',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'partial/register',
            controller: 'RegisterController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

/* 
 * every time the route changes check for login credentials 
 */
myApp.run(function($rootScope, $location, AuthService) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        /* set the current path */
        var currentPage = $location.path(),
            /* create an array of unrestricted paths */
            unrestricted = ['/register', '/login'];


        if (unrestricted.indexOf(currentPage) === -1) {
            AuthService.isLoggedIn()
                .then(function() {
                    /* user is logged in
                     * redirect to root
                     * set the app state?
                     */
                    // console.log(AuthService.getUserStatus());
                    $location.path('/');
                })
                /* handle error */
                .catch(function() {
                    $location.path('/login');
                });
        }
    });
});
