var lefts = document.querySelectorAll('.all-sort-list2 .item');
        
for (var i = 0; i < lefts.length; i++) {
    lefts[i].setAttribute('index', i);
    lefts[i].onmouseenter = function () {
        for (var j = 0; j < lefts.length; j++) {
            lefts[j].children[1].className = "item-list clearfix";;
        }
        var ind = this.getAttribute('index');
        this.children[1].className = "item-list clearfix active";
    };
    lefts[i].onmouseleave = function () {
        for (var j = 0; j < lefts.length; j++) {
            lefts[j].children[1].className = "item-list clearfix";;
        }
        var ind = this.getAttribute('index');
        this.children[1].className = "item-list clearfix";
    };
}