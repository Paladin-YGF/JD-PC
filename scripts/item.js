(function (window) {

    // 相关分类
    var tabs = document.querySelectorAll(".aside .asideLi");
    var goods = document.querySelectorAll(".aside .tab-pane");
    tabFunc(tabs, goods);

    // 商品介绍
    var tabs1 = document.querySelectorAll(".detail .asideLi");
    var goods1 = document.querySelectorAll(".detail .tab-pane");
    tabFunc(tabs1, goods1);

    function tabFunc(tabs, goods) {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].setAttribute('index', i);
            tabs[i].onmouseenter = function () {
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].className = '';
                    goods[j].className = 'tab-pane'
                }
                var ind = this.getAttribute('index');
                console.log(goods[ind]);
                goods[ind].className = 'active';
                this.className = "active";
            };
        }
    };
    window.tabFunc = tabFunc;
})(window)