/* Node中加载引用 es module 文件 
实现方法: 
  加载 ems 文件 xx.js 将 export 等关键字替换成 module.exports, 
  然后生成 xx-_-.js 文件进行 require 加载返回 [可配置 .gitignore *-_-.js 来忽略缓存文件 ] 
说明: 
  优化方案: xx_.js 文件中写入 origin_file_hash 以便缓存对比 
  'R_ESM_F' 作为代码变更的表示
  文件加载使用同步模式,保证代码的加载优先[符合 require 语法]
TODO: 
  待完善所有 es module 的加载导出语法的处理 
*/

// 相关细节配置 
const config = {
  /* 前缀和后缀不可同时为空 */
  prefix: '',  // 转换后的文件的前缀 
  suffix: '-_-',   // 转换后的文件的后缀 
  check_cfg(){
    if ( this.prefix=='' && this.suffix=='') { 
      throw new Error(" ############# 文件名称命名存在问题请修改! ############# ") 
    }
  },
}
config.check_cfg();
// console.log(' ################## require_esmodule_file_file ################## ');

const pathMd = require("path");
const fs = require("fs");
const crypto = require('crypto');

function getFileHash(fsData){
  let fsHash = crypto.createHash('sha256');
  fsHash.update(fsData);
  return fsHash.digest('hex');
} 
function dealFileData(fileStr, path){
  
  fileStr = dealExport(fileStr);
  
  fileStr = dealImport(fileStr, path);
  
  fileStr = `/* R_ESM_F+++ */ \n/* origin_file_hash:${getFileHash(fileStr)} */\n\n` + fileStr;
  return fileStr;
} 
function dealExport(fileStr){
  // 处理 export default function xxx
  // 处理 export default class xxx
  let defaultName = fileStr.match(/export\s+default\s+(?:function\s+|class\s+)(\w+).+/) || [];
  defaultName = defaultName[1]
  if (defaultName) { 
    fileStr = fileStr.replace(/\bexport\s+default\b\s+(\w+)/msg, '/* R_ESM_F--- */ \n/* export default */ $1')
    fileStr += `/* R_ESM_F+++ */ \nmodule.exports.default = ${defaultName};\n\n`
  }
  // 处理 export default xxx
  else {
    let defaultName1 = fileStr.match(/export\s+default\s+(\w+).+/) || [];
    defaultName1 = defaultName1[1]
    if (defaultName1) { 
      fileStr = fileStr.replace(/\bexport\s+default\b\s+(\w+)\;?/msg, '/* R_ESM_F--- */ \n/* export default $1; */')
      fileStr += `/* R_ESM_F+++ */ \nmodule.exports.default = ${defaultName1};\n\n`
    }
  }
  
  // 处理 export function 
  let exportFnNames = fileStr.match(/(?<=export\s+function\s+)\w+/msg);
  if ( exportFnNames && exportFnNames.length>0 ) {
    fileStr = fileStr.replace(/\bexport\s+(?!default)/msg, '/* R_ESM_F--- */ \n/* export */');
    exportFnNames.forEach(itm=>{
      fileStr += `/* R_ESM_F+++ */ \nmodule.exports.${itm} = ${itm};\n`
    })
  }
  
  // 处理 export { xx1:xx2, xx, }
  let exportName = /(?:export\s+)(\{.+?\})\;?/msg.exec(fileStr) || [];
  exportName = exportName[1]
  if ( exportName ) {
    fileStr = fileStr.replace(/(export\s+\{.+?\}\;?)/msg, '/* R_ESM_F--- */ \n/* $1 */');
    fileStr += `/* R_ESM_F+++ */ \nmodule.exports = ${exportName};\n`
  }
  
  return fileStr;
}
function dealImport(fileStr, path){
  let isNeedREM = false; 
  
  // 处理 import xx from "./xx.js";
  let importNames = fileStr.match(/import\s+(\w+)\s+from\s+[\"\'](.+?)[\"\']/mgs) 
  if ( importNames && importNames.length>0 ) {
    fileStr = fileStr.replace(/(import\s+\w+\s+from\s+[\"\'].+?[\"\'])\;?/mgs,'/* R_ESM_F--- */ \n/* $1 */') 
    
    importNames.forEach(itm=>{
      let str = itm.replace(/import\s+/, '')
      let arr = str.split(/\s+from\s+/)
      fileStr = `/* R_ESM_F+++ */ \nconst ${arr[0]} = require_esmodule_file(${arr[1]}).default;\n` + fileStr;
    })
    
    isNeedREM = true; 
  }
  
  // 处理 import "./xx.js";
  let imports = fileStr.match(/import\s+[\"\'](.+?)[\"\']/mgs) 
  if ( imports && imports.length>0 ) {
    fileStr = fileStr.replace(/(import\s+[\"\'].+?[\"\'])\;/mgs,'/* R_ESM_F--- */ \n/* $1 */') 
    
    imports.forEach(itm=>{
      let str = itm.replace(/import\s+/, '')
      fileStr = `/* R_ESM_F+++ */ \nrequire_esmodule_file(${str}).default;\n` + fileStr;
    })
    
    isNeedREM = true; 
  }

  // 引入 require_esmodule_file 处理递归 es module 的引入问题 
  if (isNeedREM) {
    let relativePath = pathMd.relative(path, __dirname)
    relativePath = relativePath.replace(/\\/g,'/'); 
    relativePath = relativePath.slice(1)
    relativePath = `${relativePath}/require_esmodule_file.js`
    fileStr = `/* R_ESM_F+++ */ \nconst require_esmodule_file = require("${relativePath}")(__dirname);\n\n\n` + fileStr;
  }
  
  return fileStr;
}

module.exports = function(dirname){
  return function (path){
    path = pathMd.resolve(dirname, path)
    let pathObj = pathMd.parse(path);
    let newPath = `${pathObj.dir}\\${config.prefix}${pathObj.name}${config.suffix}${pathObj.ext}`;
    
    let fileDataStr = fs.readFileSync(path, { encoding: 'utf-8', })
    if ( !fs.existsSync(newPath) ) {
      // console.log(' ###文件不存在写入文件: ', newPath);
      fs.writeFileSync(newPath, dealFileData(fileDataStr, path));
      return require(newPath);
    }
    
    let newFileDataStr = fs.readFileSync(newPath, { encoding: 'utf-8', })
    let hashPre = newFileDataStr.match(/(?<=origin_file_hash:)([\w0-9]+?)\s/) || [];
    hashPre = hashPre[1]
    let hashNow = getFileHash(fileDataStr);
    if ( hashPre!==hashNow ) {
      // console.log(' ###文件过旧,写入文件: ', newPath);
      fs.writeFileSync(newPath, dealFileData(fileDataStr, path));
      return require(newPath);
    }
    
    // console.log(' ###存在最新的文件: ', newPath);
    return require(newPath);
  }
}

/* 使用:
  const require_esmodule_file = require("../require_esmodule_file.js")(__dirname)
  const xxx = require_esmodule_file('../xx/xxx.js')
*/


