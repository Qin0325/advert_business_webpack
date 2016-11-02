(function () {
    'use strict';

    angular.module('app.nav').controller('HeaderCtrl', ['$scope', '$location', 'Notifier', 'localStorageService', 'Rest', HeaderCtrl]);

    function HeaderCtrl($scope, $location, Notifier,localStorageService, Rest) {
        $scope.logout = function () {
            Notifier.confirm('您确定要退出登录！').then(function(){
                localStorageService.clearAll();
                Rest.logout();
                $location.url('page/signin');
            });
        }
    }
})();
