// pages/show_need_detail/show_need_detail.js
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
    var that = this
    var need_id = options.need_id
    that.setData({
      need_id: options.need_id
    })
    console.log('need_id')
    console.log(options)
    this.getNeedDetail(need_id)
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
  getNeedDetail: function (need_id) {
    var that = this
    wx.request({
      url: app.globalData.domain + '/service/needs/show',
      data: {
        id: need_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        that.setData({
          need: res.data.data[0]
        })
      }
    })
  },
  startIM: function(){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '功能未开放'
    });
  },
  btnOnClickOrder:function(){
    if (this.data.need.user_info.openid==app.globalData.openid){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '这是您自己的求助订单'
      });
      return false
    }else{
      var user_id = app.globalData.user.id
      // console.log(user_id)
      var that = this
      wx.request({
        url: app.globalData.domain + '/service/needs/createOrder',
        data: {
          user_id: user_id,
          need_id:this.data.need_id
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log('抢单结果')
          console.log(res)
          if(res.data.code==0){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '抢单成功！',
              success: function (res) {
                wx.switchTab({
                  url: '../needs/needs',
                })
              }
            });
          }else{
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.msg,
              success: function (res) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            });
          }
          // console.log(res)
          that.setData({
            needs_list: res.data.data
          })
        }
      })
      
    }
  }
})