// pages/auth/index.js
import{request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
import{login} from "../../utils/asyncWx";
Page({
  async handleGetUserInfo(e){
   try {
      //1获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    //获取小程序登陆成功后的code
  const {code} = await login()
  const loginParams = {encryptedData, rawData, iv, signature,code}
  const {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
  wx.setStorageSync("token", token);
  wx.navigateBack({
    delta: 1
  });
   } catch (error) {
     console.log(error)
   }
  }
})