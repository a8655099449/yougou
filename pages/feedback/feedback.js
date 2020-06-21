// pages/feedback/feedback.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgList: [],
		feedText: '',
	},
	timer: -1,
	loadImg() {
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (result) => {
				const imgList = result.tempFiles
				let oldList = this.data.imgList
				oldList.push(...imgList)
				this.setData({
					imgList: oldList,
				})
			},
		})
	},
	submit() {
		if (!this.data.feedText.trim()) {
			return wx.showToast({
				title: '请先输入内容',
				icon: 'none',
			})
		}
		wx.showToast({
			title: '感谢您的反馈',
			icon: 'success',
		})
		this.setData({
			feedText: '',
			imgList: [],
		})
	},
	changeInp(e) {
		const feedText = e.detail.value
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.setText(feedText)
		}, 1000)
	},
	setText(feedText) {
		this.setData({
			feedText,
		})
	},
})
