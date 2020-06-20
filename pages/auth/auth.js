// pages/auth/auth.js
import { regeneratorRuntime } from '../../utils/runtime.js'
import { login ,showToast} from '../../utils/asyncWX.js'
import { getToken } from '../../service/public.js'

Page({
  async getAuth(e){
    console.log('object :>> ', e);
    const {encryptedData ,rawData,iv,signature} = e.detail
    
    if (!encryptedData) {

      await showToast({title:'已取消'})
      return
    }

    const {code} = await login()
    // console.log(code);
    
    const params ={
      encryptedData ,rawData,iv,signature,code
    }
    const token = await getToken(params);
    wx.setStorageSync('token', 'aaaa');

    wx.navigateBack({
      delta: 1
    });



  }
})