/**
 * myApp directives
 */


/**
 * Directive for injecting the DOM with materialize toasts 
 */
angular.module('myApp').directive('tdToasts', function() {
    return {
        // restice this directive to an attribute 
        restrict: 'A',
        link: function(scope, element, attrs) {

            // watch for scope changes 
            scope.$watch('error', function() {

                if (scope.error) {
                    // display a toast to the user with the error message
                    Materialize.toast(scope.errorMessage, 5000, 'error');
                }

            });

        }
    };
});


/**
 * Directive for the sidebar
 */
angular.module('myApp').directive('tdSidebar', function() {
    return {
        // restice this directive to an attribute 
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('.button-collapse').sideNav({
                menuWidth: 240, // Default is 240
                edge: 'left', // Choose the horizontal origin
                closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
            });
        }
    };
});
