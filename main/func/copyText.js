/*** 文本复制 
* @params  text str,待复制的文本  
* @return  Promise->(txt)/(err),返回复制是否成功的pms 
*   txt  str,复制成功的文本 
*   err  str,失败的提示文本 
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
let copyText = (function(){
  // 获取用于复制的 textarea [input无法复制换行符] 
  let textContainer = document.querySelector("#_zkits_textContainer");
  if (!textContainer) {
    textContainer = document.createElement("textarea");
    textContainer.id = '_zkits_textContainer';
    textContainer.style = ` display:none;
    /* 防止引起DOM变动  */
    z-index: -1;
    position: fixed; `;  
    document.body.appendChild(textContainer); // 需插入DOM中才能复制生效 
  }
  
  return function(text){
    let txt = text||'请传入 \n需复制的文本';
    textContainer.value = txt; // 存入待复制的值 
    textContainer.style.display = 'block'; // 复制的内容不可隐藏 
    textContainer.select();  // 选中文本 
    // window.getSelection().selectAllChildren(textContainer); // 选中文本   
    let isCopied = document.execCommand('copy');  // 执行复制 
    textContainer.style.display = 'none';  // 复制后隐藏 
    
    if (isCopied) { return Promise.resolve(txt); }
    
    return Promise.reject('#zkits: copy failed!');
  };
})();
export default copyText;






/* 测试 ===================================================================== */
export function test(){
  document.body.insertAdjacentHTML("beforeend",`
  <button id="btn1">copyText: 复制的文本</button>
  `)
  
  // 需手动执行,否则复制失败 
  btn1.addEventListener("click",function(evt){
    copyText('复制的文本')
    .then(txt=>{ 
      console.log('复制成功:', '复制的文本');
    })
    .catch(err=>{ console.warn(err); });
  })
  
} 



