
/*** 检测值类型  
* @params  checkVal  any,待检测类型的值 
* @return  KW,值的类型 
*   'undefined' 'null' 'NaN' 
*   'Boolean' 'Number' 'String' 'Function' 
*   'Array' 'Date' 'Regexp' ... 'Object' 
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
let typeOfMap = {
  boolean: 'Boolean',
  number: 'Number',
  string: 'String',
  function: 'Function',
  object: 'Object',
}
export default function main(checkVal){
  // 特殊值检测 
  if (checkVal===null) { return 'null'; }
  else if (checkVal===undefined) { return 'undefined' }
  else if (Number.isNaN(checkVal)) { return 'NaN'; }
  
  // typeof 检测 
  let typeOfVal = typeOfMap[ typeof checkVal ]
  if (typeOfVal!='Object') { return typeOfVal; }
  
  // 对象的具体类型检测 
  let objType = Object.prototype.toString.call(checkVal).slice(8,-1); 
  if (objType) { return objType }
  
  console.warn('注意: 未知类型')
  return '未知类型'
}



/*** 是否是对象  
* @params  checkVal  any,待检测的值 
* @return  bol,是否为对象类型的布尔值表示 
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
export function isObject(checkVal){
  if (checkVal===null) { return false; }
  
  let typeOfVal = typeof checkVal;
  if (typeOfVal==='function') { return true; }
  
  return typeOfVal==='object';
} 


/*** 是否为 NaN  
* @params  checkVal  any,待检测的值 
* @return  bol,是否为 NaN 的布尔值表示 
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
export function isNaN(val){ return Number.isNaN(val); } 








// 测试 
let map = {
  main: main,
  isObject: isObject,
  isNaN: isNaN,
}
export function test(fnName='main'){
  console.log( map[fnName]() );
  console.log( map[fnName]( undefined ) );
  console.log( map[fnName]( null ) );
  console.log( map[fnName]( NaN ) );
  console.log( map[fnName]( true ) );
  console.log( map[fnName]( false ) );
  console.log( map[fnName]( 0 ) );
  console.log( map[fnName]( 1 ) );
  console.log( map[fnName]( 11 ) );
  console.log( map[fnName]( '' ) );
  console.log( map[fnName]( '1' ) );
  console.log( map[fnName]( 'a' ) );
  console.log( map[fnName]( function(){ } ) );
  console.log( map[fnName]( Object) );
  console.log( map[fnName]( ()=>{} ) );
  console.log( map[fnName]( [] ) );
  console.log( map[fnName]( [1] ) );
  console.log( map[fnName]( ['a'] ) );
  console.log( map[fnName]( new Date() ) );
  console.log( map[fnName]( /1/ ) );
  console.log( map[fnName]( new RegExp() ) );
  console.log( map[fnName]( window ) );
  console.log( map[fnName]( {} ) );
  console.log( map[fnName]( {a:1,} ) );
  console.log( map[fnName]( new Object() ) );
} 


