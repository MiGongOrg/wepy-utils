# Change log

##### V1.0.9

- HTTP Request 新增 `loading` 可选参数，默认为 `true` 即显示加载动画。
> 因 `onPullDownRefresh` 监听下拉动作与 `wx.showLoading` 一起使用会出现顶部回弹 BUG。所以在使用 `onPullDownRefresh` 时可将 `loading` 设置为 `false`

##### V1.0.8

- 移除 `TIPS.go()` 改用 `TIPS.navigateTo()`
- Merge [cmqiong](https://github.com/cmqiong) PR，格式化部分代码，其中 `TIPS.share()` `TIPS.getLocateInfo()` `TIPS.getLocation()` 需优化，暂未在此版本中更新。
    - `TIPS.share()` 分享使用 `button` 组件设置 `open-type="share"` 实现分享功能，而 `TIPS.share()` 暂未找到应用场景
    - `TIPS.getLocateInfo()` 中需要使用 `wx.openSetting()` 但此接口即将废弃
    - `TIPS.getLocation()` 需要使用高德地图提供的[地图围栏](https://lbs.amap.com/api/webservice/guide/api/geofence_service)接口才能实现此功能，优化点：可自定义 `key` (需开发者注册并申请，每天有调用次数限制) 接口请求地址为 HTTPS 开发者需要在微信公众平台添加 request 合法域名


##### V1.0.7

- 移除 HTTP 模块中的 `console.table()` 解决安卓兼容问题

##### V1.0.6

- 使用 Gulp Babel 编译 ES6 解决 WePy 打包报错问题

##### V1.0.5

- HTTP Request 新增 `mask` 是否显示透明蒙层，防止触摸穿透，默认：`false`

##### V1.0.4

- 合并 `TIPS.success()` 和 `TIPS.toast()` 移除 `TIPS.success()`
- 优化 `TIPS.confirm()` 写法，支持对象传参
- 优化 `TIPS.toast()` 写法，支持对象传参