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
	data: {
		address: null,
		cart: [],

		allPrice: 0,
		allCount: 0,
	},

	onShow() {
		const address = wx.getStorageSync('address') || null
		if (address) {
			address.all =
				address.provinceName +
				address.cityName +
				address.countyName +
				address.detailInfo
		}
		const cart = wx.getStorageSync('cart') || []

		const checkCart = cart.filter((item) => item.checked)

		this.setData({ address })
		this.computedPrice(checkCart)
	},

	// 计算数学
	computedPrice(cart) {
		let allPrice = 0
		let allCount = 0

		cart.forEach((item) => {
			if (item.checked) {
				allPrice += item.goods_price * item.count
				allCount += item.count
			}
		})
		this.setData({
			cart,
			allPrice,
			allCount,
		})
		// wx.setStorageSync('cart', cart)
	},
  async	handleOrderPay() {
		console.log('object :>> ', '我要去支付了')

		const token = wx.getStorageSync('token')

		if (!token) {
			wx.navigateTo({
				url: '/pages/auth/auth',
			})
			return
    }
    
    await showToast({title:'微信支付接口暂无法使用,将跳转到个人中心页面'})

    wx.switchTab({
      url: '/pages/profile/profile'
    });

  },
  
})
