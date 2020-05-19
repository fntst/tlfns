

import checkType from "./type.js";

/*** 检视 对象成员 
* @params  objVal  obj,待检测的对象
* @return  obj,对象的成员属性等信息 
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
export default function viewObject(objVal){
  return {
    type: checkType(objVal),
    constructor: objVal.constructor.name,
    members: getObjKeys(objVal),
  };
};


/*** 检视 类/构造函数的方法&属性等 
* @params  clsVal  Cls,待检测的构造函数 
* @return  obj,构造函数相关的属性/方法  
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
export function viewConstructor(clsVal){
  let members = [];
  try { members = getObjKeys( new clsVal() ) } 
  catch (e) { members = ['获取报错']; } 
  
  let proto = clsVal.prototype.__proto__;
  return {
    type: checkType(clsVal),
    extend: proto ? proto.constructor.name : proto,
    statics: getObjKeys( clsVal ),
    protos: getObjKeys( clsVal.prototype ),
    members,
  };
};



/* 工具函数: 获取对象的键值 */
function getObjKeys(checkObj){
  let _members = []
  let keys = Object.getOwnPropertyNames(checkObj) 
  let _resultArr = keys.map(function(itm,idx ){
    let itm1 = '' 
    try { itm1 = checkObj[itm] } 
    catch(e){ itm1 = '___' } 
    
    let map = {
      function: {
        key(arg){ return arg; },
        rst(arg){ return 'fn'},
      },
      object: {
        key(arg){ return arg; },
        rst(arg){ return 'obj'},
      },
      string: {
        key(arg){ return arg; },
        rst(arg){ return '\''+arg+'\''},
      },
      // number boolean 
      default: {
        key(arg){ return arg; },
        rst(arg){ return arg},
      },
    }
    
    let current = map[typeof itm1] || map.default;
    itm = current.key(itm);
    itm1 = current.rst(itm1);
    
    try { _members.push( { key: itm, rst: itm1, } ) } 
    catch (e) { _members.push({ key: '-', rst: '-', }) } 
  }) 
  return _members.sort((i1,i2)=>{
    return i1.key.charCodeAt(0)-i2.key.charCodeAt(0)
  });
};





// 测试 
export function test(){
  console.log( viewObject({}) );
  console.log( viewConstructor(Object) );
} 

