import tlfns from "../src/index.js";
const {
  LocalFiles,
  StateManager,
} = tlfns;

// console.log(tlfns);

let button1 = document.getElementById("button1");
let div1 = document.getElementById("div1");


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

/* 测试 LocalFiles 
let localFiles = new LocalFiles({
  base64: true, 
});
button1.addEventListener("click",function(evt){
  localFiles.pick()
  .then(list=>{
    console.log(list);
  });
})
localFiles.onDrop(div1,function(data){
  console.log(data);
})
*/


/* test Object 
let obj = { key1: 1, key2: 2 }
let obj1 = obj.map((val,key)=>{
  if(val===1){ return 100; }
  return val;
})
console.log(obj1);
*/



/* test StateManager */
// 初始化配置  
let stMg = new StateManager([ 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', ],{
  hd1: true,   // 操作1   
  // 使用函数则可更具有扩展性,但请节制的使用,否则适得其反 
  hd2(arg){    // 操作2 
  },  
  hd3: '999',  // 操作3 
  hd4: false,  // 操作4  
  hd5(){       // 操作5 
    // 
  }, 
  hd6: '01',   // 操作6 
});
stMg.setter(['hd1','hd2'],{ 
  aa: '01', 
  bb: '02', 
})
stMg.setter(['hd1','hd3'],{ 
  dd: '01', 
  bb: '02', 
})

// console.log(stMg);

button1.addEventListener("click",function(evt){
  console.log(
    stMg.getter('hd3',{ aa: '01', bb: '02', })
  );
  
  
})

// // 针对于使用vue的项目,若使用了vuex,则可将该功能集成到 store 中 
// stMg.install(vm.$store,'stateManager');  // 注册到store中 
vm.$store.getters['stateManager/query']('hd2',{
  aa: '01',
  bb: '02',
})('abc')


