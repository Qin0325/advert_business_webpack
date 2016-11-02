(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngAria',

        // 3rd Party Modules
        'ui.bootstrap',
        'LocalStorageModule',
        'ngTagsInput',
        'duScroll',
        'mgo-angular-wizard',

        // Custom modules
        'app.nav',

        //common
        'app.common',

        //page
        'app.signin',
        'app.signup',
        'app.active',

        //admin
        'app.adList',
        'app.adCreate',

        'app.finance'
    ]).run(function($rootScope,$location,localStorageService,Constants){
        $rootScope.constants=Constants;
        $rootScope.$on('$routeChangeStart',function(event,next,current){
            if(localStorageService.get('userName')){
                $rootScope.userName=localStorageService.get('userName');
            }
        });
    });

})();
