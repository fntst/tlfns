
/** 文本复制 
  * Describe: 文本复制 
  * @Params:  text str,待复制的文本  
  * @Return:  Promise->(txt)/(err),返回复制是否成功的pms 
    txt  str,复制成功的文本 
    err  str,失败的提示文本 
  */
let copyText = (function(){
  // 获取用于复制的 textarea [input无法复制换行符] 
  let copyElem = document.createElement("textarea");
  copyElem.style = `
    display:none;
    position: fixed;`;  // 防止引起DOM变动 
  document.body.appendChild(copyElem); // 需插入DOM中才能复制生效 
  
  return function(text){
    let txt = text||'请传入 \n需复制的文本';
    copyElem.value = txt; // 存入待复制的值 
    copyElem.style.display = 'block'; // 复制的内容不可隐藏 
    copyElem.select();  // 选中文本 
    // window.getSelection().selectAllChildren(copyElem); // 选中文本   
    let isCopied = document.execCommand('copy');  // 执行复制 
    copyElem.style.display = 'none';  // 复制后隐藏 
    
    if (isCopied) {
      return Promise.resolve(txt);
    }
    else {
      return Promise.reject('copy fail');
    }
  };
  // // 需手动执行,否则复制失败 
  // btn.onclick = function(){ }
})();
export default copyText;

/* Example:  
  import copyText from "";
  copyText('123123')
  .then(txt=>{ })
  .catch(err=>{ console.warn(err); });
*/
















