# 微信小程序 WePy Utils

微信小程序 WePy 工具集整合并封装了常用的小程序 API 和 HTTP Request 持续更新中...

## 安装

```bash
npm install wepy-utils
```

## 按需引入

```javascript
import { UTILS, HTTP, TIPS } from 'wepy-utils'
```

## Utils

##### `UTILS.now()`

> 获取当前时间戳

```javascript
let now = UTILS.now()
console.log(now)
```

##### `UTILS.random()`

> 返回任意区间随机数

```javascript
let random = UTILS.random(1, 5)
console.log(random)
```

##### `UTILS.param()`

> 将对象解析成 url 字符串

```javascript
let obj = {id: 1, name: 'ming'} // 需解析的对象
let strResult = UTILS.param(obj, true)  // 第二个参数 true | false 表示是否使用 unDecodeURI 编码，默认 false
console.log(strResult) // ?id=1&name=ming
```

##### `UTILS.unparam()`

> 将 url 字符串解析成对象

```javascript
let url = '?id=1&name=ming' // 需解析的对象
let objResult = UTILS.unparam(url, true)  // 第二个参数 true | false 表示是否使用 unDecodeURI 解码，默认 false
console.log(objResult) // {id: 1, name: 'ming'}
```

## HTTP Request

> `GET` `POST` `PATCH` `PUT` `DELETE`

##### `HTTP.get()`


> 第1种使用方法是URL不带参数。第2种使用方法是在请求URL后带参数，如：`?id=1&name=ming`

- `HTTP.get(url).then((data) => {}).catch((error) => {})`
- `HTTP.get({url: url, params: [JSON Object] }, mask: [Boolean]).then((data) => {}).catch((error) => {})`

```javascript
let url = 'urlpath'
HTTP.get({
  url: url,
  params: {id: 1, name: 'ming'},
  mask: true
}).then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

##### `HTTP.post()`

> 可自定义 headers，如需 `Authorization` 等，默认：`'Content-Type': 'application/json'`

```javascript
HTTP.post({
  url: url, params: {id: 1, name: 'ming' },
  mask: true,
  loading: false,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
}).then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

##### `HTTP.patch()` `HTTP.put()` `HTTP.delete()` 请求方式与 `HTTP.post()` 写法类似

```javascript
// HTTP PATCH
HTTP.patch({url: url, params: [JSON Object], headers: [JSON Object], mask: [Boolean] }).then((data) => {}).catch((error) => {})
// HTTP PUT
HTTP.put({url: url, params: [JSON Object], headers: [JSON Object], mask: [Boolean] }).then((data) => {}).catch((error) => {})
// HTTP DELETE
HTTP.delete({url: url, params: [JSON Object], headers: [JSON Object], mask: [Boolean] }).then((data) => {}).catch((error) => {})
```

> `mask` 是否显示透明蒙层，防止触摸穿透，默认：`false`。`loading` 在网络请求加过程中是否显示 `wx.showLoading` 加载动画，默认显示。

⚠️ `onPullDownRefresh` 监听下拉动作与 `wx.showLoading` 一起使用会出现顶部回弹 BUG。所以在使用 `onPullDownRefresh` 时可以将 `loading` 设置为 `false`

## Tips

### 界面

##### `TIPS.toast()`

> 显示消息提示框（可自定义 wx.showToast 的所有参数，除 success、fail、complete）

```javascript
TIPS.toast({title: '提示标题'})

// 设置 duration > 0 后，隐藏后可支持回调（duration 默认 1500）
TIPS.toast({
  title: '提示标题'
}).then(() => {
  console.log('隐藏后回调')
})
```

##### `TIPS.confirm()`

> 显示模态弹窗（payload 为 Promise.resolve 是可选项），除 showCancel 改为 cancel 外，其它可选参数与 wx.showModal 相同

```javascript
TIPS.confirm({
  title: '提示标题',
  content: '提示内容',
  payload: [1,2,3]
}).then((arr) => {
  console.log('点击了确定', arr[2]) // 3
}).catch(() => {
  console.log('点击了取消')
})
```

##### `TIPS.setTitle()`

> 动态设置当前页面的标题

```javascript
TIPS.setTitle('Hello WePy')
```

##### `TIPS.loading()`

> 显示 loading 提示框，可自定义提示内容，默认显示透明蒙层，防止触摸穿透

```javascript
TIPS.loading('加载标题')
```

##### `TIPS.loaded()`

> 隐藏 loading 提示框

```javascript
TIPS.loaded()
```

### 文件

##### `TIPS.downloadSaveFile()`

> 下载单个文件

```javascript
let url = 'url'
TIPS.downloadSaveFile({
  url: url,
  success: (res) => {
    console.log(res)
  },
  fail: (err) => {
    console.log(err)
  }
})
```

##### `TIPS.downloadSaveFiles()`

> 下载多个文件

```javascript
let urls = ['url1','url2','url3']
TIPS.downloadSaveFiles({
  urls: urls,
  progress: true,
  success: (res) => {
    // 下载进度（如果设置 progress: false 数据将在全部下载完成后返回）
    console.log(`下载进度:${res.step}%`)
    // 全部加载完成
    if (res.step === 100) {
      console.log(res)
      res.forEach((value, key) => {
        console.log(`Key:${key} = Value:${value.savedFilePath}`)
      })
    }
  },
  fail: (err) => {
    console.log(err)
  }
})
```

### 导航

##### `TIPS.navigateTo()`

> 保留当前页面，跳转到应用内的某个页面

```javascript
let url = 'test'
let params = {id:1 ,name: 'ming'}
TIPS.navigateTo(url, params)  // test?id=1&name=ming
```

##### `TIPS.redirectTo()`

> 关闭当前页面，跳转到应用内的某个页面

```javascript
let url = 'test'
let params = {id:1 ,name: 'ming'}
TIPS.redirectTo(url, params)  // test?id=1&name=ming
```

##### `TIPS.switchTab()`

> 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

```javascript
let url = 'test'
let params = {id:1 ,name: 'ming'}
TIPS.switchTab(url, params)  // test?id=1&name=ming
```

##### `TIPS.reLaunch()`

> 关闭所有页面，打开到应用内的某个页面

```javascript
let url = 'test'
let params = {id:1 ,name: 'ming'}
TIPS.reLaunch(url, params)  // test?id=1&name=ming
```

> `TIPS.navigateTo()` `TIPS.redirectTo()` `TIPS.switchTab()` `TIPS.reLaunch()` 中的 `params` 参数是一个可选对象
