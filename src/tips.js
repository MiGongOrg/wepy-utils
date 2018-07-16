import {param} from './utils'

const Tips = {
  isLoading: false,

  /**
   * [显示消息提示框 - wx.showToast]
   * 可自定义 wx.showToast 的所有参数，除 success、fail、complete
   * TIPS.toast([Object])
   */

  toast: function(obj) {
    let title = obj.title
      , icon = obj.icon || 'success'
      , image = obj.image || ''
      , duration = obj.duration || 1500
      , mask = obj.mask

    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        image: image,
        duration: duration,
        mask: mask
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 隐藏后回调
          resolve()
        }, duration)
      })
    }
  },

  /**
   * [显示模态弹窗 - wx.showModal]
   * payload 为 Promise.resolve 是可选项
   * 除 showCancel 改为 cancel 外，其它可选参数与 wx.showModal 相同
   * TIPS.confirm([Object])
   */
  
  confirm: function(obj) {
    let title = obj.title || '提示'
      , content = obj.content || '默认提示内容'
      , payload = obj.payload || {}
      , cancel = obj.cancel
      , cancelText = obj.cancelText || '取消'
      , cancelColor = obj.cancelColor || '#000000'
      , confirmText = obj.confirmText || '确定'
      , confirmColor = obj.confirmColor || '#3CC51F'

    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: content,
        showCancel: cancel,
        cancelText: cancelText,
        cancelColor: cancelColor,
        confirmText: confirmText,
        confirmColor: confirmColor,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  },

  /**
   * [显示 loading 提示框（可自定义提示内容，默认显示透明蒙层，防止触摸穿透） - wx.showLoading]
   * @param {string} [文字内容] [显示的文字内容，默认是 加载中]
   * TIPS.loading([string])
   */
  
  loading: function(title = "加载中") {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  },

  /**
   * [保留当前页面，跳转到应用内的某个页面 - wx.navigateTo]
   * @param {string} [url] [需要前往的url地址]
   * TIPS.go([string])
   */

  go: function(url) {
    wx.navigateTo({
      url: url
    })
  },

  /**
   * [动态设置当前页面的标题 - wx.setNavigationBarTitle]
   * @param {string} [文字内容] [需要设置的文字标题]
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
      this.isLoading = false
      wx.hideLoading()
    }
  },

  /**
   * [下载并保存单个文件 - wx.downloadFile & wx.saveFile]
   * @param {string} [url] [需要下载的文件地址]
   * TIPS.downloadSaveFile({url:[string],success:[Fuction],fail:[Fuction]})
   */

  downloadSaveFile: function (obj) {
    let that = this
      , success = obj.success
      , fail = obj.fail
      , id = ''
      , url = obj.url

    obj.id ? id = obj.id : id = url

    // 下载文件
    wx.downloadFile({
      url: obj.url,
      success: (res) => {
        // 本地存储文件（本地文件存储的大小限制为 10M）
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: (result) => {
            result.id = id
            success(result)
          },
          fail: (e) => {
            console.info("保存一个文件失败")
            fail(e)
          }
        })
      },
      fail: (e) => {
        console.info("下载一个文件失败")
        fail(e)
      }
    })
  },

  /**
   * [下载并保存多个文件]
   * @param {array} [urls] [需要下载的文件地址]
   * @param {boole} [progress] [是否需要返回下载进度]
   * TIPS.downloadSaveFiles({urls:[array],progress:[boole],success:[Fuction],fail:[Fuction]})
   */

  downloadSaveFiles: function (obj) {
    let that = this
      , progress = obj.progress
        // 下载成功
      , success = obj.success
        // 下载失败
      , fail = obj.fail
        // 下载地址 数组，支持多个 url 下载 [url1, url2]
      , urls = obj.urls
        // 创建 Map 实例
      , savedFilePaths = new Map()
        // 有几个url需要下载
      , urlsLength = urls.length
      , count = 100 / urlsLength

    for (let i = 0; i < urlsLength; i++) {
      that.downloadSaveFile({
        url: urls[i],
        success: (res) => {
          // 一个文件下载保存成功
          let savedFilePath = res.savedFilePath

          savedFilePaths.set(res.id, res)

          let step = savedFilePaths.size * count

          // 判断是否需要使用进度
          if (progress) {
            savedFilePaths.step = step
            success(savedFilePaths)
          } else if (!progress && step === 100) {
            success(savedFilePaths)
          }

        },
        fail: (e) => {
          fail(e)
        }
      })
    }
  },

  /**
   * 转发分享
   * @param  {String} title 标题
   * @param  {String} url 页面地址，默认就是当前页面地址
   * @return {Function} 转发函数
   */

  share: function(title = '小程序名称!', url) {
    return () => {
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];
      let path = '/' + currPage.route;
      let params = param(currPage.options, true);

      return {
        title: title,
        path: (url || path) + params
      }
    }
  },

  /**
   * 保留当前页面，跳转到应用内的某个页面
   * @param {String} url 页面路径
   * @param {Object} params 页面参数
   */

  navigateTo: function(url, params) {
    this._openInterceptor('navigateTo', url, params);
  },

  /**
   * 关闭当前页面，跳转到应用内的某个页面
   * @param {String} url 页面路径
   * @param {Object} params 页面参数
   */

  redirectTo: function(url, params) {
    this._openInterceptor('redirectTo', url, params);
  },

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {String} url 页面路径
   * @param {Object} params 页面参数
   */

  switchTab: function(url, params) {
    this._openInterceptor('switchTab', url, params);
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {String} url 页面路径
   * @param {Object} params 页面参数
   */

  reLaunch: function(url, params) {
    this._openInterceptor('reLaunch', url, params);
  },

  /**
   * 页面跳转封装
   * @param {String} method 微信JS方法
   * @param {String} url 页面路径
   * @param {Object} params 页面参数
   */
  
  _openInterceptor: function(method, url, params) {
    if (this.IsPageNavigating) return;
    this.IsPageNavigating = true;

    params = param(params);

    wx[method]({
      url: url + params,
      complete: () => {
        this.IsPageNavigating = false;
      }
    });
  },

  /**
   * 获取地理位置
   * @param options [object] 参数
   *
   * 使用示例：
   * getLocation({
        type                   : "wgs84", // [String], 默认 'wgs84', 返回 GPS 坐标
        success                : function (res) {}, // [Function], 获取地理位置成功后回调
        fail                   : function () {}, // [Function], 获取地里位置失败后回调
        complete               : function (res) {}, // [Function], 接口调用结束后回调
        cancel                 : null, // [Function], 当点击授权提示弹窗"取消"按钮后回调，可不写，默认使用 fail 参数的回调
        modalAuthorizationTitle: "提示", // [String], 授权提示弹窗标题
        modalAuthorizationTxt  : "允许获取地理位置信息", // [String], 授权提示弹窗文字内容
   * })
   */

  getLocation: function(options) {
    // 覆盖参数默认值
    options = Object.assign({
      type                   : "wgs84", // [String], 默认 'wgs84', 返回 GPS 坐标
      success                : function (res) {}, // [Function], 获取地理位置成功后回调
      fail                   : function () {}, // [Function], 获取地里位置失败后回调
      complete               : function (res) {}, // [Function], 接口调用结束后回调
      cancel                 : null, // [Function], 当点击授权提示弹窗"取消"按钮后回调，可不写，默认使用 fail 参数的回调
      modalAuthorizationTitle: "提示", // [String], 授权提示弹窗标题
      modalAuthorizationTxt  : "允许获取地理位置信息", // [String], 授权提示弹窗文字内容
    }, options);

    /**
     * wx.getLocation 逻辑：
     *  调用 "wx.getLocation" 后自动弹出系统提示："应用要获取地理位置，是否允许？"
     *    - 点击"确认"后，跳转系统设置页面进行授权设置
     *       - 进入系统设置后，未允许授权：再次弹出自定义窗口授权确认
     *       - 进入系统设置后，允许授权：成功回调
     *    - 点击"取消"后，再次弹出自定义弹窗进行授权确认
     *
     * 再次弹出自定义弹窗授权确认逻辑：
     *  调用 "wx.showModal" 弹窗确认
     *    - 点击"确认"后，调用 wx.openSetting 进入系统设置进行授权设置
     *       - 进入系统设置后，未允许授权：失败回调
     *       - 进入系统设置后，允许授权：成功回调
     *    - 点击"取消"后，取消回调或失败回调
     */

    this._doGetLocation(options, false);
  },

  /**
   * wx.getLocation 获取地理位置
   * @param options 参数配置
   * @param isAfterAuthorization 是否已通过授权同意，true 同意
   */

  _doGetLocation: function(options, isAfterAuthorization) {
    const self = this
    wx.getLocation({
      type: options.type,
      success(res) {
        console.log("[getLocation]: 获取过地理位置 成功", res);

        options.success(res);
      },
      // 点击"取消"后，再次弹出自定义弹窗进行授权确认
      fail(res) {
        console.log("[getLocation]: 获取地理位置授权 失败", res);
      },
      complete(res) {
        if (!isAfterAuthorization) {
          if (!res.latitude || !res.longitude) {
            wx.showModal({
              title  : options.modalAuthorizationTitle,
              content: options.modalAuthorizationTxt,
              success: function (res) {
                if (res.confirm) {
                  self._doOpenAuthorizationModal(options);
                } else if (res.cancel) {
                  console.log("[getLocation]: 再次提示用户授权 取消，获取地理位置信息 失败");

                  options.cancel && options.cancel() || options.fail();
                }
              }
            });
          }
        }
        options.complete(res);
      }
    });
  },

  // 打开系统设置进行用户授权

  _doOpenAuthorizationModal: function(options) {
    wx.openSetting({
      success: (res) => {
        // 进入系统设置后，允许授权
        if (res.authSetting["scope.userLocation"]) {
          console.log("[getLocation]: 再次授权获取地理位置信息 成功", res);

          _doGetLocation(options, true);
        } else { // 进入系统设置后，未允许授权
          console.log("[getLocation]: 再次授权获取地理位置信息 失败", res);

          options.fail();
        }
      },
      fail   : (res) => {
        console.log("[getLocation]: 再次提示用户授权 失败，获取地理位置信息 失败", res);

        options.fail();
      }
    });
  },

  /**
   * 根据经纬度获取地理位置信息，默认坐标：北京市人民政府
   * @param  {Number} latitude   经度
   * @param  {Number} longitude  纬度
   * @return {Promise}       包含抓取任务的Promise
   */

  getLocateInfo: function(latitude = 39.90403, longitude = 116.407526) {
    const url = 'http://restapi.amap.com/v3/geocode/regeo'
    const params = {
      key: '8325164e247e15eea68b59e89200988b',
      location: `${longitude},${latitude}`,
      platform: 'JS',
      sdkversion: '1.3'
    }

    return new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        data: params,
        success: function(res) {
          resolve(res)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  }

}

// 静态变量，是否加载中 
Tips.isLoading = false

module.exports = Tips
