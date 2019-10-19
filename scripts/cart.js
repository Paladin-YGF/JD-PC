(function (window) {

  // 获取到每一个 tr 标签
  var tableDom = document.getElementsByTagName('table')[0]
  var tBodyDom = tableDom.getElementsByTagName('tbody')[0]

  // 给每一个 tr 注册事件，这里使用事件委托的形式去进行单个删除和 + -
  trsEvents()
  function trsEvents() {
    var trs = tBodyDom.children
    for (var i = 0; i < trs.length; i++) {
      // 使用事件委托的形式
      trs[i].addEventListener('click', trEventFn)
    }
  }

  // 每一个 tr 的事件处理函数
  function trEventFn(e) {
    var target = e.target
    var tagName = target.tagName

    // 判断点击的是 -
    if (tagName === 'A' && target.type === 'mins') {
      // 获取 input
      var inp = e.target.parentNode.children[1]
      if (inp.value <= 1) {
        disabledMins()
        window.alert('亲！不能比 1 个再少了哦！^_^')
      } else {
        inp.value--
        calculateSinglePrice(inp, this)
        calculateSelectedNum()
        disabledMins()
      }
    }

    // 判断点击的是 +
    if (tagName === 'A' && target.type === 'plus') {
      // 获取 input
      var inp = e.target.parentNode.children[1]
      inp.value++
      calculateSinglePrice(inp, this)
      calculateSelectedNum()
      disabledMins()
    }

    // 判断点击的是 ‘删除’ 按钮
    if (tagName === 'A' && target.type === 'delBtn') {
      if (confirm('亲！你真的不想要我了么？')) {
        this.parentNode.removeChild(this)
        totalSelection()
        calculateCategoryNum()
        delAll()
        calculateSelectedNum()
      }
    }
  }

  // 判断每一个 input 里面的数量如果是 1，那么 - 按钮禁用
  disabledMins()
  function disabledMins() {
    var inps = document.getElementsByClassName('itxt')
    for (var i = 0; i < inps.length; i++) {
      var min = inps[i].parentNode.children[0]
      if (inps[i].value === '1') {
        // 找到当前 input 框前面的 - 按钮
        min.style.backgroundColor = '#ccc'
        min.style.color = '#fff'
        min.style.cursor = 'not-allowed'
      } else {
        min.style.backgroundColor = '#fff'
        min.style.color = '#333'
        min.style.cursor = 'pointer'
      }
    }
  }

  /**
   * calculateSinglePrice 计算单个商品总价的函数
   * @param  当前 inp 的 DOM 节点
   * @param  当前的 tr 节点
   * @return  返回当前行的商品价格小计，会自动修改对应位置的内容
   */
  function calculateSinglePrice(dom, tr) {
    var num = dom.value - 0
    // 找到单价内容
    var price = tr.children[2].children[0].innerText - 0
    // 计算总价(应该判断有没有浮点数，没有手动拼接 .00)
    var sum = num * price + '.00'
    // 找到小记元素
    var plan = tr.children[4].children[0]
    plan.innerText = sum
    return sum
  }

  /**
   * totalSelection 只行选择和全选按钮操作的函数
   * 直接执行一次是为了在有数据记录保持的时候再次打开页面的时候进行计算，如果没有数据保持可以不用执行
   */
  totalSelection()
  function totalSelection() {
    // 获取全选按钮和每一个选择按钮
    var toggleAllBtn = document.getElementById('toggle-all')
    var choices = document.getElementsByClassName('choice')

    // 因为删除以后要重新判断每一个按钮是否都被选中，所以再次执行一遍事件处理函数
    choiceChangeEvent(choices, toggleAllBtn)
    // 给每一条的选择框绑定事件
    for (var i = 0; i < choices.length; i++) {
      choices[i].addEventListener('change', choiceChangeEvent.bind(choices[i], choices, toggleAllBtn))
    }

    // 给全选按钮绑定事件
    toggleAllBtn.addEventListener('change', toggleAllChangeEvent.bind(toggleAllBtn, choices))
  }

  /**
   * choiceChangeEvent 每一个选择框的事件处理函数
   * @param  每一条商品的复选框
   * @param  全选按钮
   * @return  没有返回值
   */
  function choiceChangeEvent(choices, toggleAllBtn) {
    var flag = true
    for (var i = 0; i < choices.length; i++) {
      if (!choices[i].checked) {
        flag = false
      }
    }
    toggleAllBtn.checked = flag
    calculateSelectedNum()
  }

  /**
   * toggleAllChangeEvent 全选按钮的事件处理函数
   * @param  每一条商品的复选框
   * @return  没有返回值
   */
  function toggleAllChangeEvent(choices) {
    for (var i = 0; i < choices.length; i++) {
      choices[i].checked = this.checked
    }
    calculateSelectedNum()
  }

  // 计算有多少个等待操作的商品
  // 删除后也要从新计算
  calculateCategoryNum()
  function calculateCategoryNum() {
    var categoryNum = document.getElementById('category_num')
    var trs = tBodyDom.children
    categoryNum.innerText = trs.length
  }

  // 删除所有选中的商品
  // 每次删除单个以后也要重新执行
  delAll()
  function delAll() {
    var delAllBtn = document.getElementById('delAllBtn')
    delAllBtn.addEventListener('click', delAllEvent.bind(delAllBtn))
  }

  /**
   * delAllEvent 删除所有选中商品的事件处理函数
   * @param  没有参数
   * @return  没有返回值
   */
  function delAllEvent() {
    var choices = document.getElementsByClassName('choice')
    var flag = false
    for (var i = 0; i < choices.length; i++) {
      if (choices[i].checked) {
        flag = true
      }
    }
    if (flag) {
      if (window.confirm('亲！你真的不准备要我们了吗？')) {
        for (var i = 0; i < choices.length; i++) {
          if (choices[i].checked) {
            flag = true
            // 找到当前行的 tr 标签
            var tr = choices[i].parentNode.parentNode
            // 从 tbody 里面删除
            tBodyDom.removeChild(tr)
            i--
          }
        }
        totalSelection()
        calculateCategoryNum()
        calculateSelectedNum()
      }
    } else {
      return
    }
  }

  // 计算已选择商品的数量 和 已经选择的商品总价
  // 直接执行一次是为了在有数据记录保持的时候再次打开页面的时候进行计算，如果没有数据保持可以不用执行
  calculateSelectedNum()
  function calculateSelectedNum() {
    var choices = document.getElementsByClassName('choice')
    var trs = tBodyDom.children
    var totalNumDom = document.getElementById('totalNum')
    var totalPriceDom = document.getElementById('totalPrice')
    var totalNum = 0
    var totalPrice = 0
    for (var i = 0; i < choices.length; i++) {
      if (choices[i].checked) {
        // 找到对应的 input 框
        var inp = trs[i].children[3].children[0].children[0].children[1]
        totalNum += inp.value - 0
        totalPrice += calculateSinglePrice(inp, trs[i]) - 0
      }
    }
    totalNumDom.innerText = totalNum
    // 判断一下是否有浮点数，没有的话在加上 .00
    totalPriceDom.innerText = '¥' + totalPrice + '.00'
  }

})(window)
