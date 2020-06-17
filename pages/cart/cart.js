import { regeneratorRuntime } from '../../utils/runtime.js'
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js'

Page({
	data: {},

	onLoad: function (options) {},
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

		/* wx.getSetting({
			success: (result) => {
				const scope = result.authSetting['scope.address']

				if (scope || scope == undefined) {
					wx.chooseAddress({
						success: (result) => {
							console.log(result)
						},
					})
				} else {
					wx.openSetting({
						success: (result) => {

							wx.chooseAddress({
								success: (result) => {
									console.log(result)
								},
							})
						},
					})
				}
			},
    }) */
	},
})
