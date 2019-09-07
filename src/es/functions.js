// js 工具 



// 函数内获取当前函数的名称 [函数内执行当前函数] [严格模式下可用] 
export function getThisFnName(){  
  let _callerName; 
  try{ _callerName = arguments.callee.caller.name; }
  catch(err){ 
    let rgep = /(\w+)@|at (\w+) \(/g;
    rgep.exec(err.stack);
    let names = rgep.exec(err.stack);
    _callerName = names[1] || names[2];
  }
  return _callerName;
}
/* 测试 
;(function(){
  'use strict';
  function fn1(arg) {
    if ( arg===1 ) {
      console.log(' ============= ');
      return ;
    }
    eval(`${getThisFnName()}(1)`)
    console.log('run', arg);
  }    
  fn1();
})();
*/

// 函数节流:限制函数执行频率 
export function throttle(fn,context,time=600){  
  /*Input:
  -  fn       // [高频]执行的函数 
  -  context  // 函数执行的上下文 
  -  time=600 // num,限制的频率,单位:ms  
  * Output: undefined
  */

  if(!fn._1_){
    fn._1_ = setTimeout(function(){
      fn.call(context);
      fn._1_ = false;
    },time)
  }
}
















