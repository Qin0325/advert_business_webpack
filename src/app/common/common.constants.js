(function () {
    'use strict';

    angular.module('app.common').factory('Constants', ['$location','Notifier',constants]);

    function constants($location,Notifier) {

        var businessServer='api.business.ad.lmbang.com';

        return {
            businessServer:businessServer,
            adImgUploadUrl:'http://up.qiniu.com',
	        brand: '辣妈帮商户开放平台',

            dealRestMsg:function(res){
                Notifier.error(res.message);
            },

            redirectToUrl:function(msg,url){
                if(!msg){
                    $location.url(url);
                    return;
                }

                Notifier.alert(msg).then(function(){
                    $location.url(url);
                });
            },

            redirectToLogin:function(){
                var returnUrl=$location.url();
                this.redirectToUrl((returnUrl && returnUrl!='/')?'您还未登陆，请先登录！':'','page/signin?returnUrl='+$location.url());
            },

            walkListSelectedTree:function(list, ids){
                var self=this;
                angular.forEach(list, function (item) {
                    if (item.has_permission) {
                        ids.push(item.id);
                    } else if (item.child) {
                        self.walkListSelectedTree(item.child, ids);
                    }
                });
            }
        }
    }
})();
