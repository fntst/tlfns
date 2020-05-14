// 

import './call.js'; // 依赖项  

Function.prototype.bind = function(context,...args){
  let that = this;
  return function(...args1){
    return that.call(context,...args,...args1); 
  };
}


/* 测试 */
// fn.bind(context,arg1);
// 
// context.fn(arg1)











