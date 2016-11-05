(function(){
    'use strict';

    angular.module('app',[
        'ngRoute',
        'ngAnimate',
        'ngAria',

        // 3rd Party Modules
        'LocalStorageModule',
        'mgo-angular-wizard',
        'ui.bootstrap',
        'duScroll',
        'ngTagsInput',

        //admin
        'app.common',
        'app.adList',
    ]).run(function($rootScope,$location,localStorageService,Constants){
        $rootScope.constants=Constants;
        $rootScope.$on('$routeChangeStart',function(event,next,current){
            if(localStorageService.get('userName')){
                $rootScope.userName=localStorageService.get('userName');
            }
        });
    });;
})();
