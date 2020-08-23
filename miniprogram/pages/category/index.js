// pages/category/index.js
import{request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
   leftMenuList:[],
   rightContent:[],
  //  被点击的左侧菜单
  currentIndex:0,
  scrollTop:0,
  },
  //接口返回的数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储有没有旧数据 没有则请求 有则使用
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10*10){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name) ;
        //构造右侧的大菜单数据
        let rightContent = this.Cates[0].children;
        this.setData({
         leftMenuList,
         rightContent
       })
      }
    }
  },
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates = res.data.message;
    //   //把接口的数据存入本地
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    //   //构造左侧的大菜单数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name) ;
    //    //构造右侧的大菜单数据
    //    let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:"/categories"})
          this.Cates = res;
      //把接口的数据存入本地
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name) ;
       //构造右侧的大菜单数据
       let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})