// 




Function.prototype.call = function(context,...args){
  context.__call_fn__ = this;
  let result = context.__call_fn__(...args);
  delete context.__call_fn__;
  return result;
}


/* ===================================================================== 测试 */
export function test(){
  
  Array.prototype.forEach.call(['a','b','c'], (itm,idx)=>{
    console.log(idx, itm);
  })
  
} 









