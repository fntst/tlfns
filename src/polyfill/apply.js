// 

import './call.js'; // 依赖项  

Function.prototype.apply = function(context,argList){
  return this.call(context,...argList);
}


/* 测试 
fn.apply(context,argList);
*/








