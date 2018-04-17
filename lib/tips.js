var Tips = {
  isLoading: false,

  /**
   * [显示消息提示框（自定义标题与隐藏时间） - wx.showToast]
   * TIPS.success([string], [int])
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

  /**
   * [显示模态弹窗（第2个参数为 Promise.resolve 是可选项） - wx.showModal]
   * @param
   * TIPS.confirm([string], [string or array or Object], [string])
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

  /**
   * [显示消息提示框（可设置ICON，支持隐藏后回调函数） - wx.showToast]
   * @param
   * TIPS.toast([string], [Function], ['success' or 'loading'])
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

  /**
   * [显示 loading 提示框（可自定义提示内容，默认显示透明蒙层，防止触摸穿透） - wx.showLoading]
   * TIPS.loading([string])
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

  /**
   * [保留当前页面，跳转到应用内的某个页面 - wx.navigateTo]
   * TIPS.go([string])
   */

  go: function(url) {
    wx.navigateTo({
      url: url
    })
  },

  /**
   * [动态设置当前页面的标题 - wx.setNavigationBarTitle]
   * TIPS.setTitle([string])
   */

  setTitle: function(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * [隐藏 loading 提示框 - wx.hideLoading]
   */
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
