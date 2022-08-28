
const BASEURL = 'http://120.27.208.254/api/v1/admin'
const options = {
    uuid:'',
    // 进入时间
    entry_time: '',
    // 离开时间
    out_time: '',
    // 页面浏览时间
    stay_time: '',
    // 页面停留时间计算
    stop_time: 0,
};
/*
触发类型
type,
当前时间
currentTime
ip
城市
city
查看微信
isWxBrowser
*/
const getDom = (d)=> document.querySelector(d);
const getTime = () => new Date().getTime();
const getIp = () => returnCitySN["cip"];
const getCity = () => returnCitySN["cname"];
const getIsWxBrowser = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
const currentPageSite = () => window.pageYOffset


// 页面的高度
let getPageHeight = 0;
const scollPercentage = (n) => {
    if (Number(n) === NaN) throw `${n} is not a number`;
    console.log(n, String(n).slice(0, 4))
    return `${String(n).slice(0, 4) * 100}%`
}

const throttle = (fn,ms) => {
    let canRun = true;
    let timer = null;
    return function () {
      if(!canRun) {
        return;
      }
      canRun = false;
          clearTimeout(timer)
      timer = setTimeout( () => {
        fn.call(this, arguments);
        canRun = true;
      }, ms);
    };
  }

const getUuid = () => {
    var s = [];

    var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)

    }

    s[14] = "4"

    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    let uuid = s.join("")

    return uuid
}

const ajax = ({ url, method, data }) => new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function () {
        //这里是异步执行
        // 4 (完成)响应内容解析完成,可以在客户端调用
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                resolve(xhr.responseText)
            }
        }
    }
    data = JSON.stringify(data)
    xhr.send(data)
});

(async () => {
    const ewmFnSetTimeont = null;
    const ewmFn = () => { 
        ewmFnSetTimeont = setTimeout(async() => {
            const r = await ajax({
                url: BASEURL+'/browseData',
                method: 'POST',
                data: {
                    uuid: options.uuid,
                    type: 'QRcode_touchstart',
                    time: '700'
                }
            })
            console.log('触发长按事件')
        },700)
    }
    /*
    onload (页面加载完后)
    onbeforeunload （页面卸载前，也就是点击叉的时候） 
    onpageshow （页面显示的时候）
    onpagehide （页面隐藏的时候）
        经过自己的一点小测试，发现无论在关闭的时候（也就是点击叉），还是隐藏的时候（也就是点击左右箭头）都会触发 onpagehide;
        也无论是在首次加载，还是刷新的时候，都会触发onpageshow,
        但是刷新的时候会先触发onpagehide,在触发onpageshow。其
        最后，个人选择了用onpageshow和onpagehide这个两个API获取用户停留的时长，你也可以用其他两个API做。
        只要在onpageshow初始时间值，在onpagehide的时间求出差值，然后上传到后台就行。
    */
    // 页面显示时间
    window.onpageshow = async () => {
        // 存储本地信息
        const _uuid = localStorage.getItem('__UUID__')
        if (!_uuid) { 
            const uuid = getUuid();
            localStorage.setItem('__UUID__', uuid)
            options.uuid = uuid
        } else {
            options.uuid = _uuid
        }

        let timer_stop_time = null;
        getPageHeight = getDom('#page-content').offsetHeight - window.innerHeight;
        console.log('getPageHeight', getPageHeight)
        // 捕获当前时间
        options.entry_time = getTime();
        // 进入的时间
        const r = await ajax({
            url: BASEURL+'/browseData',
            method: 'POST',
            data: {
                // id
                uuid: options.uuid,
                // 上传类型
                type: 'start_time',
                // 当前时间
                currentTime: getTime(),
                // ip
                // ip: getIp(),
                // 城市
                city: getCity(),
                // 是否是微信浏览器
                isWxBrowser: getIsWxBrowser(),
                navigatorUserAgent:navigator.userAgent,
            }
        })
        getDom('.ewm1').addEventListener('touchstart',ewmFn)
        getDom('.ewm1').addEventListener('touchend', () => { 
            clearTimeout(ewmFnSetTimeont)
        })
        
        window.onscroll = throttle(async() => {
            clearTimeout(timer_stop_time)
            options.stop_time = 0
            console.log('==>', scollPercentage(currentPageSite() / getPageHeight), currentPageSite())

            // 记录位子
            const r = await ajax({
                url: BASEURL+'/browseData',
                method: 'POST',
                data: {
                    // id
                    uuid: options.uuid,
                    // 上传类型
                    type: 'scroll_time',
                    // 当前时间
                    currentTime: getTime(),
                    // ip
                    // ip: getIp(),
                    // 城市
                    city: getCity(),
                    // 是否是微信浏览器
                    isWxBrowser: getIsWxBrowser(),
                    // 页面的位子
                    currentPageSite: scollPercentage(currentPageSite() / getPageHeight),
                    // 当前停留的时间
                    stopTime: options.stop_time
                },
            }) 

            timer_stop_time = setInterval(async() => {
                options.stop_time = Number(options.stop_time) + 5000;
                // 停留的时间
                const r = await ajax({
                    url: BASEURL+'/browseData',
                    method: 'POST',
                    data: {
                        // id
                        uuid: options.uuid,
                        // 上传类型
                        type: 'stop_time',
                        // 当前时间
                        currentTime: getTime(),
                        // ip
                        // ip: getIp(),
                        // 城市
                        city: getCity(),
                        // 是否是微信浏览器
                        isWxBrowser: getIsWxBrowser(),
                        // 页面的位子
                        currentPageSite: scollPercentage(currentPageSite() / getPageHeight),
                        // 当前停留的时间
                        stopTime: options.stop_time
                    },
                }) 
            },5000)
        },2000)
    }

    window.onpagehide = async () => {
        // 离开的时间
        const r = await ajax({
            url: BASEURL+'/browseData',
            method: 'POST',
            data: {
                 // id
                 uuid: options.uuid,
                 // 上传类型
                 type: 'end_time',
                 // 当前时间
                 currentTime: getTime(),
                 // ip
                //  ip: getIp(),
                 // 城市
                 city: getCity(),
                 // 是否是微信浏览器
                isWxBrowser: getIsWxBrowser(),
                // 页面的位子
                currentPageSite:scollPercentage(currentPageSite() / getPageHeight),
            },
        }) 
    }
    
})()

