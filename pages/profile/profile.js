
import { regeneratorRuntime } from '../../utils/runtime.js'
import {
	getSetting,
	chooseAddress,
	openSetting,
	showModal,
	showToast,
} from '../../utils/asyncWX.js'

import { networkTest } from '../../service/public.js'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    collectNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserInfo()
  },
  onShow(){
    const collects = wx.getStorageSync('collects')|| [];
    this.setData({
      collectNum:collects.length
    })

  },
  async getUserData(e){

    const {userInfo} = e.detail
    if (!userInfo) {
       return await showToast({title:'授权失败，请重新授权'})
    }
    wx.setStorageSync('userInfo', userInfo);
    this.setUserInfo()

  },
  setUserInfo(){
    const userInfo = wx.getStorageSync('userInfo');

    this.setData({
      userInfo
    })
  }

})