# WePy Utils

## 安装

```console
npm install wepy-utils
```

## 按需引入

```html
<script>
  import { UTILS, HTTP, TIPS } from 'wepy-utils'
</script>
```

## Utils

```html
<script>
  // 当前时间戳
  let now = UTILS.now()

  // 随机数 UTILS.random(min, max)
  let random = UTILS.random(1, 5)

  // 待更新...
</script>
```

## HTTP Request

```html
<script>
  /**
   * [HTTP GET 请求]
   * @param 
   * HTTP.get(url).then((data) => {}).catch((error) => {})
   * HTTP.get({url: url, params: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  
  HTTP.get(url: url, params: {id: 1, name: 'ming' }).then(function(data) {
    console.log(data)
  }).catch((error) => {
    console.log(error)
  })

  // 待更新...
</script>

```

## Tips

```html
<script>
  
  /**
   * [显示消息提示框 - wx.showToast]
   * TIPS.success([string], [int])
   */
  
  TIPS.success('这是一个标题', 1000)

  /**
   * [显示模态弹窗 - wx.showModal]
   * @param
   * TIPS.confirm([string], [JSON Object], [string])
   */
  
  TIPS.confirm('文字内容', '标题内容').then(function() {
    console.log('点击了确定');
  }).catch(function() {
    console.log('点击了取消');
  });

  /**
   * [动态设置当前页面的标题 - wx.setNavigationBarTitle]
   * TIPS.setTitle([string])
   */
  
  TIPS.setTitle('Hello WePy')

  // 待更新...
</script>

```