/**
 * 首页交互控制
 * @author LiXiongXiong
 * @method htIndex
 */
define(function(require, exports, module){
    "use strict";
    var $ = require('jquery'),
        Util = require('utility'),
        slider = require ('slider'),
        msgBox = require('msgBox'),
        utility = new Util();
    function htIndex() {
        this.init();
    }
    /**
     * 初始化页面
     */
    htIndex.prototype.init = function() {
            var _self = this;
            _self.htSlide("#ht_ban_slider", false, "leftLoop", true, 3500);
            utility.tab("#country_tab_nav","#country_tab_con","click");
            $(".icon_logo").bind("click", function () {
                $.MsgBox.Alert("消息", "哈哈，添加成功！");
            });
        }
        /**
         * 轮播效果
         * @param  {String} slideBox  DOM选择
         * @param  {Boolean} moverStop 鼠标经过是否停止
         * 
         * @param  {String} effect    SuperSlider 轮播效果
         * [v1.0] fade：渐显； || top：上滚动；|| left：左滚动；|| topLoop：上循环滚动；|| leftLoop：左循环滚动；|| topMarquee：上无缝循环滚动；|| leftMarquee：左无缝循环滚动；
         [v2.0] fold：淡入淡出  [v2.1] slideDown：下拉效果
         *
         * @param  {Boolean} autoPlay  是否自动滚动
         * @param  {Number} time      轮播间隔时间
         * @return {[type]}           [description]
         */
    htIndex.prototype.htSlide = function(slideBox, moverStop, effect, autoPlay, time) {
        $(slideBox).slide({
            mainCell: ".slide_box",
            titCell: ".guide li",
            mouseOverStop: moverStop,
            effect: effect,
            vis: 1,
            autoPlay: autoPlay,
            interTime: time
        });
    }
    module.exports = new htIndex();
});