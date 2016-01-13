/*
 * app directives
 */

/* directive for injecting the DOM with materialize toasts */
angular.module('myApp').directive('tdToasts', function() {
    return {
        /* restice this directive to an attribute */
        restrict: 'A',
        link: function(scope, element, attrs) {

            /* watch for scope changes */
            scope.$watch('error', function() {

                if (scope.error) {
                    // display a toast to the user with the error message
                    Materialize.toast(scope.errorMessage, 5000, 'error');
                }

            });

        }
    };
});
