angular.module('app.adList').filter('clientConvert', [function(){
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
}]);
