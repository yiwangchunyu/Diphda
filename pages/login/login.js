//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello Diphda',
    openid: wx.getStorageSync('openid'),
    userInfo: wx.getStorageSync('userInfo'),
    user: wx.getStorageSync('user'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad: function () {
    if (this.data.userInfo && this.data.openid && this.data.user) {
      wx.switchTab({
        url: '../index/index',
      })
    }else if(this.data.userInfo && this.data.openid){
      this.getUser(this.data.openid, this.data.userInfo.nickName, this.data.userInfo.avatarUrl, this.data.userInfo.gender)
    }else if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log('login/getUserInfo:')
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getOpenid(e.detail.userInfo)
  },
  getOpenid: function (userInfo) {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this
        wx.request({
          url: app.globalData.domain + '/service/user/getOpenid',
          data: {
            js_code: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log('openid:')
            console.log(res.data.data.openid)
            wx.setStorageSync('openid', res.data.data.openid)
            app.globalData.openid = res.data.data.openid
            that.getUser(res.data.data.openid, userInfo.nickName, userInfo.avatarUrl, userInfo.gender)
          }
        })
      }
    })
    
  },
  getUser: function (openid, username, avatar, gender) {
    var that = this
    wx.request({
      url: app.globalData.domain + '/service/user/login',
      data: {
        openid: openid,
        username: username,
        avatar: avatar,
        gender: gender
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log('user:')
        console.log(res.data)
        app.globalData.user = res.data.data
        wx.setStorageSync('user', res.data.data)
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  }
})
