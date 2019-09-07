// Object 扩展

// // 直接定义原型 for-in时,将会遍历
// Object.prototype.forEach = function(callback){
//   for(var key in this){
//     callback(this[key],key);
//   };
// }
// /* obj.forEach((val,key)=>{ }) */
// Object.prototype.map = function(callback){
//   let newObj = {};
//   this.forEach((val,key)=>{
//     newObj[key] = callback(val,key);
//   })
//   return newObj
// }
// /* 
//   obj.map((key,val)=>{ 
//     return 1;
//   })
// */
// Object.prototype.filter = function(callback){
//   let newObj = {};
//   this.forEach((val,key)=>{
//     callback(val,key) && (newObj[key] = val);
//   })
//   return newObj
// }
// /* 
//   obj.map((key,val)=>{ 
//     return 1;
//   })
// */

Object.defineProperty(Object.prototype,'forEach',{
  value(callback){
    for(var key in this){
      callback(this[key],key);
    };
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})
Object.defineProperty(Object.prototype,'map',{
  value(callback){
    let newObj = {};
    this.forEach((val,key)=>{
      newObj[key] = callback(val,key);
    })
    return newObj;
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})
Object.defineProperty(Object.prototype,'filter',{
  value(callback){
    let newObj = {};
    this.forEach((val,key)=>{
      callback(val,key) && (newObj[key] = val);
    })
    return newObj;
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})
Object.defineProperty(Object.prototype,'reduce',{
  value(callback,initVal){
    // 由于对象是无序的,无法类似数组从第二项开始 
    if (initVal===undefined) { return console.error('请指定初始值'); }
    
    let finalVal = initVal;
    this.forEach((val,key)=>{
      finalVal = callback(finalVal,val,key)
    })
    
    return finalVal;
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})
Object.defineProperty(Object.prototype,'some',{
  value(callback){
    for(var key in this){
      if (callback(this[key],key)) { return true; }
    };
    
    return false;
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})
Object.defineProperty(Object.prototype,'every',{
  value(callback){
    for(var key in this){
      if (!callback(this[key],key)) { return false; }
    };
    
    return true;
  },         
  enumerable: false,  
  writable: true,     
  configurable: true, 
})


