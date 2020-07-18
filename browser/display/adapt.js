/** 移动端尺寸自适应方案 
* @params  sizeList      [num1,num2,num3],屏幕宽度,unit:px 
-   num1  最小宽度,默认:200 
-   num2  标注参照宽度,默认按iPhone8的屏宽375px为参照  
-   num3  最大宽度,默认:600 
* @params  outMinHandle  fn,小于最小宽度时触发回调,默认:num=>num 
* @params  outMaxHandle  fn,大于最大宽度时触发回调,默认:num=>num  
* @params  root          Window,页面顶层对象,默认:window 
* @return  / 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
- CSS样式中, 0.2rem 即表示 20px 
- 当屏幕尺寸变化时,将按比例进行缩放 
- 使用less时: 
- 在less中定义变量 @w: 1rem/ratio; 来表示1px 
- 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
* -----------------------------
* @todo  
* 1 代办事项1 
*/
export default function main(sizeList,outMinHandle,outMaxHandle,root){
  // 处理入参 
  sizeList = sizeList || []
  if (typeof outMinHandle != 'function') { outMinHandle = num=>num  }
  if (typeof outMaxHandle != 'function') { outMaxHandle = num=>num }
  root = root || window; 
  
  // 变量定义 
  let minWidth = sizeList[0] || 200   
  let standard = sizeList[1] || 375   
  let maxWidth = sizeList[2] || 600   
  let ratio = 100; // 缩放系数 
  // Chrome中字体大小有限制,最小为12px 
  // 故将字体放大ratio倍, 使用 375/ratio*1rem 来表示一个屏宽 
  
  
  root.addEventListener("load", (evt)=>{
    setRem( standard, minWidth, maxWidth, outMinHandle, outMaxHandle, root, ratio  )
  });
  let resizeEvt = 'orientationchange' in root ? 'orientationchange' : 'resize'
  root.addEventListener(resizeEvt, (evt)=>{
    setRem( standard, minWidth, maxWidth, outMinHandle, outMaxHandle, root, ratio  )
  });
  
  // 防止闪屏 
  setRem(null);
  root.document.addEventListener('DOMContentLoaded', (evt)=>{
    setRem( standard, minWidth, maxWidth, outMinHandle, outMaxHandle, root, ratio  )
  }, false);
}
function setRem( standard, minWidth, maxWidth, outMinHandle, outMaxHandle, root, ratio  ) {
  let rootEl = root.document.documentElement
  let _fontSize = ratio;
  let minFontSize = minWidth/standard*ratio;
  let maxFontSize = maxWidth/standard*ratio; 
  let _clientWidth = rootEl.clientWidth;
  
  // 限制最小宽度 
  if( _clientWidth <= minWidth ){       
    _fontSize = minFontSize;   
    outMinHandle(); 
  }
  // 限制最大宽度 
  else if( _clientWidth >= maxWidth) {  
    _fontSize = maxFontSize;   
    outMaxHandle(); 
  }
  // 在可变范围内 
  else{ _fontSize = _clientWidth/standard*ratio; }
  rootEl.style.fontSize = _fontSize + 'px';
  root.document.body.style.fontSize = _fontSize*12/ratio+'px';
};



/* ================================== 测试 ================================== */
export function test(){
  main(
    [200,375,600],
    window, 
    ()=>{ console.log('超过了最小值 200px'); }, 
    ()=>{ console.log('超过了最大值 600px'); } 
  );
} 

