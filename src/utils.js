var Utils = {
  /**
   * [时间戳]
   * UTILS.now()
   */
  now () {
    return new Date().getTime()
  },

  /**
   * [随机数]
   * UTILS.random(min, max)
   */
  random (min, max) {
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

  param: function(obj = {}, unEncodeURI) {
    let result = [];

    for (let name of Object.keys(obj)) {
      let value = obj[name];

      result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)));
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

  unparam: function(str = '', unDecodeURI) {
    let result = {};
    let query = str.split('?')[1];

    if (!query) return result;

    let arr = query.split('&');

    arr.forEach((item, idx) => {
      let param = item.split('=');
      let name = param[0];
      let value = param[1] || '';

      if (name) {
        result[name] = unDecodeURI ? value : decodeURIComponent(value);
      }
    });

    return result;
  }
}

module.exports = Utils;
