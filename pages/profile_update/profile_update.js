// pages/profile_update/profile_update.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact_type:[
      '微信号','qq号','邮箱'
    ],
    contact_index:0,

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
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      contact_index: e.detail.value
    })
  },
  getContact: function (e) {
    // console.log(e)
    var val = e.detail.value;
    this.setData({
      contact: val
    });
  },
  onSubmit: function(){
    if ((!this.data.contact)||this.data.contact.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入!'
      });
      return false
    }
    var that = this
    wx.request({
      url: app.globalData.domain + '/service/user/update',
      data: {
        user_id: app.globalData.user.id,
        contact_type:this.data.contact_type[this.data.contact_index],
        contact:this.data.contact
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log("user update")
        // console.log(res)
        app.globalData.user.contact = that.data.contact
        app.globalData.user.contact_type = that.data.contact_type[that.data.contact_index]
        wx.switchTab({
          url: '../mine/mine',
        })
      }
    })
  }
})