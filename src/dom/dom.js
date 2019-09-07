
// TODO: 测试 
/* 
监测元素是否滚动到底部 
*/
import {throttle} from "../es/functions.js";
export function scrollToBottomRun(elem=document.scrollingElement,callback,distance=0,frequency=500,){
  // elem       Elemnent,监测的元素,默认:HTML元素 
  // callback   触发时执行的回调 
  // distance   num,距离底部的触发距离,unit:px 
  // frequency  num,触发的间隔时间,unit:ms 
  throttle(function(){
    let scrollEl = elem || document.documentElement; // IE 不支持 document.scrollingElement 
    let _num = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight;
    
    if ( _num <= distance ) { callback(); }
  },null,frequency);
}


// 滚动条滚动到顶部 
export function scrollToTop(){  
  /*Input:  /
  * Output: / 
  */
  const scroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (scroll > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scroll - scroll / 8);
  }
}
