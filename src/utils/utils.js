// 查询参数对象化  
/* 
@params  search  str,查询参数字符,
  如: ?key1=11&key2=22 或者 key1=11&key2=22 
*/
export function dealQuery(search){ 
  let result = {};
  let str = search;
  if (/^\?/.test(search)) { str = search.slice(1); }
  let arr = str.split('&');
  arr.forEach((itm,idx)=>{
    let arr1 = itm.split('=')
    result[arr1[0]] = arr1.slice(1).join('=');
  })
  return result;
}

// 当前时间格式化 
export function formatNowTime(){
  let now = new Date()
  // let year = now.getFullYear() 
  // let month = now.getMonth() + 1 
  // let day = now.getDate() 
  let hour = now.getHours() 
  let min = now.getMinutes() 
  let sec = now.getSeconds() 
  let ms = now.getMilliseconds() 
  return `${hour}:${min}:${sec}.${ms}`;
  // '05:15:12.87'
}










// 需添加 @babel/plugin-proposal-export-default-from 插件 来支持该语法 
// export copyText from './copyText.js';
// export listenResize from './listenResize.js';
// export LocalFiles from './LocalFiles.js';
// export getObjKeys from './checkVal.js';
// export constructorView from './checkVal.js';
// export objectView from './checkVal.js';



