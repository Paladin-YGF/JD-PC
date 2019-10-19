window.onload = function(){
var hours = document.querySelector('.hours');
console.log(hours);
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');

// var times = new Date();
// var data = fn(times);
// hours.innerText = data.xiaoShi;
// minutes.innerText = data.fenZhong;
// seconds.innerText = data.miao;

let endTime = '2018-11-05 19:21:50'

var data = fn(endTime);
hours.innerText = data.xiaoShi;
minutes.innerText = data.fenZhong;
seconds.innerText = data.miao;
var time = setInterval(function() {
    // 调用者调用的
    var data = fn(endTime);
    hours.innerText = data.xiaoShi;
    minutes.innerText = data.fenZhong;
    seconds.innerText = data.miao;
    if (data.status && data.status === 'done') {
        clearInterval(time);
    };
}, 1000);

/*
      功能：计算两个日期的时间差
      参数：
        timeStr 未来的时间   字符串
      返回值：返回一个对象
    */
function fn(timeStr) {
    // 1. 定义一个开始时间
    var start = new Date();
    // 2. 定义一个结束的时间
    var end = new Date(timeStr);
    // 3. 计算两个日期差
    // var temp = end.getTime() - start.getTime();
    var temp = end - start;
    if(temp < 0) return {
        status: 'done',
        xiaoShi: '00',
        fenZhong: '00',
        miao: "00"
    }
    // 4. 转换成小时
    var h = parseInt(temp / 1000 / 60 / 60);
    h = h < 10 ? '0' + h : h;
    // 5. 把小时的小数剩余的转换成分钟
    var m = parseInt(temp / 1000 / 60 % 60);
    m = m < 10 ? '0' + m : m;
    // 6. 把分钟小数剩余的转换成秒
    var s = parseInt(temp / 1000 % 60);
    s = s < 10 ? '0' + s : s;
    // 返回值,若返回多个值时，可以选择用数组。
    // return [h,m,s];
    return {
        xiaoShi: h,
        fenZhong: m,
        miao: s
    };
};
}