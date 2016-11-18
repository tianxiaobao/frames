define(function(require, exports, module){
    "use strict";
    var $ = require('jquery');
    function proList() {
        this.init();
    }
    /**
     * 初始化页面
     */
    proList.prototype.init = function() {
        var zxPage = 1;
        //底部执行方法  下拉
        $(window).bind('scroll', function() { show() });
        function show() {
            if ($(window).scrollTop() + $(window).height()+400 >= $(document).height()) {
            loadshots();
            }
        }
        function loadshots() {
            // $.ajax({
            // type: "post",
            // dataType: "json",
            // url: 'testzhou.aspx?NoCopyRight=1&type=ajax&Action=GetList' + '&Page=' + zxPage,
            // cache: false,
            // success: function(json) {
            //     if (json.productFwm.length > 0) {
            //         var items = [];
            //         $.each(json.productFwm, function(i, shot) {
            //             items.push('<article style="border-bottom: 2px solid #000000;width: 100%;">');
            //             if (shot.Images != "") {
            //                 items.push('<a href="' + shot.Images + '" target="_blank" class="linkc"><img src="' + shot.Images + '"></a>');
            //             }
            //             items.push('</article>');
            //         });
            //     } else {
            //         $showmore.text('没有更多数据');
            //         //解除事件绑定
            //         $(window).unbind("scroll");
            //         return;
            //     }
            // },
            // error: function() { alert('error'); }
            // });
            // zxPage++;
            var items = [];
            for(var i=1;i<=10;i++){
                if (i%5==0) {
                    items.push('<li class="mr0">');
                }else{
                    items.push('<li>');
                }
                items.push('<div><a href="" class="goods_img"><img src="../../img/g_img.jpg" alt=""></a><p class="goods_text"><img src="https://www.mayihaitao.com/uploadfile/national/d3d2b0e28a6f1811b8ca3cdd0c1dc97e.jpg"><a href=""  title="">乳酸鱼骨胶原蛋白粉</a></p><p><var>￥180</var><s>￥235</s></p><p class="goods_option"><a class="fl" href="#">0</a><a class="fr" href="#">加入购物车</a></p></div><i>免税包邮</i>');
                items.push('</li>');

            }
            var newEls = items.join(''), tmpcontent = $(newEls);
            $('.pro_itemlist .clear').append(tmpcontent);
        }
    }
    module.exports = new proList();
});