(function () {
    'use strict';

    angular.module('app.signup', []).controller('RegCtrl', ['$scope', 'Notifier', 'Rest','Constants', regCtrl]);

    function regCtrl($scope, Notifier, Rest,Constants) {
        $scope.submitted = false;
        $scope.register = function () {
            $scope.signupForm.submitted = true;
            if ($scope.signupForm.$invalid) {
                return;
            }
            Rest.register({
                username: $scope.userName,
                password: $scope.password,
                repassword: $scope.repassword,
                email: $scope.email,
                businessname: $scope.businessName,
                mobile: $scope.mobile,
                qq: $scope.qq
            }).then(function () {
                $scope.signupForm.submitted = false;
                Notifier.alert('注册成功，请前往您的邮箱激活账号！');
            }, function (res) {
                $scope.signupForm.submitted = false;
                Constants.dealRestMsg(res);
            });
        }
    }
})();
