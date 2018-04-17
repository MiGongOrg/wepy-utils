var Http = {
  /*
    - GET请求
    - HTTP.get(url).then((data) => {})
    - HTTP.get({url: url, params: [JSON Object] }).then((data) => {})
   */
  GET: function(requestHandler) {
    if (typeof requestHandler === 'string') {
      requestHandler = {
        url: String(requestHandler),
        params: {}
      }
    }
    return this.Request('GET', requestHandler)
  },

  /*
    - POST请求
    - HTTP.post({url: url, params: [JSON Object] }).then((data) => {})
   */
  POST: function(requestHandler) {
    return this.Request('POST', requestHandler)
  },

  /*
    - PATCH请求
    - HTTP.patch({url: url, params: [JSON Object] }).then((data) => {})
   */
  PATCH: function(requestHandler) {
    return this.Request('PATCH', requestHandler)
  },

  /*
    - PUT请求
    - HTTP.put({url: url, params: [JSON Object] }).then((data) => {})
   */
  PUT: function(requestHandler) {
    return this.Request('PUT', requestHandler)
  },

  /*
    - DELETE请求
    - HTTP.put({url: url, params: [JSON Object] }).then((data) => {})
   */
  DELETE: function(requestHandler) {
    return this.Request('DELETE', requestHandler)
  },

  // request
  Request: function(method, requestHandler) {
    const { url, params, headers } = requestHandler

    console.table(requestHandler)

    wx.showLoading && wx.showLoading({title: 'Loading...'})

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: params,
        method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET',
        header: Object.assign({
          'Content-Type': 'application/json'
          /*
          这里可以自定义全局的头信息，这是一个栗子
          'Authorization': 'Bearer ' + wx.getStorageSync('token'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded'
          */
        }, headers),
        success: function (res) {
          const { data, statusCode } = res
          // 处理数据
          statusCode === 200 ? resolve(data) : reject(data, statusCode)
        },
        fail: function () {
          reject('Network request failed')
        },
        complete: function () {
          wx.hideLoading && wx.hideLoading()
        }
      })
    })
  }
}

module.exports = Http;
