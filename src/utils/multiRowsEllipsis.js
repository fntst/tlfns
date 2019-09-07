// 多行省略号 

/* 
方案1: 使用 canvas 文本测量 context.measureText 
  已确定应该出现点点点字符串的数量 
  无法预测字符换行问题,将出现误差 排除 
方案2: 复制元素到DOM中多次调整直到满足要求,然后再对原元素进行设置 
*/

// 获取 行高为 normal 的具体值 
let getNormalLineHeight = function(text){
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
let getNeedTxt = function(elem,cH,text,sym){
  let nextTxt = text.slice(0,-1); 
  elem.textContent = nextTxt+sym;
  
  // 避免出现精度误差 
  if ( Math.round(elem.clientHeight)===Math.round(cH) ) { 
    return nextTxt+sym; 
  }
  else { 
    return getNeedTxt(elem,cH,nextTxt,sym); 
  }
}

let multiRowsEllipsis = function(elem,rows=2,sym='...',autoMode=true){
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
  
  finalTxt = finalTxt.trim();
  // 是否自动改变 [即不用手动维护, vue中需交给vue来维护] 
  if (autoMode) { elem.textContent = finalTxt; }
  document.body.removeChild(copyEl);
  copyEl = null;
  
  return finalTxt;
}


export default multiRowsEllipsis;


