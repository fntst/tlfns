/*** 用于删除文件夹及其下所有内容 // TODO:  
* @params  xxx  type,参数说明
* @return  type,返回值说明 
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

const path = require("path");
const fs = require("fs");

let {
  promise,
} = require("./utils.js");


let removePath = process.argv[2] || './dist';
removePath = path.join(__dirname,'../',removePath);

function delDir(pth){
  return promise(fs.readdir.bind(fs),pth)
  .then(paths=>{
    return new Promise((resolve,reject)=>{
      // console.log('1',pth);
      let num = 0;
      paths.forEach((pth1,idx1)=>{
        let currentPath = path.join(pth,pth1)
        promise(fs.stat.bind(fs),currentPath)
        .then(stats=>{
          if ( stats.isFile() ) {
            promise(fs.unlink.bind(fs),currentPath)
            .then(data=>{
              num++;
              if (num===paths.length) { 
                // console.log(11);
                resolve(currentPath); 
              }
            })
            .catch(err=>{
              console.warn(err);
            })
          }
          else if (stats.isDirectory()) {
            promise(fs.rmdir.bind(fs),currentPath) // 先作为空文件夹删除 
            // .then(data=>{ console.log('a1'); })
            .catch(err=>{
              return delDir(currentPath);
            })
            .then(data=>{
              // console.log('a2');
              num++;
              if (num===paths.length) { 
                // console.log(12);
                resolve(currentPath); 
              }
            })
          }
          else {
            console.log('aaaaa');
          }
        })
      })
    })
  })
  .then(pth1=>{
    let prePath = path.join(pth1,'../');
    console.log('删除目录:',prePath);
    return promise(fs.rmdir.bind(fs),prePath);  
  })
  .catch(err=>{
    console.warn(err);
  })
}

delDir(removePath)
.then(data=>{
  console.log(`================= ${removePath} cleaned ===================`);
})
.catch(err=>{
  console.warn(err);
})

















