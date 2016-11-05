angular.module('app.adList').filter('adStatusConvert', [function () {
        return function (code) {
            var status = '未审核';
            switch (code) {
                case "1":
                    status = "审核通过 ";
                    break;
                case "2":
                    status = "审核未通过";
                    break;
                case "3":
                    status = "暂停";
                    break;
                case "4":
                    status = "启用";
                    break;
                case "5":
                    status = "投放结束";
                    break;
                default:
                    break;
            }

            return status;
        }
    }]);
