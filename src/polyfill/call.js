// 




Function.prototype._call = function(context,...args){
  context.__call_fn__ = this;
  let result = context.__call_fn__(...args);
  delete context.__call_fn__;
  return result;
}


/* 测试 */
// fn.call(context,arg1)









