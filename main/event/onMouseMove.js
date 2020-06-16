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
export default function main(moveArea,callback,{viewport,page,percent}){
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



/* 测试 */
export function test(){
  document.body.insertAdjacentHTML("beforeend",`
    <div id="div1"> </div>
    <div id="div2"> </div>
    
    <div id="divArea"> 
      <div class="div div3"> 
        3
        <div class="div div5"> 5</div>
      </div>
      <div class="div div4"> 4</div>
      
      <div class="div" id="moveDiv">
        
      </div>
    </div>
    <style >
      body {
        height: 300vh;
      }
      #divArea { 
        position: absolute;
        top: 100px;
        left: 100px;
        height: 150vh; 
        width: 500px;
        background-color: #ccc;
      }
      .div {
        width: 100px;
        height: 100px;
        background-color: blue;
      }
      .div3 {
        
      }
      
      #div1,#div2 {
        position: absolute;
        top: 399px;
        left: 200px;
        width: 100px;
        height: 100px;
        background-color: green;
        z-index: 100;
      }
      div#div2{
        top: 200px;
        left: 200px;
        background-color: red;
      }
    </style>
  `)
  
  
  let options = {
    percent: true,
    viewport: true,
    page: true,
  }
  main(divArea,function(rst){
    console.log(rst);
    moveDiv.setAttribute("style",`
      position: absolute;
      top: ${rst.top-3}%;
      left: ${rst.lft-3}%;
    `)
  },options)

} 
