(function(){
    'use strict';

    angular.module('app.common',[])
        .filter('trim',[trim])
        .filter('datelineToDate',['$filter',datelineToDate]);

    function trim(){
        return function(str){
            return str.replace(/(^\s*)|(\s*$)/g,'')
        }
    }

    function datelineToDate($filter){
        return function(dateline){
            var timeStr=parseInt(dateline)*1000;

            if(isNaN(timeStr)){
                return '-';
            }

            var date=new Date(timeStr);
            return $filter('date')(date,'yyyy-MM-dd');
        }
    }
})();
