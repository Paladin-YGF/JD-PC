(function () {
  // 准备虚拟数据
  var dataList = [
    {
      id: 1,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: true,
      unitPrice: 8848.00,
      number: 1,
      stock: 108,
      img: './uploads/mobile.png'
    },
    {
      id: 2,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: true,
      unitPrice: 8849.00,
      number: 1,
      stock: 30,
      img: './uploads/mobile.png'
    },
    {
      id: 3,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: false,
      unitPrice: 1024.00,
      number: 3,
      stock: 36,
      img: './uploads/mobile.png'
    },
    {
      id: 4,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: false,
      unitPrice: 250.00,
      number: 1,
      stock: 72,
      img: './uploads/mobile.png'
    },
    {
      id: 5,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: true,
      unitPrice: 5050.00,
      number: 2,
      stock: 18,
      img: './uploads/mobile.png'
    },
    {
      id: 6,
      content: 'Apple Macbook Air 13.3英寸笔记本电脑 银色（Corei5）处理器/8GB内存',
      isSelect: false,
      unitPrice: 1234.00,
      number: 1,
      stock: 5,
      img: './uploads/mobile.png'
    }
  ]

  // 获取模版填充位置的 DOM 结构
  var goodsDom = document.querySelector('.goods-all')

  // 使用 art-template 渲染数据
  bindHtml()
  function bindHtml() {
    if (!dataList.length) {
      goodsDom.innerHTML = template('contentDom', {dataList, selectNum: 0, totalNum: 0, totalPrice: 0})
      return
    }
    // 获取选中项的个数
    var selectNum = dataList.filter(function (item) { return item.isSelect }).length
    // 获取选中项的数量 和 总价
    var totalNum = 0, totalPrice = 0
    dataList.forEach(function (item) {
      if (item.isSelect) {
        totalNum += (item.number - 0)
        totalPrice += (item.number - 0) * (item.unitPrice - 0)
      }
    })
    var obj = {
      dataList,
      selectNum,
      totalNum,
      totalPrice
    }
    goodsDom.innerHTML = template('contentDom', obj)

    // 绑定各种事件
    eventsFun()
  }

  // 各种事件的绑定
  function eventsFun() {
    plusClick()
    minsClick()
    delGoodClick()
    delAllClick()
    changeChecked()
    toggleAllClick()
  }

  // 点击 '+' 事件
  function plusClick() {
    var plus = document.querySelectorAll('.plus')
    plus.forEach(function (item, index) {
      item.addEventListener('click', function () {
        if (dataList[index]['number'] >= dataList[index]['stock']) {
          window.alert('亲！存货只有这么多了哦！^_^')
          return
        }
        dataList[index]['number']++
        bindHtml()
      })
    })
  }

  // 点击 '-' 事件
  function minsClick() {
    var mins = document.querySelectorAll('.mins')
    mins.forEach(function (item, index) {
      item.addEventListener('click', function () {
        if (dataList[index]['number'] <= 1) {
          window.alert('亲！最少要买一个，好不好？^_^')
          return
        }
        dataList[index]['number']--
        bindHtml()
      })
    })
  }

  // 点击 '删除' 按钮事件
  function delGoodClick() {
    var delGoods = document.querySelectorAll('.delGood')
    delGoods.forEach(function (item) {
      item.addEventListener('click', function () {
        if (window.confirm('亲！你真的不要我了吗？')) {
          var id = this.dataset.id - 0
          dataList.forEach(function (item, index) {
            if (item.id === id) {
              dataList.splice(index, 1)
              bindHtml()
            }
          })
        }
      })
    })
  }

  // 点击全部删除按钮的事件
  function delAllClick() {
    var delAllBtn = document.querySelector('#delAllBtn')
    delAllBtn.addEventListener('click', function () {
      if (window.confirm('亲！你真的不打算要我们了吗？')) {
        for (var i = 0; i < dataList.length; i++) {
          if (dataList[i].isSelect) {
            dataList.splice(i, 1)
            i--
          }
        }
        bindHtml()
      }
    })
  }

  // 每一个商品的选中 input 框改变的时候触发
  function changeChecked() {
    var choices = document.querySelectorAll('.choice')
    choices.forEach(function (item) {
      item.addEventListener('change', function () {
        var id = this.dataset.id - 0
        var checked = this.checked
        var flag = true
        dataList.forEach(function (item) {
          if (item.id === id) {
            item.isSelect = checked
            bindHtml()
          }
          if (!item.isSelect) {
            flag = false
          }
        })
        var toggleAllBtn = document.querySelector('#toggle-all')
        toggleAllBtn.checked = flag
      })
    })
  }

  // 点击全选按钮的事件
  function toggleAllClick() {
    var toggleAllBtn = document.querySelector('#toggle-all')
    toggleAllBtn.addEventListener('click', function () {
      var checked = this.checked
      dataList.forEach(function (item) {
        item.isSelect = checked
      })
      bindHtml()
    })
  }
})()