
// 监听元素尺寸变化 
/* 
被监听的元素需使用 relative/absulte/fixed 定位 
注: 依赖 Chain 
*/
function listenResize(elem,callback,immediate=true){
  let injectElId = '__resize__';
  let injectElem = elem.querySelector('#'+injectElId);
  if (!injectElem) {
    injectElem = document.createElement("iframe"); // iframe | object 都可以 
    injectElem.setAttribute("style",
      `display: block;
      position: absolute;
      top: 0; 
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: none;
      pointer-events: none;
      z-index: -1; `
    );
    injectElem.setAttribute("id",injectElId);
    // // object 元素的设置
    // injectElem.type = 'text/html'
    // injectElem.data = 'about:blank';
    elem.appendChild(injectElem);
  }
  
  let resizeElem = injectElem.contentWindow;
  
  resizeElem.addEventListener("resize",function(evt){
    callback({
      width: injectElem.clientWidth,
      height: injectElem.clientHeight,
    })
  })
  immediate && resizeElem.dispatchEvent(new Event('resize'));
}
export default listenResize;
/* 
listenResize(elem)
.then(([evt])=>{
  console.log(evt);
})
*/

