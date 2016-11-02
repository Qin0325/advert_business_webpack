(function () {
    'use strict';

    angular.module('app.adCreate').controller('AdCreateCtrl', ['$scope', '$location', 'WizardHandler', 'Notifier', 'Rest', 'Constants', 'Uploader', adCreateCtrl]);

    function adCreateCtrl($scope, $location, WizardHandler, Notifier, Rest, Constants, Uploader) {
        $scope.ad = {
            area: [],
            gestational: [1],
            client: '1',
            type: '1',
            form: '1',
            adage: 0
        };

        $scope.currentStep = '';

        $scope.onChangeDate = function (flag, time) {
            $scope.ad[flag] = time ? time.getTime() / 1000 : '';
        }

        $scope.onChangeAge = function (range) {
            $scope.ad.adage = range;
        }

        $scope.citySelector = function (cityUtil) {
            $scope.cityUtil = cityUtil;
        }

        $scope.onCheckBaseInfo = function (_scope) {
            _scope.baseForm.submitted = true;
            if (_scope.baseForm.$valid) {
                Rest.checkAccount({
                    click_price:$scope.ad.click_price
                }).then(function(data){
                    WizardHandler.wizard().next();
                },function(res){
                    Constants.dealRestMsg(res);
                })
            }
        }

        $scope.onCheckNorm = function (_scope) {
            _scope.specificationForm.submitted = true;
            if ($scope.ad.adfiles && ($scope.ad.desc || $scope.ad.form == '2')) {
                WizardHandler.wizard().next();
            }
        }

        $scope.onSubmit = function () {
            if ($scope.ad.area && $scope.cityUtil) {
                var cities = $scope.cityUtil.get();
                var cityJson = {};
                angular.forEach(cities, function (item) {
                    var item = item.split(' ');

                    if (!cityJson[item[0]]) {
                        cityJson[item[0]] = [];
                    }
                    cityJson[item[0]].push(item[1]);
                });
                $scope.ad.area = JSON.stringify(cityJson);
            }
            Rest.adCreate($scope.ad).then(function () {
                Notifier.alert('创建广告成功！').then(function () {
                    $location.url('/');
                });
            }, function (res) {
                Constants.dealRestMsg(res);
            });
        }

        function addUploader() {
            $scope.uploader = Uploader({
                server: Constants.adImgUploadUrl,
                pick: '#adPicker',
                accept: {
                    mimeTypes: 'image/jpeg,image/pjpeg,image/png'
                }
            });

            $scope.uploader.on('fileQueued', function (file) {
                if (file.size > 1024 * 500) {
                    Notifier.alert('图片不能超过500K!');
                    return;
                }

                if (file.size > 1024 * 100) {
                    Notifier.confirm('文件上传提示', '当前图片超过100k,会影响App的加载速度,确认上传？').then(function () {
                        _fileUploader($scope.uploader, file);
                    });
                    return;
                }

                _fileUploader($scope.uploader, file);
            });

            $scope.uploader.on('uploadSuccess', function (file, res) {
                $scope.$apply(function () {
                    $scope.ad.adfiles = $scope.uploader.options.domain + '/' + res.key;
                });
            });
        }

        function _fileUploader(uploader, file) {
            Rest.adImgUpload().then(function (data) {
                uploader.options.formData.token = data.uploadToken;
                uploader.options.formData.file = file;
                uploader.options.domain = data.domain;
                uploader.upload(file.id);
            });
        }

        $scope.$watch('currentStep', function (event, next, current) {
            if (current.currentStep == '规格选择') {
                addUploader();
            } else {
                $scope.uploader && $scope.uploader.destroy();
            }
        });
    }
})();
