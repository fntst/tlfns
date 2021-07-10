

// 回调改为promise调用 
module.exports = function promise(target,...args){  
  return new Promise((resolve,reject)=>{
    let fn = (...cbArgs)=>Promise.resolve(...cbArgs);
    let rst = target(...args, function(...cbArgs){
      if ( cbArgs[0] ) {
        fn = (arg)=>Promise.reject(arg);
        resolve( fn(cbArgs[0]) );
        return ;
      }
      
      resolve( fn(...cbArgs.slice(1)) );
    });
  });
  
};

// 使用说明 
// promise(fs.readFile.bind(fs),path).then((data)=>{
// 
// })
// .catch((err)=>{ 
//   console.warn(err);
// });
