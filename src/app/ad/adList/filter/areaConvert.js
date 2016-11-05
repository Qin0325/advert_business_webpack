angular.module('app.adList').filter('areaConvert', [function() {
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
    }]);
