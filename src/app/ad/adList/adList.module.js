(function () {
    'use strict';

    angular.module('app.adList', [])
        .filter('adStatusConvert', [adStatusConvert])
        .filter('clientConvert', [clientConvert])
        .filter('adFormConvert', [adFormConvert])
        .filter('ageRangeConvert', [ageRangeConvert])
        .filter('areaConvert', [areaConvert]);

    function adStatusConvert() {
        return function (code) {
            var status = '未审核';
            switch (code) {
                case "1":
                    status = "审核通过 ";
                    break;
                case "2":
                    status = "审核未通过";
                    break;
                case "3":
                    status = "暂停";
                    break;
                case "4":
                    status = "启用";
                    break;
                case "5":
                    status = "投放结束";
                    break;
                default:
                    break;
            }

            return status;
        }
    }

    function clientConvert() {
        return function (type) {
            var typeName = "辣妈帮APP";
            switch (parseInt(type)) {
                case 1:
                    typeName = "辣妈帮APP";
                    break;
                case 2:
                    typeName = "孕期伴侣";
                    break;
                default:
                    break;
            }
            return typeName;
        }
    }

    function adFormConvert() {
        return function (form) {
            var form = parseInt(form);
            switch (form) {
                case 1:
                    return '软广';
                    break;
                default:
                    return '硬广';
                    break;
            }
        }
    }

    function ageRangeConvert() {
        return function (rangeStr) {
            if (rangeStr == '不限年龄' || !rangeStr) {
                return rangeStr;
            }
            var range = rangeStr.split(',');
            if (!range[0] || !range[1]) {
                return '不限年龄';
            }
            return range[0] + '-' + range[1] + '岁';
        }
    }

    function areaConvert() {
        return function (areaStr) {
            if (areaStr != '不限区域') {
                var areaJSON = eval('(' + areaStr + ')');
                var area = '';
                angular.forEach(areaJSON, function (cities, province) {
                    area += province + "(" + cities.toString() + ');  '
                });
                !area && (area = '不限区域');
                return area;
            }
            return '不限区域'
        }
    }

})();
