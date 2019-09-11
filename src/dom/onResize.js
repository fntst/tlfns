
/* 
监听元素尺寸变化 
  默认的只有 window 存在'resize'事件,故元素无法通过'resize'事件来监听尺寸变化 
  在需要监听的元素内放置一<object>或<iframe>元素,并占满该元素 
  通过监听<object>或<iframe>的'window'的'resize'事件来间接对该元素进行监听 
  
PS: 被监听的元素需使用 relative/absulte/fixed 定位 
*/
function onResize(elem,callback,immediate=true){
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
export default onResize;
/* 
onResize(elem)
.then(([evt])=>{
  console.log(evt);
})
*/

