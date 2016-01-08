/*
 * Angularjs app
 */

/* create our app and require the ngRoute module */
var myApp = angular.module('myApp', ['ngRoute']);

/* configure our app routes */
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/home',
            controller: 'AppCtrl'
        })
        .when('/login', {
            templateUrl: 'partial/login',
            controller: 'LoginCtrl'
        })
        .when('/logout', {
            controller: 'LogoutCtrl'
        })
        .when('/register', {
            templateUrl: 'partial/register',
            controller: 'registerController'
        })
        .when('/one', {
            template: 'This is page one!'
        })
        .when('/two', {
            template: 'This is page two!'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        var currentPage = $location.$$url;

        // restrict all pages except registration
        if (AuthService.isLoggedIn() === false) {
            if (currentPage !== '/register') {
                $location.path('/login');
            }
        }

    });
});
