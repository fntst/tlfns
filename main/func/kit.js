
/*** 读写localStorage任意深度的值 
* @params  keys   str,读写的键, 'aoo' 或 'aoo.boo' 等   
* @params  setVal any,可选,存在则为写,省略则为读 
* @return  undefined/arr/obj, 
-  读时,输出当前最深key对应的值,即使上层已不存在也不报错[返回undefined],但并未写入任何数据 
-  写时,输出当前key的所在的集合[对象/数组]  
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
* 01 详细说明1 
* -----------------------------
* @update  
* 时间值 更新说明 
* -----------------------------
* @todo  
* 待测试 
*/
export function storageOperate(keys, setVal){  
  let tmpArr = keys.split('.')
  let tmpLen = tmpArr.length 
  let firstKey = tmpArr[0]
  let lastKey = tmpArr[tmpLen-1] 
  // 根节点  
  let rootObj = JSON.parse( localStorage[firstKey] || JSON.stringify({}) )
  let parentObj = null   // 最底层节点的父节点   
  
  if (tmpLen - 2 <= 0) { parentObj = rootObj }
  else {
    var _shortArr = tmpArr.slice(1,tmpLen-1) // 去头尾 
    ,_switch = false  
    parentObj = _shortArr.reduce(function(retVal ,val ,idx ,arr){ 
      // 读取时,上层已为undefined时,直接返回undefined,后续不再执行节省开销 
      if ( setVal === undefined && _switch ) { return } 
      var _currentNd = retVal[val] 
      ,_typ = typeof _currentNd 
      ,_nextMb = arr[idx+1] 
      ,_val = null 
      if ( _typ === 'object' ) { // 存在对象类型 
        _val = _currentNd 
      }
      else  {                    // 未定义/原始类型 赋值为引用类型  
        _switch = true 
        _val = isNaN(parseInt(_nextMb)) ? {} : [] 
      }
      retVal[val] = _val  // retVal为返回的引用,赋值会改变 rootObj 
      return _val         // 最终的返回值将 parentObj 和 rootObj 产生了引用关系 
    },rootObj)
  }
  
  
  if ( setVal === undefined ) {  // 读 
    if ( !parentObj ) { return parentObj ; }
    else { return parentObj[lastKey]; }
  }
  else {                         // 写 
    parentObj[lastKey] = setVal // parentObj 和 rootObj 存在引用关系,间接改变了 rootObj 
    localStorage[firstKey] = JSON.stringify(rootObj)
    return parentObj ;
  }
}



