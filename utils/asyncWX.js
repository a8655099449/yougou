/**
 * 将微信原有的一些函数进行一次封装
 */

export const getSetting = () => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: resolve,
			fail: function(err){
        reject(err)
      },
		})
	})
}

export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		wx.chooseAddress({
			success: resolve,
			fail: function(err){
        reject(err)
      },
		})
	})
}

export const openSetting = () => {
	return new Promise((resolve, reject) => {
		wx.openSetting({
			success: resolve,
			fail: function(err){
        reject(err)
      },
		})
	})
}

export const showModal = ({content}) => {
	return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content,
      success :resolve,
      fail:reject
    })
	})
}

export const showToast = ({title,icon = false}) => {
	return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon: icon ? 'success' :'none',
      success:resolve,
      fail:reject
    });
	})
}