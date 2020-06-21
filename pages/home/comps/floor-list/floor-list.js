// pages/home/comps/floor-list/floor-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      const {url} = e.currentTarget.dataset
      const query = url.split('=')[1]

      console.log(query);
      wx.navigateTo({
        url: '/pages/goods-list/goods-list?query='+query
      });

    }
  }
})
