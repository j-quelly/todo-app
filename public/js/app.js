var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/home'
        })
        .when('/login', {
            templateUrl: 'partial/login',
            controller: 'loginController',
            restricted: false
        })
        .when('/logout', {
            controller: 'logoutController',
            restricted: true
        })
        .when('/register', {
            templateUrl: 'partial/register',
            controller: 'registerController',
            restricted: false
        })
        .when('/one', {
            template: 'This is page one!',
            restricted: false
        })
        .when('/two', {
            template: 'This is page two!',
            restricted: true
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
    // $rootScope.$on('$routeChangeStart', function(event, next, current) {
    //     if (AuthService.isLoggedIn() === false) {
    //         $location.path('/login');
    //     }
    // });
});