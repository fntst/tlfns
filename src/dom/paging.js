



/** 网页自动分页 
  * Describe: 自动分页, 功能额待完善 
  * @Params:  root       Node,页面的最外层 
  * @Params:  elems      Node数组,需要监控是否分页的节点集合 
  * @Params:  pageH      num,一页的高度 
  * @Params:  offsetTop  num,划分到下一页后距离页眉的距离 
  * @Return:  / 
  */
function paging(root,elems,pageH,offsetTop){
  let top = root.getBoundingClientRect().top;
  elems.forEach(itm=>{
    let rect = itm.getBoundingClientRect();
    let topOffset = rect.top - top; 
    topOffset %= pageH; 
    let btmOffset = rect.bottom - top; 
    btmOffset %= pageH; 
    // 暂时不考虑一页无法放下一个节点的情况 
    if (btmOffset-topOffset<0) {
      let offset = pageH - topOffset + offsetTop ; 
      itm.insertAdjacentHTML('beforebegin',`<div style="height:${offset}px;"> </div>`)
    }
    
  })
} 

export default paging; 

