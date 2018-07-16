'use strict';

var Http = {
  /**
   * [HTTP GET 请求]
   * @param [第1种使用方法是URL不带参数。第2种使用方法是在请求URL后带参数，如：?id=1&name=ming]
   * 1. HTTP.get(url).then((data) => {}).catch((error) => {})
   * 2. HTTP.get({url: url, params: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  get: function get(requestHandler) {
    if (typeof requestHandler === 'string') {
      requestHandler = {
        url: String(requestHandler),
        params: {}
      };
    }
    return this.Request('GET', requestHandler);
  },

  /**
   * [HTTP POST 请求]
   * @param [可自定义 headers，如需 Authorization 等，默认：'Content-Type': 'application/json']
   * HTTP.post({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  post: function post(requestHandler) {
    return this.Request('POST', requestHandler);
  },

  /**
   * [HTTP PATCH 请求]
   * HTTP.patch({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  patch: function patch(requestHandler) {
    return this.Request('PATCH', requestHandler);
  },

  /**
   * [HTTP PUT 请求]
   * HTTP.put({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  put: function put(requestHandler) {
    return this.Request('PUT', requestHandler);
  },

  /**
   * [HTTP DELETE 请求]
   * HTTP.delete({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  delete: function _delete(requestHandler) {
    return this.Request('DELETE', requestHandler);
  },

  // request
  Request: function Request(method, requestHandler) {
    var url = requestHandler.url,
        params = requestHandler.params,
        headers = requestHandler.headers,
        mask = requestHandler.mask;


    wx.showLoading && wx.showLoading({ title: 'Loading...', mask: mask ? mask : false });

    return new Promise(function (resolve, reject) {
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
        success: function success(res) {
          var data = res.data,
              statusCode = res.statusCode;
          // 处理数据

          statusCode === 200 ? resolve(data) : reject(data, statusCode);
        },
        fail: function fail() {
          reject('Network request failed');
        },
        complete: function complete() {
          wx.hideLoading && wx.hideLoading();
        }
      });
    });
  }
};

module.exports = Http;