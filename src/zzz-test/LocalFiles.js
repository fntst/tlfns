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
