// pages/solution_editor/solution_editor.js
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
    this.getSolution(need_id)
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
  getSolution:function(need_id){
    var that = this
    wx.request({
      url: app.globalData.domain + '/service/needs/orderDetail',
      data: {
        need_id: need_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        that.setData({
          solution: res.data.data
        })
      }
    })
  },
  btnGiveup: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要放弃解答吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/service/needs/cancelOrder',
            data: {
              need_id: that.data.need_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              console.log('放弃订单')
              console.log(res)
              if(res.data.code){
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel:false,
                  success(res) {
                  
                  }
                })
              }else{
                wx.switchTab({
                  url: '../needs/needs',
                })
              }

            }
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },
  btnSubmit:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要提交方案吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/service/needs/orderUpdate',
            data: {
              need_id: that.data.need_id,
              content: that.data.content
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
              console.log('放弃订单')
              console.log(res)
              if (res.data.code) {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  success(res) {

                  }
                })
              } else {
                wx.switchTab({
                  url: '../needs/needs',
                })
              }

            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  getContent: function (e) {
    // console.log(e)
    var val = e.detail.value;
    this.setData({
      content: val
    });
  },
})