// 环境监测 

// 获取操作系统名称 
export function getOSName(){  
  /*Input:  /
  * Output: KW,操作系统名称 
  */
  let os = 'unkonwn'
  
  let userAgent = navigator.userAgent.toLowerCase() 
  let appVersion = navigator.appVersion.toLowerCase() 
  // let vendor = navigator.vendor.toLowerCase() 
  // let platform = navigator.platform.toLowerCase() 
  let list = [
    { rgep: /win/i, testVal: appVersion, name: 'windows', },
    { rgep: /mac/i, testVal: appVersion, name: 'mac', },
    { rgep: /linux/i, testVal: appVersion, name: 'linux', },
    { rgep: /android/i, testVal: userAgent, name: 'android', },
    { rgep: /iphone/i, testVal: userAgent, name: 'ios', },
    { rgep: /ipad/i, testVal: userAgent, name: 'ios', },
    { rgep: /ipod/i, testVal: userAgent, name: 'ios', },
  ]
  let item = list.find(itm=>itm.rgep.test(itm.testVal) )
  if (item) { os = item.name }
  
  return os
}
// 获取浏览器名称&版本 
export function getBrowserInfo(){  
  /*Input:  /
  * Output: obj,浏览器类型和版本
  -   { name: '', version: '', }
  */
  let result = { name: 'unkonwn', version: 'unkonwn', }
  
  let ua = navigator.userAgent.toLowerCase() 
  let browserList = [
    { name: 'chrome', version: 'unkonwn', rgep: /chrome\/([\d\.]+)/, },
    { name: 'ie', version: 'unkonwn', rgep: /rv:([\d.]+)\) like gecko/, },
    { name: 'ie', version: 'unkonwn', rgep: /msie ([\d\.]+)/, },
    { name: 'edge', version: 'unkonwn', rgep: /edge\/([\d\.]+)/, },
    { name: 'firefox', version: 'unkonwn', rgep: /firefox\/([\d\.]+)/, },
    { name: 'opera', version: 'unkonwn', rgep: /(?:opera|opr).([\d\.]+)/, },
    { name: 'safari', version: 'unkonwn', rgep: /version\/([\d\.]+).*safari/, },
  ]
  let browser = browserList.find(itm=>{ 
    let matchs = ua.match(itm.rgep) 
    if ( matches ) { itm.version = matches[1] }
    return matchs 
  } )
  if ( browser ) {
    result = { name: browser.name, version: browser.version, }
  }
  
  return result; 
}
// 是否为IE 
export function isIE(){ 
  /*Input: / 
  * Output: bol,是否为IE 
  */
  if (!!window.ActiveXObject || "ActiveXObject" in window){ return true; }
  return false; 
}
// 是否为低版本IE [IE7、8、9 之一] 
export function isLowerIE(num){ 
  /*Input:  num,可选,7/8/9  
  * Output: bol,是否为指定的IE版本 
  */
  let elemB = document.createElement('b');
  if (num) {
    elemB.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->';
  }
  else {
    elemB.innerHTML = '<!--[if IE 7]><i></i><![endif]-->'
    elemB.innerHTML += '<!--[if IE 8]><i></i><![endif]-->'
    elemB.innerHTML += '<!--[if IE 9]><i></i><![endif]-->'
  }
  return elemB.getElementsByTagName('i').length>0;
}


// 功能支持 

// 浏览器是否支持webP格式图片 
export function webPAble(){ 
  /*Input:  /
  * Output: bol,是否支持webP格式图片
  */
  let cvs = document.createElement('canvas');
  return cvs.toDataURL && cvs.toDataURL('image/webp').indexOf('data:image/webp')===0;
  //  .toDataURL 方法,判断是否 IE9+ 
}












