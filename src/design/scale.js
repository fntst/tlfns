// 页面自动缩放适应 


// 监测是否IE 
function isIE(){
  if (!!window.ActiveXObject || "ActiveXObject" in window) { return true; }
        
  return false;
}


/** 函数简述 缩放元素 
  * Describe: 可用于自适应布局  
  * @Params:  totalW    num,初始宽度,该宽度将被始终缩放到适合的大小 
  * @Return:  selector  str,元素选择器,将被缩放的元素 
  */
export default function(totalW,selector){
  let winWidth = window.innerWidth - 20; // 微调 
  if (winWidth>totalW) { return ; }  // 无需缩放 
  
  let scale = winWidth/totalW; 
  let style = ''
  if (isIE()) { style = 'body{overflow-x:hidden;}' }
  // 当尺寸过小,不再缩放
  if (scale<0.6) {
    style = '';
    scale = 0.6;
  }
  // zoom 在IE中未生效 
  let styleElem = document.createElement("style");
  styleElem.textContent = `
    ${selector} {
      width: ${winWidth/scale}px;
      -ms-transfrom: scale(${scale});
      -ms-transfrom-orgin: 0 0;
      transfrom: scale(${scale});
      transfrom-orgin: 0 0;
    }
    ${style}
  `
  document.body.appendChild(styleElem);
}

/* Test: 
import scale from "./scale.js";
scale(1400,'#layout'); 
表示默认1400px宽度的layout的元素 
在较小的宽度下也能适当的显示[而不会出现滚动条] 
*/



