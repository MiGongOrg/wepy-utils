'use strict';

var Utils = {
  /**
   * [时间戳]
   * UTILS.now()
   */
  now: function now() {
    return new Date().getTime();
  },


  /**
   * [随机数]
   * UTILS.random(min, max)
   */
  random: function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  },


  /**
   * 将对象解析成url字符串
   * @param  {Object} obj 参数对象
   * @param  {Boolean} unEncodeURI 不使用编码
   * @return {String} 转换之后的url参数
   */

  param: function param() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var unEncodeURI = arguments[1];

    var result = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;

        var value = obj[name];

        result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (result.length) {
      return '?' + result.join('&');
    } else {
      return '';
    }
  },

  /**
   * 将url字符串解析成对象
   * @param  {String} str 带url参数的地址
   * @param  {Boolean} unDecodeURI 不使用解码
   * @return {Object} 转换之后的url参数
   */

  unparam: function unparam() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var unDecodeURI = arguments[1];

    var result = {};
    var query = str.split('?')[1];

    if (!query) return result;

    var arr = query.split('&');

    arr.forEach(function (item, idx) {
      var param = item.split('=');
      var name = param[0];
      var value = param[1] || '';

      if (name) {
        result[name] = unDecodeURI ? value : decodeURIComponent(value);
      }
    });

    return result;
  }
};

module.exports = Utils;