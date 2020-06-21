import { getGoodsDetail } from '../../service/public.js'
import { showToast } from '../../utils/asyncWX';
import { runtime} from '../../utils/runtime';
Page({
	data: {
    info: {},
    isCollect:false
	},
	goodsId: '',
  swiper_img: [],
  goods_info:{},
	onShow() {
    let Pages =  getCurrentPages();
    let curPage = Pages[Pages.length - 1]
    let {options} = curPage

    const goods_id = options.goods_id
    

		this._getGoodsDetail(goods_id)
	},
	_getGoodsDetail(id) {
		getGoodsDetail(id).then((res) => {
			console.log(res)
      const info = res.data.message
      this.goods_info = info
			this.swiper_img = info.pics.map((item) => item.pics_mid)
      let collects = wx.getStorageSync('collects') || [];
      let isCollect = collects.some(v=>v.goods_id === this.goods_info.goods_id);


      
			this.setData({
				info: {
					pics: info.pics,
					goods_price: info.goods_price,
					goods_name: info.goods_name,
					goods_introduce: info.goods_introduce.replace(/\.webp/g , '.jpg'),
        },
        isCollect
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
  // 加入购物车
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
  // 收藏商品

  async collect(){
    // 1.获得本地中存储的商品列表
    let collects = wx.getStorageSync('collects') || [];
    let index = collects.findIndex(v=>v.goods_id === this.goods_info.goods_id);


    if (index  !== -1) {
      collects.splice(index,1)
      await showToast({title:'取消收藏成功',icon:'success'})

    }else{
      collects.push(this.goods_info)
      await showToast({title:'收藏成功',icon:'success'})
    }

    this.setData({
      isCollect:index=== -1? true :false
    })

    wx.setStorageSync('collects', collects);

  }

})
