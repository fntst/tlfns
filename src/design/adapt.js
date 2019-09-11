// 移动端尺寸自适应方案 

let adapt = function(sizeList,root,outMinHandle,outMaxHandle){
  let minWidth = sizeList[0] || 200  // 最小宽度 
  let standard = sizeList[1] || 375  // 默认按iPhone8的屏宽375px为参照 
  let maxWidth = sizeList[2] || 600  // 最大宽度 
  let ratio = 100; // 缩放系数 
  // Chrome中字体大小有限制,最小为12px 
  // 故将字体放大ratio倍, 使用 375/ratio*1rem 来表示一个屏宽 
  
  // CSS样式中, 0.2rem 即表示 20px 
  // 当屏幕尺寸变化时,将按比例进行缩放 
  // 使用less时: 
  // 在less中定义变量 @w: 1rem/ratio; 来表示1px 
  // 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
  let minFontSize = minWidth/standard*ratio;
  let _fontSize = ratio;
  let maxFontSize = maxWidth/standard*ratio; 
  
  function setRem(evt) {
    let rootEl = root.document.documentElement
    let _clientWidth = rootEl.clientWidth;
    
    if( _clientWidth <= minWidth ){       // 限制最小宽度 
      _fontSize = minFontSize;   
      outMinHandle && outMinHandle(); 
    }
    else if( _clientWidth >= maxWidth) {  // 限制最大宽度 
      _fontSize = maxWidth/standard*ratio;   
      outMaxHandle && outMaxHandle(); 
    }
    else{                                 // 在可变范围内 
      _fontSize = _clientWidth/standard*ratio;   
    }
    rootEl.style.fontSize = _fontSize + 'px';
    root.document.body.style.fontSize = _fontSize*12/ratio+'px';
  };
  let resizeEvt = 'orientationchange' in root ? 'orientationchange' : 'resize'
  root.addEventListener(resizeEvt, setRem);
  root.addEventListener("load", setRem);
  
  // 防止闪屏 
  setRem(null);
  root.document.addEventListener('DOMContentLoaded', setRem, false);
}

export default adapt;
/* Example:  
import mobileAdapt from "./mobileAdapt.js";
mobileAdapt(
  [200,375,600],
  window, 
  ()=>{
    console.log('超过了最小值 200px');
  }, 
  ()=>{
    console.log('超过了最大值 600px');
  } 
)
*/





