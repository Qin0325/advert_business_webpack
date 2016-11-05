(function(){
    'use strict';

    angular.module('app.common').directive('slimScroll', [slimScroll]);
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
})();
