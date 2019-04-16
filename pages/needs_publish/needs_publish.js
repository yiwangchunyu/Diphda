// pages/needs_publish/needs_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: ['请选择需求类别', '类别1', '类别2', '类别3', '类别4'],
    category_index: 0,
    labels: [
      { id: 0, value: 'python' },
      { id: 1, value: 'R语言' },
      { id: 2, value: '聚类' },
      { id: 3, value: '分类' },
      { id: 4, value: '预测' },
      { id: 5, value: '统计' },
      { id: 6, value: '因子分析' },
      { id: 7, value: '统计' },
      { id: 8, value: '统计' },
    ],
    label_ids:[],
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  submitBtnClick: function(e){
    wx.switchTab ({
      url: '../needs/needs',
    })
  }
})