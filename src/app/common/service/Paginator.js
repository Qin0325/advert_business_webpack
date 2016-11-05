angular.module('app.common').service('Paginator', [Paginator]);

function Paginator() {
    return function (options) {
        var options = options || {};
        var _defaults = {
            maxSize: 5,
            currentPage: 1,
            itemsPerPage: 20
        }
        angular.extend(this, _defaults, options);
    }
}
