// components/my-swiper/my-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    imageName:{
      type:String,
      value:'image_src'
    }
  },
  externalClasses: ['swiper-style'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      
      const index = e.currentTarget.dataset.index
      // console.log('object :>> ', index);
      this.triggerEvent('itemClick',{index})

    }
  }
})
