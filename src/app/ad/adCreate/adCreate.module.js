(function () {
    'use strict';

    angular.module('app.adCreate', [])
        .service('Uploader', uploaderCreator)
        .directive('uiSlider', uiSlider)
        .directive('citySelector', citySelector);

    function uploaderCreator() {
        function Uploader(options) {
            var defaults = {
                auto: false,
                swf: '/vendor/webuploader/Uploader.swf',
                method: 'POST',
                chunk: false
            }
            var uploader = WebUploader.create(angular.extend(defaults, options));

            return uploader;
        }

        return Uploader;
    }

    function uiSlider() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                onRange: '&'
            },
            template: '<div class="ui-slider">' +
            '<div class="slider-range"></div><input type="text" class="amount" readonly style="border:0; color:#f6931f; font-weight:bold;"/>' +
            '</div>',
            link: function (scope, element, attr) {
                var range = attr.range.split(',');
                element.find('.slider-range').slider({
                    range: true,
                    min: parseInt(attr.min),
                    max: parseInt(attr.max),
                    values: [parseInt(range[0]), parseInt(range[1])],
                    slide: function (event, ui) {
                        element.find('.amount').val(ui.values[0] + attr.unit + " - " + ui.values[1] + attr.unit);
                        scope.range = ui.values[0] + ',' + ui.values[1];

                        if(scope.onRange){
                            scope.$apply(function(){
                                scope.onRange({range:scope.range});
                            })
                        }


                    }
                });

                element.find('.amount').val(parseInt(range[0]) + attr.unit + " - " + parseInt(range[1]) + attr.unit);
            }
        }
    }

    function citySelector() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                onReady: '&',
                cities:'='
            },
            template: '<div class="city-selector"><div class="city-list"></div></div>',
            link: function (scope, element) {
                var cityUtil = element.find('.city-list').cityMultiple();
                if(!scope.cities){
                    scope.cities={};
                }
                var cities=[];
                angular.forEach(scope.cities,function(value,key){
                    angular.forEach(value,function(v){
                        cities.push(key+' '+v);
                    })
                });
                cityUtil.set(cities);

                if (scope.onReady) {
                    scope.onReady({cityUtil: cityUtil});
                }
            }
        }
    }
})();
