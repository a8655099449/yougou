// pages/collect/collect.js
Page({
  data: {
    titles:['商品收藏','品牌收藏','店铺收藏','浏览足迹'],
    goodsList:[]
  },
  onShow(){
    const goodsList = wx.getStorageSync('collects') || [];
    this.setData({
      goodsList

    })

  }
})