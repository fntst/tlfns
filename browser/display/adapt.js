/** 移动端尺寸自适应方案 
* @params  options = {
-   normal: num,  // 标注参照宽度，默认按iPhone8的屏宽375px为参照,unit:px，默认:375 
-   ratio: num,   // 缩放系数，默认：100 
-   minWidth: num,  // 最小宽度,unit:px，默认:200 
-   maxWidth: num,  // 最大宽度,unit:px，默认:900 
-   outMin: fn,   // 小于最小宽度时触发回调,默认:num=>num 
-   outMax: fn,   // 大于最大宽度时触发回调,默认:num=>num 
}     
* @return  / 
* -----------------------------
* @author  fsl 
* @time    时间值 
* @update  2020.12.19  
* -----------------------------
* @detail  
- CSS样式中, 0.2rem 即表示 20px 
- 当屏幕尺寸变化时,将按比例进行缩放 
- 使用less时: 
- 在less中定义变量 @w: 1rem/ratio; 来表示1px 
- 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
-   Chrome中字体大小有限制,最小为12px 
-   故将字体放大ratio倍, 使用 375/ratio*1rem 来表示一个屏宽 
* -----------------------------
* @todo  
* 1 代办事项1 
*/

const cfg = {
  num: 375,
  min: 200,
  max: 900,
  ratio: 100,
  fn(){ return num=>num;},
  log(...arg){ console.log('# adapt:', ...arg); },
}
export default function main(options={}){
  if (typeof options !== 'object') {
    console.error('# adapt: error argument')
    return ;
  }
  
  // 处理入参 
  let {
    normal = cfg.num,
    ratio = cfg.ratio,
    minWidth = cfg.min,
    maxWidth = cfg.max,
    outMin = cfg.fn(),
    outMax = cfg.fn(),
  } = options;
  if (typeof normal != 'number') {
    log('error argument', 'normal');
    normal = cfg.num;
  }
  if (typeof ratio != 'number') {
    log('error argument', 'ratio');
    ratio = cfg.ratio;
  }
  if (typeof minWidth != 'number') {
    log('error argument', 'minWidth');
    minWidth = cfg.min;
  }
  if (typeof maxWidth != 'number') {
    log('error argument', 'maxWidth');
    maxWidth = cfg.max;
  }
  if (typeof outMin != 'function') { 
    log('error argument', 'outMin');
    outMin = cfg.fn();
  }
  if (typeof outMax != 'function') { 
    log('error argument', 'outMax');
    outMax = cfg.fn();
  }
  
  // 定义变量 
  const root = window; 
  if (!root) {
    console.log('env err');
    return ;
  }
  
  // 变动处理 
  root.addEventListener("load", (evt)=>{
    setRem({ normal, minWidth, maxWidth, outMin, outMax, root, ratio })
  });
  let resizeEvt = 'orientationchange' in root ? 'orientationchange' : 'resize'
  root.addEventListener(resizeEvt, (evt)=>{
    setRem({ normal, minWidth, maxWidth, outMin, outMax, root, ratio })
  });
  // 防止闪屏 
  setRem({ normal, minWidth, maxWidth, outMin, outMax, root, ratio })
  root.document.addEventListener('DOMContentLoaded', (evt)=>{
    setRem({ normal, minWidth, maxWidth, outMin, outMax, root, ratio })
  }, false);
}
function setRem(option) {
  let {
    normal, 
    minWidth,
    maxWidth,
    outMin,
    outMax,
    ratio,  
  } = option; 
  let rootEl = window.document.documentElement
  let _fontSize = ratio;
  let minFontSize = minWidth/normal*ratio;
  let maxFontSize = maxWidth/normal*ratio; 
  let _clientWidth = rootEl.clientWidth;
  
  // 限制最小宽度 
  if( _clientWidth <= minWidth ){       
    _fontSize = minFontSize;   
    outMin(_fontSize); 
  }
  // 限制最大宽度 
  else if( _clientWidth >= maxWidth) {  
    _fontSize = maxFontSize;   
    outMax(_fontSize); 
  }
  // 在可变范围内 
  else{ _fontSize = _clientWidth/normal*ratio; }
  rootEl.style.fontSize = _fontSize + 'px';
  window.document.body.style.fontSize = _fontSize + 'px';
  // root.document.body.style.fontSize = _fontSize*12/ratio+'px';
};



/* ================================== 测试 ================================== */
export function test(){
  // main({
  //   normal: 375,
  //   ratio: 100,
  //   minWidth: 222,
  //   maxWidth: 999,
  //   outMin: ()=>{
  //     console.log('超出最小值 222');
  //   },
  //   outMax: ()=>{
  //     console.log('超出最大值 999');
  //   },
  // });
  main();
} 

