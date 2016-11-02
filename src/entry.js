/**
 * 使用babel-loader转换es2015
 */
import './fonts/iconfont.css';
import './styles/bootstrap.scss';
import './styles/ui.scss';
import './styles/main.scss';
import './styles/custom/custom.scss';

require.ensure([
    'jquery',
    'jquery-ui',
    'webuploader'
], function(require) {
    let $ = require('jquery');
    require('jquery-ui');
    require('webuploader');
    let angular=require("angular");
    let ngRoute=require("angular-route");
    let ngAria=require("angular-aria");
    let ngAnimate=require("angular-animate");
    let LocalStorageModule=require("angular-local-storage");

    require('./app');
});
