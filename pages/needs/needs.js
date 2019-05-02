// pages/needs/needs.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyNeeds()
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
    this.getMyNeeds()
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
  cardOnClick: function (e) {
    var need_id = e.currentTarget.dataset.id
    // console.log('cardOnClick')
    // console.log(e)
    wx.navigateTo({
      url: '../need_detail/need_detail?need_id=' + need_id,
    })
  },
  getMyNeeds:function(){
    var user_id=app.globalData.user.id
    // console.log(user_id)
    var that=this
    wx.request({
      url: app.globalData.domain + '/service/needs/show',
      data: {
        user_id:user_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log(res)
        that.setData({
          needs_list: res.data.data
        })
      }
    })
  },
  switchTopTab: function (e) {
    var that = this;
    // console.log(e)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.switchTopTabTo(e.target.dataset.current)
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  switchTopTabTo:function(id){
    var that=this
    if(id==0){
      this.getMyNeeds()
    }
    else if(id==1){
      that.setData({
        needs_list: []
      })
    }
    else{

    }

  }
})