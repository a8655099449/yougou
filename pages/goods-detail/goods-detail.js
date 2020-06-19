import { getGoodsDetail } from '../../service/public.js'

Page({
	data: {
		info: {},
	},
	goodsId: '',
  swiper_img: [],
  goods_info:{},
	onLoad(options) {
		const goods_id = options.goods_id
		this._getGoodsDetail(goods_id)
	},
	_getGoodsDetail(id) {
		getGoodsDetail(id).then((res) => {
			console.log(res)
      const info = res.data.message
      this.goods_info = info
			this.swiper_img = info.pics.map((item) => item.pics_mid)

			this.setData({
				info: {
					pics: info.pics,
					goods_price: info.goods_price,
					goods_name: info.goods_name,
					goods_introduce: info.goods_introduce.replace(/\.webp/g , '.jpg'),
				},
			})
		})
	},
	// 轮播图店家
	swiperClick(e) {

		const index = e.detail.index
		wx.previewImage({
			current: this.swiper_img[index],
			urls: this.swiper_img,
		})
	},
	addCart() {
		let cart = wx.getStorageSync('cart') || []
    // console.log('object :>> ', cart);

    
    const index = cart.findIndex(item=>{
      return item.goods_id == this.goods_info.goods_id
    })
    let text = ''
    if (index === -1) {
      // 没有商品数据
      this.goods_info.count = 1
      this.goods_info.checked = true
      cart.push(this.goods_info)
      text = '加入购物车成功' 

    }else{
      cart[index].count ++ 
      text = '该商品数量+1' 

    }

    wx.setStorageSync('cart', cart);

    wx.showToast({
      title: text,
      mask: true,
 
    });


	},
})
