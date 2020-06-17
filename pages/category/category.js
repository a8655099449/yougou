// 导入网络相关的函数
import { getCategory } from '../../service/category.js'

import { regeneratorRuntime } from '../../utils/runtime.js'

Page({
	data: {
		leftCate: [],
		rightContent: [],
		activeIndex: 0,
		leftScroll: -1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		const cates = wx.getStorageSync('cates')
		// 做一个缓存
		if (cates && Date.now() - cates.time < 1000 * 60 * 5) {
			this.cate = cates.data
			let leftCate = this.cate.map((item) => item.cat_name)
			let rightContent = this.cate[0].children

			this.setData({
				leftCate,
				rightContent,
			})
		} else {
			this._getCategory()
		}
	},
	cate: [],
	async _getCategory() {
    const res = await getCategory()
		this.cate = res.data.message
		wx.setStorage({
			key: 'cates',
			data: {
				time: Date.now(),
				data: this.cate,
			},
		})
		let leftCate = this.cate.map((item) => item.cat_name)
		let rightContent = this.cate[0].children

		this.setData({
			leftCate,
			rightContent,
		})

		// getCategory().then((res) => {
		// 	this.cate = res.data.message

		// 	wx.setStorage({
		// 		key: 'cates',
		// 		data: {
		// 			time: Date.now(),
		// 			data: this.cate,
		// 		},
		// 	})

		// 	let leftCate = this.cate.map((item) => item.cat_name)
		// 	let rightContent = this.cate[0].children

		// 	this.setData({
		// 		leftCate,
		// 		rightContent,
		// 	})
		// })
	},
	switchTab(e) {
		const index = e.currentTarget.dataset.index
		this.setCateData(index)
	},
	// scrollBottom() {
	// 	const index = this.data.activeIndex + 1
	// 	this.setData({
	// 		activeIndex: index,
	// 	})
	// 	this.setCateData(index)
	// },
	setCateData(index) {
		const rightContent = this.cate[index].children

		this.setData({
			activeIndex: index,
			rightContent,
			leftScroll: 0,
		})
	},
})
