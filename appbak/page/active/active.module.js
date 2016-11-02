(function(){
    'use strict';

    angular.module('app.active',[])
        .controller('ActiveCtrl',['$scope','$location','Rest','Notifier',activeCtrl]);

    function activeCtrl($scope,$location,Rest,Notifier){
        var verifyCode=$location.search().verify;

        Rest.active({verify:verifyCode}).then(function(data){
            Notifier.alert('您的账号已激活成功！将为您跳转到登录页.....').then(function(){
                $location.url('page/signin?username='+data.username);
            });
        },function(res){
            $scope.status=res.status_code;
            $scope.message=res.message;
        })
    }
})();
