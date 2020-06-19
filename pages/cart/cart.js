import { regeneratorRuntime } from '../../utils/runtime.js'
import { getSetting, chooseAddress, openSetting ,showModal ,showToast} from '../../utils/asyncWX.js'

Page({
	data: {
		address: null,
		cart: [],
		allChecked: false,
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

		this.setData({address})
		this.computedPrice(cart)
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
			wx.setStorageSync('address', res2)
		} catch (error) {
			wx.showToast({
				title: '已取消',
				icon: 'none',
			})
		}
	},
	handleCheck(e) {
		const index = e.currentTarget.dataset.index 
		const cart = this.data.cart
		cart[index].checked = !cart[index].checked
		this.computedPrice(cart)

  },
  // 计算数学
	computedPrice(cart) {
		let allPrice = 0
		let allCount = 0
		let allChecked = cart.length ? true : false
		cart.forEach((item) => {
			if (item.checked) {
				allPrice += item.goods_price * item.count
				allCount += item.count
			} else {
				allChecked = false
			}
		})
		this.setData({
      cart,
			allPrice,
			allCount,
			allChecked,
    })
    wx.setStorageSync('cart', cart)
  },
  // 全选
  allCheck(){
    const allChecked  = !this.data.allChecked

    const cart = this.data.cart
    cart.forEach(item =>{
      item.checked = allChecked
    })

    this.computedPrice(cart)
  },

  async editCount(e){
    const{ index , count} = e.currentTarget.dataset
    const {cart} = this.data
    if (cart[index].count === 1 && count === -1) {
      const res = await showModal({content:'是否该删除该商品？'})
      if (res.confirm) {
        cart.splice(index, 1)
      }
    }else{
      cart[index].count +=  count
    }
    this.computedPrice(cart)
  },
  // 结算函数
  async goPay(){
    const {address ,allCount} = this.data

    if (!address) {
     return showToast({title:'请先选择地址'})
    }
    if (allCount === 0 ) {
     return showToast({title:'购物车为空'})
    }
    wx.navigateTo({
      url: '/pages/goods-pay/goods-pay'
    });

  }
  
})
