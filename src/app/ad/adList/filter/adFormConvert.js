angular.module('app.adList').filter('adFormConvert', [function () {
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
}]);
