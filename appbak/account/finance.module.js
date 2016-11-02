(function () {
    'use strict';

    angular.module('app.finance', [])
        .filter('amountConvert', [amountConvert]);

    function amountConvert() {
        return function (amount, type) {
            if (type == 'in') {
                return parseInt(amount) < 0 ? '-' : amount;
            } else {
                return parseInt(amount) < 0 ? amount : '-';
            }
        }
    }
})();
