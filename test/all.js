import tlfns from "../src/index.js";
const {
  LocalFiles,
} = tlfns;

// console.log(tlfns);

let button1 = document.getElementById("button1");
let div1 = document.getElementById("div1");




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


let localFiles = new LocalFiles();
button1.addEventListener("click",function(evt){
  localFiles.pick()
  .then(list=>{
    console.log(list);
  });
})
localFiles.onDrop(div1,function(data){
  console.log(data);
})



let obj = { key1: 1, key2: 2 }
let obj1 = obj.map((val,key)=>{
  if(val===1){ return 100; }
  return val;
})
console.log(obj1);
