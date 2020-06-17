import request from './network.js'


// 获取轮播图数据
export function getSwiper(){
  return request({
    url:'/home/swiperdata'
  })
} 

// 获取导航数据
export function getCateList(){
  return request({
    url:'/home/catitems'
  })
}
// 获取楼层数据
export function getFloorData(){
  return request({
    url:'/home/floordata'
  })
}