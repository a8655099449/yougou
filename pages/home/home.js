
// 导入网络相关的函数
import {
  getSwiper,
  getCateList,
  getFloorData
}from '../../service/home.js'





Page({
  data:{
    swiper:[],
    cateList:[],
    floorList:[]
  },
  onLoad(){
    this._getSwiper()
    this._getCateList()
    this._getFloorData()
  },
  _getSwiper(){
    getSwiper().then(res=>{
      this.setData({
        swiper:res.data.message
      })
      
    })
  },
  _getCateList(){
    getCateList().then(res=>{
      this.setData({
        cateList:res.data.message
      })
    })
  },
  _getFloorData(){
    getFloorData().then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  }
  

})