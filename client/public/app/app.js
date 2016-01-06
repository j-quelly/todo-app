var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../../views/index.jade'
        })
        .when('/login', {
            templateUrl: '../../views/login.jade',
            controller: 'loginController',
            restricted: false
        })
        .when('/logout', {
            controller: 'logoutController',
            restricted: true
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            restricted: false
        })
        .when('/one', {
            template: '<h1>This is page one!</h1>',
            restricted: true
        })
        .when('/two', {
            template: '<h1>This is page two!</h1>',
            restricted: true
        })
        .otherwise({
            redirectTo: '/login'
        });
});


myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            $location.path('/login');
        }
    });
});
