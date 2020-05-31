import { isIE } from "./envCheck.js";

/*** 页面自动缩放适应 缩放元素,可用于自适应布局 
* @Params:  totalW    num,初始宽度,该宽度将被始终缩放到适合的大小 
* @Return:  selector  str,元素选择器,将被缩放的元素 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
- 01 详细说明1 
* -----------------------------
* @update  
- 时间值 更新说明 
*/
export default function main(totalW,selector){
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



/* 测试 */
export function test(){
  scale(1400,'#layout'); 
  // 表示默认1400px宽度的layout的元素 
  // 在较小的宽度下也能适当的显示[而不会出现滚动条] 
} 


