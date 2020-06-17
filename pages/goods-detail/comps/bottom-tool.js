// pages/goods-detail/comps/bottom-tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addCart(){
      this.triggerEvent('addCart')
    }
  }
})
