/** 多行省略号 
* @params  elem      Element,多行文本省略显示的目标元素 
* @params  rows      num,显示的行数,默认:2  
* @params  sym       str,省略号表示,默认:'...'  
* @params  autoMode  bol,是否自动改变,默认: true   
-   即不用手动维护,自动改变截取文本, 但vue中需交给vue来维护 手动调用来改变文本 
* @return  type,返回值说明 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
- 方案1: 复制元素到DOM中多次调整直到满足要求,然后再对原元素进行设置 ✔ 
- 方案2: 使用 canvas 文本测量 context.measureText,以确定应该出现点点点字符串的数量 
-   无法预测字符换行问题,将出现误差 ✘  
* -----------------------------
* @todo  
* 1 代办事项1 
*/
export default function main(elem,rows=2,sym='...',autoMode=true){
  let copyEl = elem.cloneNode(true);
  copyEl.setAttribute("style",`
    ${copyEl.getAttribute("style")};
    height: auto !important;
    position: fixed;
    top: 0; 
    right: 0; 
    z-index: -100;
    opacity: 0;
  `)
  document.body.appendChild(copyEl); // 将元素插入到DOM进行渲染 
  
  let computedStyle = window.getComputedStyle(copyEl);
  let lineHeight = computedStyle.lineHeight;
  if (lineHeight==='normal') { lineHeight = getNormalLineHeight(); }
  else { lineHeight = lineHeight.slice(0,-2)*1; }
  let paddingTop = computedStyle.paddingTop.slice(0,-2)*1;
  let paddingBottom = computedStyle.paddingBottom.slice(0,-2)*1;
  let finalClientH = rows*lineHeight + paddingTop + paddingBottom; 
  
  let orginTxt = copyEl.textContent;
  let finalTxt = orginTxt; 
  copyEl.textContent = finalTxt + sym; 
  
  if (copyEl.clientHeight > finalClientH) {
    finalTxt = getNeedTxt(copyEl,finalClientH,orginTxt,sym);
  }
  
  if (autoMode) { elem.textContent = finalTxt; }
  document.body.removeChild(copyEl);
  copyEl = null;
  
  return finalTxt;
}


// 获取 行高为 normal 的具体值 
function getNormalLineHeight(text){
  let txt = text || '汉字';
  let elem = document.createElement("div");
  elem.setAttribute("style",`
    margin: 0; 
    padding: 0; 
    border: none;
    position: fixed;
    top: 0; 
    right: 0; 
    z-index: -100;
  `);
  elem.textContent = txt;
  
  document.body.appendChild(elem); // 将元素插入到DOM进行渲染 
  let lineHeight = elem.clientHeight;
  
  document.body.removeChild(elem);
  elem = null; 
  return lineHeight;
}
// 获取 所需要的文本内容 
function getNeedTxt(elem,cH,text,sym){
  let nextTxt = text.slice(0,-1); 
  elem.textContent = (nextTxt+sym).trim();
  
  // 使用 Math.round 避免出现精度误差 
  if ( Math.round(elem.clientHeight-ch)>=0 ) { return nextTxt+sym; }
  
  return getNeedTxt(elem,cH,nextTxt,sym); 
}



/* ================================== 测试 ================================== */
export function test(){
} 