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

        'app.common',

        //admin
        'app.adList',
    ]);
})();
