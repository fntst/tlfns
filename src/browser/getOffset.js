
/*** 计算两个元素间的偏移量 
* @params  elem1  Element,
* @params  elem2  Element,
* @return  obj,差值的对象表现 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
* 01 详细说明1 
* -----------------------------
* @update  
* 时间值 更新说明 
*/
export default function getOffset(elem1,elem2){
  let bcr1 = elem1.getBoundingClientRect()
  let bcr2 = elem2.getBoundingClientRect()
  return {
    top: bcr1.top-bcr2.top,
    lft: bcr1.left-bcr2.left,
  }
};
/* 方式2: 获取元素1到元素2的偏移量 
function getOffset(elem,wpElem,{preTop,preLft}){
  // 可能存在bug: 当elem直接相对wpElem的外层层元素定位时,将出错 
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


/* 测试 */
export function test(){
  // 创建DOM 
  document.body.insertAdjacentHTML("beforeend",`
  <div id="div1"> </div>
  <div id="div2"> </div>
  
  <button id="btn1" type="button">获取</button>
  <div class="div"> </div>
  <style >
    .div { height: 200vh; }
    #btn1 {
      position: fixed;
      top: 0; 
      right: 0; 
    }
    #div1,#div2 {
      position: absolute;
      top: 399px;
      left: 0;
      width: 100px;
      height: 100px;
      background-color: green;
    }
    div#div2{
      top: 100px;
      left: 100px;
      background-color: red;
    }
  </style>
  `)
  
  btn1.addEventListener("click",function(evt){
    
    console.log(getOffset(div1,div2));
    console.log(getOffset(div1,document.documentElement));
    console.log(getOffset(div2,document.documentElement));
    console.log(div2.getBoundingClientRect().top);
  })
  
} 
