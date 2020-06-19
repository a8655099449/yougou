// 此文件专门管理一些请求比较少的情况下，多个页面共同使用的封装
import request from './network.js'
// 获取商品列表的
export function getListData(params) {
	return request({
		url: '/goods/search',
		data:params
	})
}


// 获取商品详情

export function getGoodsDetail(goods_id) {
	return request({
		url: '/goods/detail',
		data:{
      goods_id
    }
	})
}


// 获取商品详情
// http://121.37.195.155/test/public/
export function networkTest(goods_id) {
	return request({
		url: 'http://121.37.195.155/test/public/'
	},true)
}