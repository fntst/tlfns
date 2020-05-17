
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
    type: [
      typeof objVal,
      Object.prototype.toString.call(objVal).slice(8,-1),
    ],
    construct: objVal.constructor.name,
    members: getObjKeys(objVal),
  };
};

/*** 检视 类/构造函数的方法&属性等 
* @params  cnstrct  Cls,待检测的构造函数 
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
export function viewConstructor(cnstrct){
  let members = [];
  try { members = getObjKeys( new cnstrct() ) } 
  catch (e) { members = ['获取报错']; } 
  
  let proto = cnstrct.prototype.__proto__;
  return {
    type: [ 
      typeof cnstrct, 
      Object.prototype.toString.call(cnstrct).slice(8,-1), 
    ],
    extend: proto ? proto.constructor.name : proto,
    statics: getObjKeys( cnstrct ),
    protos: getObjKeys( cnstrct.prototype ),
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
      'function': {
        key(arg){ return arg+'()'; },
        val(arg){ return ''},
      },
      'object': {
        key(arg){ return arg; },
        val(arg){ return 'obj'},
      },
      'string': {
        key(arg){ return arg; },
        val(arg){ return '\''+arg+'\''},
      },
      'boolean': {
        key(arg){ return arg; },
        val(arg){ return 'bol'},
      },
    }
    
    let current = map[typeof itm1] || {
      key(arg){ return arg; },
      val(arg){ return arg; },
    };
    itm = current.key(itm);
    itm1 = current.val(itm1);
    
    try { _members.push(`.${itm}  ${itm1}`) } 
    catch (e) { _members.push(`---`) } 
  }) 
  return _members;
};





// 测试 
export function test(){
  console.log( viewObject({}) );
  console.log( viewConstructor(Object) );
} 

