(function(){
    'use strict';

    angular.module('app.common').directive('datetimeRange', ['$filter', datetimeRange]);

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
