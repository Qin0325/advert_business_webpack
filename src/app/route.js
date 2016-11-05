(function(){
    'use strict';

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/',{
            template: require('./ad/adList.html'),
            controller:'AdListCtrl'
        })
    }]);
})();
