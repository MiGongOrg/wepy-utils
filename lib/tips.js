var Tips = {
  isLoading: false,

  /*
    － 弹出提示框
    － await TIPS.success([string],[int])
   */

  success: function(title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: "success",
        mask: true,
        duration: duration
      });
    }, 300);
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    }
  },

  /*
    － 弹出确认窗口
    － await TIPS.confirm([string],[JSON Object],[string])
   */
  
  confirm: function(text, payload = {}, title = "提示") {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload);
          } else if (res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      });
    });
  },

  /*
    - toast
    - TIPS.toast([string], [Function], ['success' or 'loading'])
   */
  
  toast: function(title, onHide, icon = "success") {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: 500
      });
    }, 300);

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  },

  /*
    - 警告框
    - TIPS.alert([string])
   */
  
  alert: function(title) {
    wx.showToast({
      title: title,
      image: "../images/alert.png",
      mask: true,
      duration: 1500
    });
  },

  /*
    - 错误框
    - TIPS.error([string], [Function])
   */
  
  error: function(title, onHide) {
    wx.showToast({
      title: title,
      image: "../images/error.png",
      mask: true,
      duration: 500
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  },

  /*
    - 弹出加载提示
    - TIPS.loading([string])
   */
  
  loading: function(title = "加载中") {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  },

  /*
    - 跳转
    - TIPS.go([string])
   */

  go: function(url) {
    wx.navigateTo({
      url: url
    })
  },

  /*
    - 设置 Title
    - TIPS.setTitle([string])
   */

  setTitle: function(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  },

  // 加载完毕
  loaded: function() {
    if (this.isLoading) {
      this.isLoading = false;
      wx.hideLoading();
    }
  }
}

// 静态变量，是否加载中 
Tips.isLoading = false;

module.exports = Tips;
