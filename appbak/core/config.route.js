(function () {
    'use strict';

    angular.module('app')
        .config(['$routeProvider', function($routeProvider) {
            var routes, setRoutes;

            routes = [
                'account/finance',

                'ad/adList',
                'ad/adCreate',

                'system/permission',
                'system/role',

                'page/signin',
                'page/signup',
                'page/active'
            ]

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    templateUrl: 'app/' + route + '.html'
                };
                $routeProvider.when(url, config);
                return $routeProvider;
            };

            routes.forEach(function(route) {
                return setRoutes(route);
            });

            $routeProvider
                .when('/', {templateUrl: 'app/ad/adList.html'})
                .when('/home', {redirectTo:'/'})
                .when('index',{redirectTo:'/'})
                .when('/404', {templateUrl: 'app/page/404.html'})
                .otherwise({ redirectTo: '/404'});
        }]
    );
})();
