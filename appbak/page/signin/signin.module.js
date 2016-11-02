(function () {
    'use strict';

    angular.module('app.signin', [])
        .controller('loginCtrl', ['$scope','$location','localStorageService','Constants','Rest',loginCtrl]);

    function loginCtrl($scope, $location,localStorageService, Constants,Rest) {
    	var returnUrl = $location.search().returnUrl;
	
        $scope.timestr=new Date().getTime();
        $scope.submitted=false;
        $scope.userName=$location.search().username;

        $scope.login = function () {
            $scope.signinForm.submitted = true;
            if ($scope.signinForm.$invalid) {
                return;
            }
            Rest.login({
                'username': $scope.userName,
                'password': $scope.password,
                'vcode': $scope.vcode
            }).then(function () {
                localStorageService.set('userName', $scope.userName);
                $location.url(returnUrl ? returnUrl : '');
            }, function (res) {
                $scope.getCheckCode();
                Constants.dealRestMsg(res);
            });
        }

        $scope.getCheckCode=function(){
            $scope.timestr=new Date().getTime();
        }
    }
})();
