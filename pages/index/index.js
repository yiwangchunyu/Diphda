//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    globalData: app.globalData,
    currentTab: 1,  
    categories: ['请选择需求类别'],
    category_index: 0,
    labels: [ ],
    label_ids: [],
    levels: ['初级场', '中级场', '高级场'],
    level_index: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content:"",
    quote:"",
    needs_list:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getNeedsTags: function () {
    var that = this;
    wx.request({
      url: this.data.globalData.domain + '/service/needs/getTags',
      method: 'POST',
      success(res) {
        var labels=[]
        for (var i = 0; i < res.data.data.length; i++) {
          labels.push({'id':i,'value':res.data.data[i]})
        }
        that.setData({
          labels:labels
        })
      }
    })
  },
  getNeedsCategories: function () {
    var that = this;
    wx.request({
      url: this.data.globalData.domain + '/service/needs/getCategories',
      method: 'POST',
      success(res) {
        var categories = that.data.categories
        for (var i = 0; i < res.data.data.length; i++) {
          categories.push(res.data.data[i])
        }
        that.setData({
          categories: categories
        })
      }
    })
  },
  onLoad: function () {
    this.getNeedsTags();
    this.getNeedsCategories();
    this.switchTopTabTo(1)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow() {
    this.switchTopTabTo(1)
    // Do something when page show.
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  link_to_publisher: function(e) {
    wx.navigateTo({
      url: '../needs_publish/needs_publish',
    })
  },
  link_to_analyst_plaza:function(e){
    wx.navigateTo({
      url: '../analyst_plaza/analyst_plaza',
    })
  },
  cardOnClick: function(e){
    console.log(e)
    var need_id=e.target.dataset.id
    console.log(need_id)
    // wx.navigateTo({
    //   url: '../need_detail/need_detail?need_id='+need_id,
    // })
  },
  /** 
  * 滑动切换tab 
  */

  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },  


  switchNav: function (e) {
    var that = this;
    // console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.switchTopTabTo(e.target.dataset.current)
      // that.setData({
      //   currentTab: e.target.dataset.current
      // })
    }
  },

  //以下为发布页面
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      category_index: e.detail.value
    })
  },

  bindPickerChangeLevels: function (e) {
    console.log('level picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      level_index: e.detail.value
    })
  },

  checkChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    var labels = this.data.labels;
    var checkArr = e.detail.value;
    for (var i = 0; i < labels.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        labels[i].checked = true;
      } else {
        labels[i].checked = false;
      }
    }
    this.setData({
      labels: labels,
      label_ids: checkArr
    })
    console.log(this.data)
  },
  submitBtnClick: function (e) {
    wx.switchTab({
      url: '../needs/needs',
    })
  },
  getQuote: function(e){
    // console.log(e)
    var val = e.detail.value;
    this.setData({
      quote: val
    });
  },
  getContent: function (e) {
    // console.log(e)
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
  needSubmit: function() {
    if (this.data.category_index==0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择需求类别'
      });
      return false
    }
    if (this.data.content.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入详细描述'
      });
      return false
    }
    if (parseFloat(this.data.quote)) {
      if (parseFloat(this.data.quote)>=0){
        this.setData({
          quote_f: parseFloat(this.data.quote)
        });
      }else{
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请输入正确的心理价位'
        });
        return false
      }
    }else{
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的心理价位'
      });
      return false
    }
    if(this.data.label_ids.length>3){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择少于3个标签'
      });
      return false
    }
    
    var labels=[]
    for(var i in this.data.labels){
      if (this.data.labels[i].checked==true){
        labels.push(this.data.labels[i].value)
      }
    }
    // console.log(this.data.labels)
    // console.log(labels)
    // console.log(JSON.stringify(labels))
    var that=this
    wx.request({
      url: app.globalData.domain + '/service/needs/create',
      data:{
        user_id: app.globalData.user.id,
        level: 1,
        category:this.data.categories[this.data.category_index],
        tags: JSON.stringify(labels),
        content:this.data.content,
        quote:this.data.quote_f
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        that.setData({
          currentTab: 1,  
          category_index: 0,
          labels: [],
          label_ids: [],
          content:"",
          quote:"",
          quote_f:-1
        })
        that.getNeedsTags();
        that.getNeedsCategories();
        wx.switchTab({
          url: '../needs/needs',
        })
      }
    })
  },

  //切换顶部导航栏
  switchTopTabTo(id){
    var that=this
    that.setData({
      currentTab: id
    })
    if(id!=0){
      wx.request({
        url: app.globalData.domain + '/service/needs/show',
        data:{
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res)
          that.setData({
            needs_list:res.data.data
          })
        }
      })
    }
  }
})
