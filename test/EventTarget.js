/* 测试  EventTarget
document.addEventListener("click",function(evt){
  console.log('document click',evt);

})
// document.addListener("click",function(evt){
//   console.log('document click');
// },0)
setTimeout(function(){
  console.log('setTimeout run');
  document.emitListeners('click',{key1: 1231231,});
  // document.offListeners('click')
},5000)
*/
