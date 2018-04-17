var Utils = {
  /*
    - 获取当前时间戳
   */
  now () {
    return new Date().getTime()
  },

  /*
    - 随机数
   */
  random (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

module.exports = Utils;
