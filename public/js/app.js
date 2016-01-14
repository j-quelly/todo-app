/**
 * Angularjs app
 */

/**
 * Create the myApp angular module
 * the app is small enough that we can use just one module 
 * all of the logic bolts on to this module
 * DI the angular route module 
 * DI materialize ui directives courtesy of http://krescruz.github.io/angular-materialize/
 * DI inject nganimate for animations
 */
var myApp = angular.module('myApp', ['ngRoute', 'ui.materialize', 'ngAnimate']);

/** 
 * Configure the client-side routes 
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

/** 
 * Every time the route changes check for login credentials 
 */
myApp.run(function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        // set the current path 
        var currentPage = $location.path(),
            // create an array of unrestricted paths 
            unrestricted = ['/register', '/login'];


        if (unrestricted.indexOf(currentPage) === -1) {
            // user service to check if the user is logged in
            UserService.userStatus()
                .then(function(data) {
                    /* use the rootscope to let the app know the user is logged in
                     * this is var is used for the ng-show directive to display the sidebar
                     * and footer
                     */
                    $rootScope.loggedIn = true;
                    // redirect to root
                    $location.path('/');
                })
                // handle errors if any 
                .catch(function() {
                    $location.path('/login');
                });
        }
    });
});
