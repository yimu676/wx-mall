// pages/goods_detail/index.js
import{request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect:false
  },
 //商品对象
  GoodsInfo:{},

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);


  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const  goodsObj  = await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo=goodsObj
      //获取缓存中商品收藏数组
      let collect = wx.getStorageSync("collect")||[];
      let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
  //点击轮播图放大预览
  handlePrevewImage(e){
    //构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    //接收传递过来的图片url
    const current = e.currentTarget.dataset.url
   wx.previewImage({
     current,
     urls,
   });
  },
  //点击加入购物车
  handleCartAdd(){
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart")||[];
     // 2 判断 商品对象是否存在于购物车数组中
     let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
     if(index=== -1){
          //3  不存在 第一次添加
          this.GoodsInfo.num = 1;
          this.GoodsInfo.checked = true;
          cart.push(this.GoodsInfo);
     }else{
      cart[index].num++;
     }
     // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
     // 6 弹窗提示
     wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },
  //点击商品收藏
  handleCollect(){
    let isCollect = false
    let collect = wx.getStorageSync("collect")||[];
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!== -1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync("collect",collect)
    this.setData({isCollect})
  }
    
})