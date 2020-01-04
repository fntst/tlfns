
const { Pledge, Chain, Callthen } = require("../index.js");




/* 测试 Callthen 
// new Callthen(document.addEventListener,['click'])
*/
new Callthen(process.stdin.on.bind(process.stdin),['data'])
.then(function(data){
  console.log('then1',data);

  this.done('aaa');
  this.call(2);
  setTimeout(()=>{
    this.call(1111);
    //this.call(1);
  },1000)
})
.then(function(data){
  console.log('then2',data);
  this.call(3);
})
.then(function(data){
  console.log('then3',data);
  setTimeout(()=>{
    this.call(4)
  },1000)
})
.then(function(data){
  console.log('then4',data);
})
.over(function(err){ 
  console.log('over1',err);
});



/* 测试 Chain 
new Chain(process.stdin.on.bind(process.stdin),['data'],[true])
.then(([evt])=>{
  console.log(evt);
  // return 'bbb';
  return new Pledge((resolve,reject)=>{
    setTimeout(()=>{
      resolve('aaa')
    },2000)
  })
})
.then((data)=>{
  console.log(data);
})
*/




/* 测试 Pledge 
new Pledge(function(resolve,reject){
  reject(222);
  setTimeout(function(){
    resolve(111);
  },1000)
})
.then(data=>{
  console.log('then1',data);
  return 't1'
})
.catch(err=>{
  console.log('catch1',err);
  return 'c1'
})
.then(data=>{
  console.log('then2',data);
  return new Pledge(function(res,rej){
    setTimeout(function(){
      res( Pledge.reject(333) )
    },1000)
  })
})
.catch(err=>{
  console.log('catch2',err);
})
.then(data=>{
  console.log('then3',data);
})
*/
// catch1 222 -> then2 c1 
// --> then1 111 -> then2 t1 
// -> catch2 333 -> then3 undefined 
// -> catch2 333 -> then3 undefined 




