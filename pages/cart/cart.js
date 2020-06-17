import { regeneratorRuntime } from '../../utils/runtime.js'
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js'

Page({
	data: {
    address:{}

  },

  onShow(){
    const address = wx.getStorageSync('address');
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
    this.setData({
      address
    })
    
  },
	async getAddress() {
    // 优化的版本
		try {
			const res1 = await getSetting()
			const scope = res1.authSetting['scope.address']
			if (scope === false) {
				await openSetting()
			}
      const res2 = await chooseAddress()
      // 存入本地
      wx.setStorageSync('address', res2);
		} catch (error) {
      
      wx.showToast({
        title: '已取消',
        icon:'none'

      });
		}

	},
})
