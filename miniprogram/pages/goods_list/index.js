// pages/goods_list/index.js
import{request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tabs: [
    {
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }
  ],
  goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query= options.cid||"";
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
  const res = await request({url:"/goods/search",data:this.QueryParams});
  const total = res.total;
  this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
  this.setData({
    goodsList:[...this.data.goodsList,...res.goods]
  })
  //关闭下拉刷新
  wx.stopPullDownRefresh()
  },
  //标题点击事件
  handleTabsItemChange(e){
   const{index}= e.detail;
   let{tabs}= this.data;
   tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
   this.setData({
     tabs
   })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
     this.setData({
      goodsList:[]
     })
     this.QueryParams.pagenum=1
     this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title:'没有下一页数据',
      });
    }else{
      this.QueryParams.pagenum++
       this.getGoodsList()
    }
  },


})