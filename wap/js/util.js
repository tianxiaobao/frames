/**
 * 公共方法
 * Create by tianxiaobao on 2016/9/21
 */
define(['module'], function(module) {
    "use strict";

    function Util() {}
    /**
        阻止事件冒泡
     */
    Util.prototype.stopPropagation = function(e) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    }
    module.exports = Util;
});