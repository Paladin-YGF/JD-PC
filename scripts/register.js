(function (windnow) {

  // 获取是否同意按钮的 DOM 元素
  var agree = document.getElementById('agree')
  // 获取注册按钮的 DOM 元素
  var registerBtn = document.getElementById('registerBtn')

  // 是否同意按钮的处理函数
  function agreeChangeEvent() {
    registerBtn.disabled = !agree.checked
  }

  // 打开页面先要只行一次
  agreeChangeEvent()

  // 给是否同意按钮注册一个 change 事件
  agree.addEventListener('change', agreeChangeEvent)

})(window)