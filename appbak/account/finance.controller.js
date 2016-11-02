(function(){
    'use strict';

    angular.module('app.finance').controller('FinanceCtrl',['$scope','Rest','Constants','Paginator',financeCtrl]);

    function financeCtrl($scope,Rest,Constants,Paginator){
        $scope.accountList=[];
        $scope.paginator = new Paginator();

        Rest.getTotalAccount().then(function(data){
            $scope.amount=data.amount;
        },function(res){
            Constants.dealRestMsg(res);
        });

        function getAccountList(){
            Rest.getFinanceList({page:$scope.currentPage}).then(function(data){
                $scope.paginator.totalItems = data.total;
                $scope.accountList.splice(0, $scope.accountList.length);
                angular.merge($scope.accountList, data.list);
            }, function (res) {
                Constants.dealRestMsg(res);
            });
        }

        $scope.$watch('paginator.currentPage', function () {
            getAccountList();
        });
    }
})();
