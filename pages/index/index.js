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
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    wx.navigateTo({
      url: '../need_detail/need_detail',
    })
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
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      category_index: e.detail.value
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
  }
})
