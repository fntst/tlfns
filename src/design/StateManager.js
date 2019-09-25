/* 
状态<=>控制 条件配置化 
场景: 
  当业务复杂,一个功能是否可用或一个UI元素的显示控制或逻辑操作,需要多个状态/条件值来确定,
  而大量存在该场景时,若每次都条件来组合判断,冗余且逻辑散落未集中管理,导致开发、维护困难 
  
  场景需求: 多对多, 多个条件对多个操作 
  对象存储: 一对多, 多个条件合并为一个对应多个操作 
  对象查询: 多对一, 多个条件合并为一个查询指定一个操作 
解决方案: 
  将需要组合的条件配置化,集中管理,
  通过一函数传入条件来进行判断, 
*/


class StateManager {
  constructor(conditionList) {
    
    // 配置表,用于存储条件对应的操作 
    this._conditionHandleMap = {
      // 'aa:02,bb:03,cc:*,dd:*,ee:!01': {
      //   hd1: true, 
      //   hd2(arg){}, 
      // },
    },
    
    // 所有可能的判断条件,未枚举的将被忽略  
    this._conditionList = conditionList;
    
    // 针对于使用vue的项目,若使用了vuex,则可将该功能集成到 store 中 
    let that = this;
    this._store = {
      state: {
        conditionHandleMap: that._conditionHandleMap,
      },
      getters: {
        // 通过可传参的getters来获取 条件对应的操作 
        query({conditionHandleMap},getters){
          return function(handle,conditionMap){
            return that.getter(handle,conditionMap)
          }
        },
      },
      namespaced: true,
    }
  }
  
  // 将对象转换为字符串,定义 key,使用同一的字符长度 
  _getKey(conditionMap){
    return this._conditionList.reduce((retVal,itm)=>{ 
      let val = conditionMap[itm]?conditionMap[itm]:'*'; 
      if (val instanceof Array) { val = val.join('/') }
      return  retVal+itm+":"+val+','
    },'').slice(0,-1) 
  }
  // 将字符串还原为对象 
  _getObj(key){
    let obj = {};
    key.split(',').forEach((itm,idx )=>{
      let arr = itm.split(':');
      obj[arr[0]] = arr[1];
    });
    return obj;
  }
  // 条件集合包含关系判断: 条件少包含条件多 
  _objIncludes(pObj,cObj){
    // { key1:1, } 相当于 { key1:1, key2: <*>, } 包含 { key1: 1, key2: 2, } 
    let bol = true; // 空对象{} 包含任意对象  
    
    for(var key in pObj){
      let val1 = pObj[key];
      // 查询的条件 未定义则表示为任意值 
      let val2 = cObj[key] || '*'; 
      
      // 配置的条件: * 任意 
      if (val1==='*') { continue; }  
      // 配置的条件: ! 非 
      if (val1[0]==='!') {
        val1 = val1.slice(1);
        // 无法确定包含关系,即不包含,直接跳出 
        if (val2==='*') {
          bol = false; 
          break;
        }
        if (val1===val2) { 
          bol = false; 
          break;
        }
        continue;
      }
      // 配置的条件: [] 数组 
      if (val1.includes('/')) {
        val1 = val1.split('/')
        // 无法确定包含关系,即不包含,直接跳出 
        if (val2==='*') {
          bol = false; 
          break;
        }
        
        if (!val1.includes(val2)) { 
          bol = false; 
          break;
        }
        continue;
      }
      // 配置的条件: 其他 
      if ( val2==="*" || val1!==val2 ) { 
        bol = false; 
        break;
      }
    };
    
    return bol;
  }
  
  /* 初始化操作条件配置: 
  当情况过于复杂,如判断的条件可能个数不同,导致手动定义不便,而采用函数来简化 
  */
  // 单条设置 
  setter(conditionMap,handleMap){
    let key = this._getKey(conditionMap);
    this._conditionHandleMap[key] = { ...handleMap, };
  }
  // 集中设置 
  setConfigs(configList){
    configList.forEach((itm,idx)=>{
      this.setter(itm[0],itm[1]);
    });
  }
  
  // 查询 条件对应的操作的值  
  getter(handle,conditionMap){
    let result = undefined;
    for(var key in this._conditionHandleMap){
      let val = this._conditionHandleMap[key];
      let obj = this._getObj(key)
      if ( this._objIncludes(obj,conditionMap) ) {
        result = val[handle];
        break;
      }
    };
    return result;
  }
  
  install(store,mdName='stateManager'){
    store.registerModule(mdName,this._store)
  }
}


export default StateManager;


/* TODO: 
  条件添加功能 [], 表示条件的多个值 
*/