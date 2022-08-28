# 页面加载数据上报
- 背景 抓取用户浏览页面的行为,主要收集信息
- 1、页面进入阶段上报数据(浏览器信息 手机信息,时间节点,等)
- 2、页面滑动阶段上报数据(2s 一次)
- 3、页面停止阶段上报数据(5s 一次)
- 4、页面离开阶段上报数据(一次)
## 后端管理数据分析
- 可视化的 数据结构待定
## 页面初始上报数据
- type 做区别 start_time
```js
{
    // id
    "uuid": "4CCC07C261EF9F4ACC48B43FF9B0C5DE",
    // 上传类型
    "type": "start_time",
    // 当前时间
    "currentTime": 1661006761930,
    // ip
    "ip": "117.152.223.188",
    // 城市
    "city": "CHINA",
    // 是否是微信浏览器
    "isWxBrowser": false,
    // 浏览器信息
    'navigatorUserAgent':navigator.userAgent,

}
```
## 页面滑动数据上报
- type scroll_time
```js
{
    // id
    "uuid": "4CCC07C261EF9F4ACC48B43FF9B0C5DE",
    // 上传类型
    "type": "scroll_time",
    // 当前时间
    "currentTime": 1661006950607,
    // ip
    "ip": "117.152.223.188",
    // 城市
    "city": "CHINA",
    // 是否是微信浏览器
    "isWxBrowser": false,
    // 浏览器当前浏览位子 比例
    "currentPageSite": "0%",
    // 当前停留的时间
    "stopTime": 0
}
```

## 页面等待数据上报
- type stop_time
```js
{

     // id
    "uuid": "4CCC07C261EF9F4ACC48B43FF9B0C5DE",
    // 上传类型
    "type": "stop_time",
    // 当前时间
    "currentTime": 1661006950607,
    // ip
    "ip": "117.152.223.188",
    // 城市
    "city": "CHINA",
    // 是否是微信浏览器
    "isWxBrowser": false,
    // 浏览器当前浏览位子 比例
    "currentPageSite": "0%",
    // 当前停留的时间
    "stopTime": 20000
}
```
##  页面离开数据上报
- type end_time
```js
{
     // id
    "uuid": "4CCC07C261EF9F4ACC48B43FF9B0C5DE",
    // 上传类型
    "type": "end_time",
    // 当前时间
    "currentTime": 1661006950607,
    // ip
    "ip": "117.152.223.188",
    // 城市
    "city": "CHINA",
    // 是否是微信浏览器
    "isWxBrowser": false,
    // 浏览器当前浏览位子 比例
    "currentPageSite": "0%",
    // 当前停留的时间
}
```
## 触发页面 二维码数据上报
- type QRcode_touchstart
```js
{
    uuid: options.uuid,
    type: 'QRcode_touchstart',
    
    time: '700'
}
```
- 1、通过ip 获取问访地区
    -  刷选条件 时间(天),页面停留时间(s),二维码触发
- 2、通过时间(24小时 间隔一个小时) 查看访问人数
    -  刷选条件 页面停留时间(s),二维码触发
- 3、通过浏览访问时间，查看人数
    -  刷选条件浏览总时间 (30-60s) (61-120s) (121-180s) (181-240s) (241-300s) (301-360s) (421-480s) 及 以上
- 4、页面滑动时间统计 人数
    -   页面滑动事件总 (30-60s) (61-120s) (121-180s) (181-240s) (241-300s) (301-360s) (421-480s) 及 以上
- 5、页面停留时间统计 人数
    -   页面停留事件总 (30-60s) (61-120s) (121-180s) (181-240s) (241-300s) (301-360s) (421-480s) 及 以上
- 6、查看二维码触发
    -   浏览时长  (30-60s) (61-120s) (121-180s) (181-240s) (241-300s) (301-360s) (421-480s) 及 以上