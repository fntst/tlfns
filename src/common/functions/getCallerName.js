/*** 获取当前执行函数的名称 [函数内执行当前函数] [严格模式下可用] 
* @params  / 
* @return  str,获取到的函数名 
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
export default function main(){
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



/* ================================== 测试 ================================== */
export function test(){  
  'use strict';
  function fn1(arg=0) {
    if ( arg===1 ) { return console.log('run', arg); }
    
    eval(`${main()}(1)`)
    console.log('run', arg);
  }    
  fn1();
  
  console.log( '#当前执行的函数名为: ', main() );
}

