(function(){
    'use strict';

    angular.module('app.common')
        .directive('slimScroll', slimScroll)
        .directive('customPage', customPage)
        .directive('datetimeRange', ['$filter', datetimeRange]);

    function customPage() {
        var directive = {
            restrict: 'A',
            controller: ['$scope', '$element', '$location', customPageCtrl]
        };

        return directive;

        function customPageCtrl($scope, $element, $location) {
            var addBg, path;

            path = function() {
                return $location.path();
            };

            addBg = function(path) {
                $element.removeClass('body-wide body-err body-lock body-auth');
                switch (path) {
                    case '/404':
                    case '/page/404':
                    case '/page/500':
                        return $element.addClass('body-wide body-err');
                    case '/page/signin':
                    case '/page/signup':
                    case '/page/active':
                    case '/page/forgot-password':
                        return $element.addClass('body-wide body-auth');
                    case '/page/lock-screen':
                        return $element.addClass('body-wide body-lock');
                }
            };

            addBg($location.path());

            $scope.$watch(path, function(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return addBg($location.path());
            });
        }
    }

    function slimScroll() {
        return {
            restrict: 'A',
            controller:function($scope,$attrs,SizeService){
                $scope.slimHeight=SizeService[$attrs.slimHeight]
            },
            link: function(scope, ele, attrs) {
                return ele.slimScroll({
                    height: scope.slimHeight
                });
            }
        };
    }

    /**
     * 选择时间范围选择器
     * @param $filter
     * @returns {{restrict: string, replace: boolean, scope: {startTime: string, endTime: string, onChange: string, inputClass: string}, template: string, link: link}}
     */
    function datetimeRange($filter) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                startTime: '=',
                endTime: '=',
                onChange: '&',
                inputClass: '@',
                format: '@',
                hideTime: '@',
                startFlag: '@',
                endFlag: '@'
            },
            template: '<div class=""><input class="datetime-start {{inputClass}}" type="text" ng-value="startTime" placeholder="开始时间"/>&nbsp;至&nbsp;<input class="datetime-end {{inputClass}}" type="text" placeholder="结束时间"/></div>',
            link: function (scope, element, attr) {
                element.find('.datetime-start').datetimepicker({
                    defaultTime: '00:00',
                    format: scope.format ? scope.format : 'Y-m-d H:i',
                    value: scope.startTime ? $filter('datelineToDate')(scope.startTime, 'yyyy-MM-dd HH:mm') : "",
                    timepicker: scope.hideTime ? false : true,
                    onShow: function (ct) {
                        this.setOptions({
                            maxDate: element.find('.datetime-end').val() ? element.find('.datetime-end').val() : false
                        })
                    },
                    onChangeDateTime:function(current_time,$input){
                        if (scope.onChange) {
                            scope.$apply(function () {
                                scope.onChange({
                                    flag: scope.startFlag ? scope.startFlag : 'start',
                                    time: current_time
                                });
                            });
                        }
                    }
                });
                element.find('.datetime-end').datetimepicker({
                    defaultTime: '23:59',
                    format: scope.format ? scope.format : 'Y-m-d H:i',
                    value: scope.endTime ? $filter('datelineToDate')(scope.endTime, 'yyyy-MM-dd HH:mm') : '',
                    timepicker: scope.hideTime ? false : true,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: element.find('.datetime-start').val() ? element.find('.datetime-start').val() : false
                        });
                    },
                    onChangeDateTime:function(current_time,$input){
                        if (scope.onChange) {
                            scope.$apply(function () {
                                scope.onChange({
                                    flag: scope.endFlag ? scope.endFlag : 'start',
                                    time: current_time
                                });
                            });
                        }
                    }
                });
            }
        }
    }
})();
