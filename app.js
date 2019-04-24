//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if(this.globalData.userInfo && this.globalData.openid && this.globalData.user){
      wx.switchTab({
        url: 'pages/index/index',
      })
    }
   
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    openid: wx.getStorageSync('openid'),
    user: wx.getStorageSync('user'),
    domain:'http://diphda.yiwangchunyu.wang'
  }
})