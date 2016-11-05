angular.module('app.adList').filter('ageRangeConvert', [function () {
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
}]);
