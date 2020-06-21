import { goodsQuery } from '../../service/public.js'
import { showToast } from '../../utils/asyncWX'
import { runtime } from '../../utils/runtime'

Page({
	data: {
    list: [],
    btnShow:false,
    searchText:''
	},
	changeSearch(e) {
		const { value } = e.detail
		if (!value.trim()) {
      this.emptyList()
			return
		}

		clearTimeout(this.timer)

		this.timer = setTimeout(() => {
			this._goodsQuery(value)
		}, 1000)
	},
	timer: -1,
	async _goodsQuery(value) {
		const res = await goodsQuery(value)
		const list = res.data.message

		this.setData({
      list,
      btnShow:true
		})
  },
  emptyList(){

    this.setData({
      searchText:'',
      list: [],
      btnShow:false,
    })
  }

})
