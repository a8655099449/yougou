import {
  baseUrl
} from './config.js'

let count = 0

export default function request(options,isUrl = false) {
  wx.showLoading({
    title:'加载中..' 
  });
  count++
  return new Promise((resolve, reject) => {
    wx.request({
      url: isUrl? options.url : baseUrl + options.url,
      method:options.method || 'GET',
      data:options.data || {},
      success:resolve,
      fail:reject,
      complete: function() {
        count--
        if (count === 0) {
          wx.hideLoading();
          
        }
      }
    })

  })

}