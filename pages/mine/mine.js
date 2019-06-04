// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user_id = app.globalData.user.id
    // console.log(user_id)
    var that = this;
    wx.request({
      url: app.globalData.domain + '/service/user/show',
      method: 'POST',
      data: {
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log(res)
        that.setData({
          user:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onMenuClickAdvice: function(){
    wx.navigateTo({
      url: '../advice/advice',
    })
  },
  onMenuClickProfileUpdate: function () {
    wx.navigateTo({
      url: '../profile_update/profile_update',
    })
  },
  unOpen:function(){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '功能未开放'
    });
  },
  history: function () {
    wx.switchTab({
      url: '../needs/needs',
    })
  }
})