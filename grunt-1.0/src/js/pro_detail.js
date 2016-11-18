define(function(require, exports, module){
    "use strict";
    var $ = require('jquery'),
    jqzoom = require('jqzoom');
    function proDetail() {
        this.init();
    }
    /**
     * 初始化页面
     */
    proDetail.prototype.init = function() {
        $(".m_menu dd").css("display","none");
        $(".jqzoom").imagezoom();
        $(".gallery li").on('mouseenter',function(){
            $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
            $(".jqzoom").attr('src',$(this).find("img").attr("src"));
        });
        $(".banner li").on("click",function(){
            var _this=$(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".content>div").eq(_this).show().siblings().hide();
        });
    };
    module.exports = new proDetail();
});