angular.module('myApp').directive('tdToasts', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            /* watch for scope changes */
            scope.$watchCollection('error', function() {

                if (scope.error) {
                    // display a toast to the user with the error message
                    Materialize.toast(scope.errorMessage, 5000, 'error');
                }

            });

        }
    };
});
