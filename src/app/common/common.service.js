angular.module('app.common')
    .factory('SizeService', sizeService)
    .factory('Notifier', ['$q', notifier])
    .service('Paginator', Paginator);

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

function notifier($q) {
    var notify = {};
    var logs = ['success', 'error', 'warning', 'message'];

    angular.extend(alertify.defaults, {
        glossary: {
            title: '消息提示',
            ok: '确定',
            cancel: '取消'
        },
    });

    angular.forEach(logs, function (name) {
        notify[name] = function (msg, time) {
            var def = $q.defer();
            alertify[name](msg, time, function () {
                def.resolve('ok');
            });
            return def.promise;
        }
    });

    notify.alert = function (title, msg) {
        var realTitle = msg ? title : undefined;
        var realMsg = msg ? msg : title;

        var def = $q.defer();
        alertify.alert(realTitle, realMsg, function () {
            def.resolve('ok');
        });

        return def.promise;
    };

    notify.confirm = function (title, msg) {
        var realTitle = msg ? title : undefined;
        var realMsg = msg ? msg : title;

        var def = $q.defer();
        alertify.confirm(realTitle, realMsg, function () {
            def.resolve('ok');
        }, function () {
            def.reject('cancel');
        })
        return def.promise;
    };

    notify.prompt = function (title, msg, val) {
        var realTitle = arguments.length > 2 ? title : undefined;
        var realVal = arguments.length > 1 ? arguments[arguments.length - 1] : undefined;
        var realMsg = arguments.length > 1 ? arguments[arguments.length - 2] : arguments[0];

        var def = $q.defer();
        alertify.prompt(realTitle, realMsg, realVal, function (evt, value) {
            def.resolve(value, evt)
        }, function () {
            def.reject('cancel');
        });

        return def.promise;
    };

    notify.notify = function (msg, type, time) {
        var def = $q.defer();
        alertify.notify(msg, type, time, function () {
            def.resolve('ok');
        });
        return def.promise;
    }

    return notify;
}

function Paginator() {
    return function (options) {
        var options = options || {};
        var _defaults = {
            maxSize: 5,
            currentPage: 1,
            itemsPerPage: 20
        }
        angular.extend(this, _defaults, options);
    }
}

