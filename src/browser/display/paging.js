/*** 网页自动分页 
* @Params:  root       Node,页面的最外层 
* @Params:  elems      Node数组,需要监控是否分页的节点集合 
* @Params:  pageH      num,一页的高度 
* @Params:  offsetTop  num,划分到下一页后距离页眉的距离 
* @Params:  isAddGap   bol,是否添加分页间隙 
* @Return:  / 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
- 自动分页, 功能额待完善 
* -----------------------------
* @todo  
- TODO: 分割元素到两个页面中 
- 方法: 将被分割的元素A复制一份记为B, 
- 通过B定位来向下偏移(分页间隙+下边距+上边距) 
- 通过内层元素负边距来实现内容位置调整 
- 使用一背景色元素覆盖作为间隙 
*/
export default function main(root, elems, pageH, offsetTop, isAddGap=true){
  if (window.getComputedStyle(root).position==='static') {
    root.style.position = 'relative'
  }
  
  // 添加页面间隙 
  let pageGapH = 10; 
  if (isAddGap) {
    // 增加分页线 
    let lastEl = root.lastChild; 
    let pageNum = Math.floor( (lastEl.getBoundingClientRect().bottom - root.getBoundingClientRect().top)/pageH )
    for (let i=0; i<pageNum; i++) {
      let div = document.createElement("div")
      div.setAttribute("class","__gap__")
      div.style = `
        position: absolute;
        left: 0; 
        top: ${pageH*(i+1)}px;
        height: ${pageGapH}px;
        background-color: #DADCE0;
        width: 100%;
        outline: 1px solid #ccc; `
      root.appendChild(div);
    }
    
    window.addEventListener("beforeprint",function(evt){
      // console.log('beforeprint');
      document.querySelectorAll(".__gap__").forEach(itm=>{
        itm.style.display = 'none'
      })
    })
    window.addEventListener("afterprint",function(evt){
      // console.log('afterprint');
      document.querySelectorAll(".__gap__").forEach(itm=>{
        itm.style.display = 'block'
      })
    })
  }
  
  // 偏移元素,避免被页面分割 
  function offsetEl(els,idx){
    let el = els[idx]
    if (!el) { return; }
    
    let top = root.getBoundingClientRect().top;
    let rect = el.getBoundingClientRect();
    let topOffset = rect.top - top; 
    let topOffset1 = topOffset % pageH; 
    let topOffset2 = pageH - topOffset1;
    // 当节点处于页面间隙间时, 添加偏移元素  
    if (topOffset1-pageGapH<0) {
      console.log( topOffset1 );
      el.insertAdjacentHTML('beforebegin',`<div class="_gap_" style="height:${pageGapH+offsetTop-topOffset1}px;"> </div>`);
    }
    let btmOffset = rect.bottom - top; 
    let btmOffset1 = btmOffset % pageH; 
    
    // 节点跨越两页时, 添加偏移元素 
    // 暂时不考虑一页无法放下一个节点的情况 
    if (btmOffset1-topOffset1<0) {
      let offset = topOffset2 + offsetTop; 
      // console.log( rect, offset );
      el.insertAdjacentHTML('beforebegin',`<div class="_offset_" style="height:${offset}px;"> </div>`);
    }
    
    offsetEl(els,idx+1)
  } 
  offsetEl(elems,0,0);
  
} 





/* ================================== 测试 ================================== */
export function test(){
  
} 