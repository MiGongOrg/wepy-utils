# WePy Utils

## 安装

```bash
npm install wepy-utils
```

## 按需引入

```javascript
import { UTILS, HTTP, TIPS } from 'wepy-utils'
```

## Utils

```javascript
/**
 * [时间戳]
 * UTILS.now()
 */
let now = UTILS.now()

/**
 * [随机数]
 * UTILS.random(min, max)
 */
let random = UTILS.random(1, 5)

// 待更新...
```

## HTTP Request

> `GET` `POST` `PATCH` `PUT` `DELETE`

```javascript
/**
 * [HTTP GET 请求]
 * @param [第1种使用方法是URL不带参数。第2种使用方法是在请求URL后带参数，如：?id=1&name=ming]
 * 1. HTTP.get(url).then((data) => {}).catch((error) => {})
 * 2. HTTP.get({url: url, params: [JSON Object] }).then((data) => {}).catch((error) => {})
 */

HTTP.get({url: url, params: {id: 1, name: 'ming' }}).then(function(data) {
  console.log(data)
}).catch((error) => {
  console.log(error)
})

/**
 * [HTTP POST 请求]
 * @param [可自定义 headers，如需 Authorization 等，默认：'Content-Type': 'application/json']
 * HTTP.post({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
 */

HTTP.post({url: url, params: {id: 1, name: 'ming' }, headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})

/**
 * [HTTP PATCH 请求]
 * HTTP.patch({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
 * 
 * [HTTP PUT 请求]
 * HTTP.put({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
 *
 * [HTTP DELETE 请求]
 * HTTP.delete({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
 * 
 * PATCH PUT DELETE 请求方式与 POST 写法类似
 */

// 待更新...

```

## Tips

```javascript
/**
 * [显示消息提示框（自定义标题与隐藏时间） - wx.showToast]
 * TIPS.success([string], [int])
 */

TIPS.success('这是一个标题', 1000)

/**
 * [显示模态弹窗（第2个参数为 Promise.resolve 是可选项） - wx.showModal]
 * @param
 * TIPS.confirm([string], [string or array or Object], [string])
 */

TIPS.confirm('文字内容', [1,2,3], '标题内容').then((arr) => {
  console.log('点击了确定', arr[2]); // 3
}).catch(() => {
  console.log('点击了取消');
});

/**
 * [显示消息提示框（可设置ICON，支持隐藏后回调函数） - wx.showToast]
 * @param
 * TIPS.toast([string], [Function], ['success' or 'loading'])
 */

TIPS.toast('标题', () => {
  console.log('隐藏时执行回调')
}, 'loading')

/**
 * [保留当前页面，跳转到应用内的某个页面 - wx.navigateTo]
 * TIPS.go([string])
 */

TIPS.go('test?id=1')

/**
 * [动态设置当前页面的标题 - wx.setNavigationBarTitle]
 * TIPS.setTitle([string])
 */

TIPS.setTitle('Hello WePy')

/**
 * [显示 loading 提示框（可自定义提示内容，默认显示透明蒙层，防止触摸穿透） - wx.showLoading]
 * TIPS.loading([string])
 */

TIPS.loading('加载标题')

/**
 * [隐藏 loading 提示框 - wx.hideLoading]
 */

TIPS.loaded()

// 待更新...

```