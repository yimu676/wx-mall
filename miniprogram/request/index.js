//同时发送异步代码的次数
let ajaxTime = 0;
export const request=(params)=>{
  let header={...params.header}
  if(params.url.includes("/my/")){
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxTime++;
  //显示加载中效果
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
     header: header,
     url:baseUrl+params.url,
     success:(result)=>{
       resolve(result.data.message);
     },
     fail:(err)=>{
       reject(err);
     },
     complete:()=>{
      ajaxTime--
       if(ajaxTime===0){
         //关闭正在等待的图标
         wx.hideLoading();
       }
      
     }
    });
  })
}