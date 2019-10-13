/* 计算两个元素间的偏移量 */


/* 获取元素1到元素2的偏移量 */
/* 
function getOffset(elem,wpElem,{preTop,preLft}){
  // 可能存在bug: 当elem直接相对wpElem的上层元素定位时,将出错 
  if ( elem.offsetParent===wpElem || elem.parentElement===wpElem ) {
    return { 
      top: preTop + elem.offsetTop, 
      lft: preLft + elem.offsetLeft, 
    }
  }
  else {
    return getOffset(elem.parentElement,wpElem,{
      preTop: preTop + elem.offsetTop,
      preLft: preLft + elem.offsetLeft,
    }); 
  }
}
*/
function getOffset(elem1,elem2){
  let bcr1 = elem1.getBoundingClientRect()
  let bcr2 = elem2.getBoundingClientRect()
  return {
    top: bcr1.top-bcr2.top,
    lft: bcr1.left-bcr2.left,
  }
}


export default getOffset;



