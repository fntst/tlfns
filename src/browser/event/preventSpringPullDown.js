/* ** 阻止元素下拉弹性效果 
*/

export default function preventSpringPullDown(scrollElem){
  if ( !scrollElem ) { return console.error('undefined scroll elem'); }
  
  
  let preY = null; 
  scrollElem.addEventListener("touchstart", (evt)=>{
    evt.currentTarget.style.overflowY = 'auto';
    let toucher = evt.changedTouches[0] || {};
    preY = toucher.pageY; 
  })
  scrollElem.addEventListener("scroll", (evt)=>{
    if ( evt.currentTarget.scrollTop <= 1 ) {
      evt.preventDefault(); 
      evt.currentTarget.scrollTop = 0; 
      evt.currentTarget.style.overflowY = 'hidden';
      Promise.resolve().then(()=>{ evt.currentTarget.style.overflowY = 'auto'; })
    }
    
  })
  scrollElem.addEventListener("touchmove", (evt)=>{
    let toucher = evt.changedTouches[0] || {};
    let nowY = toucher.pageY; 
    let isPullDown = nowY - preY > 0;
    preY = nowY;
    if ( !isPullDown ) { return ; }
    
    if ( evt.currentTarget.scrollTop <= 1 ) {
      evt.preventDefault(); 
      evt.currentTarget.scrollTop = 0; 
      evt.currentTarget.style.overflowY = 'hidden';
    }
    else {
      
    }
    
    
  })
  scrollElem.addEventListener("touchend", (evt)=>{
    evt.currentTarget.style.overflowY = 'auto';
    if ( evt.currentTarget.scrollTop <= 1 ) {
      evt.currentTarget.scrollTop = 0; 
      evt.preventDefault(); 
    }
  })
  
} 




/* ------------------------------------------------------------------- 测试 */
export function test(){ 
  let scrollWrap = document.createElement("div");
  scrollWrap.setAttribute("class",`scroll-wrap`);
  let styleElem = document.createElement("style");
  styleElem.textContent = `
    .scroll-wrap {
      position: fixed;
      top: 0; 
      left: 0; 
      border: 3px solid red;
      height: 100vh;
      width: 88vw;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .scroll-content {
      margin: auto;
      height: 30vh; 
      width: 50%; 
      background-color: #ccc;
      border: 3px solid blue;
    }
    
  `
  document.body.appendChild(styleElem);
  document.body.appendChild(scrollWrap);
  new Array(5).fill('').forEach((itm,idx)=>{
    let scrollConent = document.createElement("div");
    scrollConent.setAttribute("class",`scroll-content`);
    scrollWrap.appendChild( scrollConent );
  })
  
  
  setTimeout(()=>{
    preventSpringPullDown( scrollWrap )
    
    
  })
} 
