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

// 防抖: 操作后的一段时间内只执行一次,触发操作将重新计算时间 
function debounce(fn,time=500){
  let timeoutId = null; 
  return function(){
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(()=>{
      fn.apply(this, arguments);
    },time);
  };
}

// 节流: 限制函数执行频率 
export function throttle(fn,time=500){  
  let isRun = true; // 控制执行 
  return function(){
    if (!isRun){return;}  
    isRun = false; 
    
    setTimeout(()=>{ 
      fn.apply(this,arguments);
      isRun = true;
    },time);
  };
}
















