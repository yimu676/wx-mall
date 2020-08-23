 //Page Object
 import{request} from "../../request/index";
 Page({
   data: {
     swiperList:[],
     catesList:[],
     floorList:[]
   },
   //options(Object)
   onLoad: function(options){
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //    this.setData({
    //     swiperList: result.data.message
    //    })
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
   },
   getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
         this.setData({
          swiperList: result
         })
         })
   },
   getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
         this.setData({
          catesList: result
         })
         })
   },
   getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
         this.setData({
          floorList: result
         })
         })
   },

   onReady: function(){
     
   },
   onShow: function(){
     
   },
   onHide: function(){
 
   },
   onUnload: function(){
 
   },
   onPullDownRefresh: function(){
 
   },
   onReachBottom: function(){
 
   },
   onShareAppMessage: function(){
 
   },
   onPageScroll: function(){
 
   },
   //item(index,pagePath,text)
   onTabItemTap:function(item){
 
   }
 });