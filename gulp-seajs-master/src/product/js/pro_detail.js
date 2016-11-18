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
    }
    module.exports = new proDetail();
});