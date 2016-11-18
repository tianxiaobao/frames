/**
 * 首页交互控制
 * @author tianxiaobao
 * @method hjIndex
 */
define(["module", "utility"], function(module, Util) {
    "use strict";

    function hjIndex() {
        this.init();
    }
    var utility = new Util();
    /**
     * 初始化页面
     */
    hjIndex.prototype.init = function() {
        var _self = this;
        _self.slide("#slide",9000);
    }
    /**
     * 图片轮播控制
     */
    hjIndex.prototype.slide = function(slideBox, time) {
        $(slideBox).on("swipeLeft", function(e) {
            utility.stopPropagation(e);
        });
        $(slideBox).on("swipeRight", function(e) {
            utility.stopPropagation(e);
        });
        $(slideBox).swipeSlide({
            continuousScroll: true,//控制循环滑动的，为true时会多出两个li添加到首尾
            lazyLoad : true,
            speed: time,
            firstCallback: function(i, sum, me) {
                me.find(".slide_points").children().first().addClass('cur');
            },
            callback: function(i, sum, me) {
                me.find(".slide_points").children().eq(i).addClass('cur').siblings().removeClass('cur');
            }
        });
    }
    module.exports = new hjIndex();
});