(function () {
    'use strict';

    angular.module('app.common')
        .factory('Resources', [resources])
        .factory('Rest', ['$q', '$http', 'Resources','Constants', rest]);

    function resources() {
        return {
            register:['POST','/Businessad/User/register','form'],
            login:['POST','/Businessad/User/login','form'],
            logout:['GET','/Businessad/User/logout'],
            captcha:['GET','/Businessad/User/captcha'],
            active:['GET','//Businessad/user/active'],

            getAdList:['GET','/Businessad/Adlists/adlist'],
            adDetail:['GET','/Businessad/Adlists/ad_detail'],
            adCreate:['POST','/Businessad/Adcreates/adcreate','form'],
            adImgUpload:['POST','/Businessad/Uploads/qiniu_up','form'],

            getFinanceList:['GET','/Businessad/Account/accountlist'],
            getTotalAccount:['GET','/Businessad/Account/getTotalAccount'],
            checkAccount:['POST','/Businessad/Adcreates/check_account','form']
        }
    }

    function rest($q, $http, Resources,Constants) {
        var phpUrl = location.protocol + '//' + Constants.businessServer;

        function httpConfig(url, method, params, data, opt) {
            var url = phpUrl + url;
            var config = {
                url: url,
                method: method,
                params: params,
                data: data,
                responseType: 'json',
                withCredentials:true
            };

            if (opt == 'form') {
                angular.extend(config, {
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (json) {
                        var str = [];
                        angular.forEach(json, function (value, key) {
                            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                        });
                        return str.join('&');
                    }
                });
            }

            return config;
        }

        function handleRes(res, data, param) {
            var def = $q.defer();
            var config=res[0] === 'GET' ? httpConfig(res[1], res[0], data, {}, res[2]):httpConfig(res[1], res[0], param, data, res[2]);

            $http(config).success(function (result) {
                if(!result){
                    def.resolve();
                }else if(result.status_code<0){
                    if(result.status_code==-9999){
                        Constants.redirectToLogin();
                        return;
                    }
                    def.reject(result);
                }else{
                    def.resolve(result.data);
                }

            }).error(function (err) {
                def.reject(err);
            });
            return def.promise;
        }

        function publish(resources) {
            var services = {};
            angular.forEach(resources, function (res, key) {
                services[key] = function (data, param) {
                    return handleRes(res, data, param);
                }
            });
            return services;
        }
        return publish(Resources);
    }
})();
