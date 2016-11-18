/**
 * 公共方法
 * Create by txb on 2016/05/14
 */
;define(function(require, exports, module){
    /**
     * @class Util
     * @constructor
     */
    var $ = require('jquery');
    function Util() {}
    module.exports = Util;
        /**
         * tab方法
         * @menthod tab
         * @param {string} nav  滑动导航
         * @param {string} list 滑动的列表
         * @param {string} isMove 背景移动效果
         * @returns {object}
         */
    Util.prototype.tab = function(nav, list,event) {
            $(nav).find(".item").each(function(i) {
                var _this = $(this);
                var _thisW = _this.width();
                _this.on(event, function() {
                    $(nav).find(".focu").removeClass("focu");
                    _this.addClass('focu');
                    $(list).find(".item:eq("+i+")").fadeIn("1500").addClass("cur").siblings().removeClass('cur').hide();
                })
            })
        }
        /**
         * 截取字符串
         * @param  {[type]} str   [description]
         * @param  {[type]} start [description]
         * @param  {[type]} end   [description]
         * @return {[type]}       [description]
         */
    Util.prototype.subString = function(str, start, end) {
            str = str.substring(start, end);
            return str;
        }
})