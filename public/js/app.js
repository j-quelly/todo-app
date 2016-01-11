/*
 * Angularjs app
 */

/* 
 * create our angular module 
 * all of our logic bolts on to this module
 * inject the angular route module
 */
var myApp = angular.module('myApp', ['ngRoute']);

/* 
 * configure our client-side routes 
 */
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/main',
            controller: 'TodoListController'
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
            controller: 'RegisterCtrl'
        })
        .when('/one', {
            template: '<h1>This is page one!</h1>'
        })
        .when('/two', {
            template: '<h1>This is page two!</h1>'
        })
        .otherwise({
            redirectTo: '/'
        });
});

/* run this on initial load*/
myApp.run(function($rootScope, $location, $http, AuthService) {
    $http.get('/user/get-login')
        .success(function(data) {
            console.log(data);
            if (data && data.username) {
                console.log('in');
                console.log(data.username);
                $rootScope.user = data.username;
            } else {
                console.log('out');
            }
        });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if ($rootScope.user) {
            console.log('user');
        } else {
            console.log(' no user');
        }

        // AuthService.isLoggedIn();

        // var currentPage = $location.$$url;
        // AuthService.isLoggedIn()
        //     .then(function() {
        //         // user is logged in

        //         // console.log(AuthService.isLoggedIn());
        //     })
        //     // handle error
        //     .catch(function() {
        //         $location.path('/login');
        //     });

        /*       $http.get('/user/get-login')
                   // handle success
                   .success(function(user, status) {
                       if (status === 200 && user.username) {
                           // do nothing, right?                        
                       } else {
                           $location.path('/login');
                       }
                   })
                   // handle error
                   .error(function(data) {
                       $location.path('/login');
                   });*/


        // console.log('reatus:' + AuthService.getUserStatus());

        // if (currentPage !== '/register') {
        // $location.path('/login');
        // }


    });
});
