(function () {
    'use strict';

    angular.module('app.common').factory('Resources', [resources]);

    function resources() {
        return {
            getAdList:['GET','/data/getAdList.json'],
            adDetail:['GET','/data/getAdList.json']
        }
    }
})();
