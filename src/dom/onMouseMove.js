/* 鼠标移动监听 */
/* 功能: 
  获取鼠标位置 
    相对当前元素 
    相对页面 
    相对视口 
*/

/* 
@params moveArea  Element,鼠标移动的区域 
@params callback  fn(positions),鼠标移动时的回调函数 
  positions <=> {
    top: <num>,  // 光标相对移动区的top值 
    lft: <num>,  // 光标相对移动区的left值 
    // 以下值需通过配置设置才会存在 
    vpTop: <num>,   // 光标相对视口的top值
    vpLft: <num>,   // 光标相对视口的left值
    pgTop: <num>, // 光标相对页面的top值
    pgLft: <num>, // 光标相对页面的left值
  }
@params options   obj,可选,配置选项 <=> {
  viewport: bol, // 是否获取相对视口的位置,默认:false 
  page: bol,     // 是否获取相对页面的位置,默认:false
  percent: bol,  // 是否使用百分比显示光标相对移动区域的位置  
}
@return undefined 
*/
import getOffset from "./getOffset.js";
function onMouseMove(moveArea,callback,{viewport,page,percent}){
  moveArea.addEventListener("mousemove",function(evt){
    
    let top = evt.offsetY || evt.layerY 
    let lft = evt.offsetX || evt.layerX // layerX兼容FF 
    let vpTop = undefined; 
    let vpLft = undefined; 
    let pgTop = undefined; 
    let pgLft = undefined; 
    
    // 光标在移动区中的其他元素A上移动时 
    if ( evt.target!==this ) {
      let offset = getOffset(evt.target, this)
      top += offset.top; 
      lft += offset.lft; 
      
      if (top<0 || lft <0 || top>this.clientHeight || lft>this.clientWidth ) { return ; }
    }
    
    if (viewport) { 
      let bcr = this.getBoundingClientRect();  
      vpTop = top + bcr.top; 
      vpLft = lft + bcr.left; 
    }
    if (page) { 
      let offset2Doc = getOffset(this,document.documentElement)
      pgTop = top + offset2Doc.top;
      pgLft = lft + offset2Doc.lft; 
    }
    
    if (percent) {
      top = (top/this.clientHeight*100).toFixed(2)*1;
      lft = (lft/this.clientWidth*100).toFixed(2)*1;
    }
    callback({
      top, 
      lft, 
      vpTop,
      vpLft,
      pgTop,
      pgLft,
    })
  })
} 

export default onMouseMove; 


