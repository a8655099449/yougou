// pages/goods-list/goods-list.js
import { getListData } from '../../service/public.js'

Page({
	/**
	 * 页面的初始数据 综合
	 */
	data: {
		params: {
			pagenum: 1,
			pagesize: 10,
			cid: '',
		},
		maxPage: 1,
		goods: [],
		defaultImg:
			'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_800x800.jpg',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.data.params.cid = options.cid

		this._getListData()
	},
	_getListData() {

		getListData(this.data.params).then((res) => {


			const data = res.data.message.goods
			const total = res.data.message.total
			this.data.maxPage = Math.ceil(total / this.data.params.pagesize)
			this.data.params.pagenum++

			const oldGoods = this.data.goods
			oldGoods.push(...data)
      wx.stopPullDownRefresh()
			this.setData({
				goods: oldGoods,
			})
		})
	},

	onReachBottom() {
		if (this.data.params.pagenum > this.data.maxPage) {
      
      wx.showToast({
        title: '没有更多的商品数据了',
      });
		} else {
			this._getListData()
		}
  },
  
  onPullDownRefresh(){
    console.log('开始下来刷新动作');
    this.setData({
      goods:[]
    })
    this.data.params.pagenum = 1
    this._getListData() 

    
  }
})
