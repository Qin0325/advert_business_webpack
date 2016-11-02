(function () {
    'use strict';

    angular.module('app.adList').controller('AdListCtrl', ['$scope', '$uibModal', 'Rest', 'Constants', 'Paginator', adListCtrl]);

    function adListCtrl($scope, $uibModal, Rest, Constants, Paginator) {
        $scope.adList = [];
        $scope.paginator = new Paginator();
        $scope.searchParam = {};

        $scope.onDetail = function (ad) {
            $uibModal.open({
                templateUrl: 'app/ad/adList/adDetailModal.html',
                size: 'ad-detail-lg',
                controller: function ($scope, $uibModalInstance, ad) {
                    $scope.ad = ad;
                    Rest.adDetail({id: ad.id}).then(function (data) {
                        $scope.ad = data;
                    }, function (res) {
                        Constants.dealRestMsg(res);
                    });
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss("cancel");
                    }
                },

                resolve: {
                    ad: function () {
                        return ad
                    }
                }
            });
        }

        $scope.onChangeDate = function (flag, time) {
            $scope.searchParam[flag] = time ? time.getTime() / 1000 : '';
        }

        $scope.onSearch = function () {
            if ($scope.paginator.currentPage != 1) {
                $scope.paginator.currentPage = 1;
            }

            $scope.paginator.currentPage == 1 ? getAdsList() : $scope.paginator.currentPage = 1;
        }

        function getAdsList() {
            $scope.adList.splice(0, $scope.adList.length);
            $scope.searchParam.page = $scope.paginator.currentPage;
            Rest.getAdList($scope.searchParam).then(function (data) {
                $scope.paginator.totalItems = data.total;
                angular.merge($scope.adList, data.list);
            }, function (res) {
                Constants.dealRestMsg(res);
            });
        }

        $scope.$watch('paginator.currentPage', function () {
            getAdsList();
        });
    }
})();


