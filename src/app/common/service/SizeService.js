angular.module('app.common').factory('SizeService', [sizeService]);

function sizeService() {
    var height = document.body.clientHeight || document.documentElement.clientHeight
        , headerHeight = 50
        , footerHeight = 50,
        sidebarHeight = height - headerHeight,
        contentHeight = height - footerHeight - headerHeight,
        contentListHeight = contentHeight - 30 - 50 - 60 - 50;

    return {
        sidebarHeight: sidebarHeight,
        contentListHeight: contentListHeight
    }
}
