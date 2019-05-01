// pages/need_detail/need_detail.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labels: ['python', '因子分析', 'python', 'R语言', '因子分析', 'python', 'R语言', '因子分析'],
    content:'需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容需求内容',
    price:2000
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
  solutionCardOnClick: function(e) {
    wx.navigateTo({
      url: '../solution_detail/solution_detail',
    })
  },
  getNeedDetail:function(need_id){
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
  }
})