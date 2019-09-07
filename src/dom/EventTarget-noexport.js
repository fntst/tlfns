// EventTarget 扩展原生事件功能 

// 覆盖默认的事件绑定方式 
EventTarget.prototype._addEventListener = EventTarget.prototype.addEventListener; 
EventTarget.prototype.addEventListener = function(evtName,listener,options){
  // evtName       str,事件名称 
  // listener      fn,事件响应回调 
  // options       bol/obj,配置项 
  
  // 保存事件回调 
  if (!this.evtNameListenerMap) { this.evtNameListenerMap = {} }
  if ( !this.evtNameListenerMap[evtName] ) { this.evtNameListenerMap[evtName] = [] }
  this.evtNameListenerMap[evtName].push(listener)
  
  // 
  this._addEventListener(evtName,listener)
}
/* 
新增功能: 可立即触发一次回调  
*/
EventTarget.prototype.addListener = function(evtName,listener,immediateWay){
  /*  
    evtName       str,事件名称 
    listener      fn,事件回调 
    immediateWay  bol,可选,立即响应的方式,默认:不立即响应,0:原生触发方式,1:仅执行回调 
  */
  
  // 保存事件回调 
  if (!this.evtNameListenerMap) { this.evtNameListenerMap = {} }
  if ( !this.evtNameListenerMap[evtName] ) { this.evtNameListenerMap[evtName] = [] }
  this.evtNameListenerMap[evtName].push(listener)
  
  // 
  this._addEventListener(evtName,listener)
  
  // 立即触发 
  this.emitListeners(evtName,null,immediateWay);
}
/* 
新增功能: 可解决匿名函数无法解绑事件的问题 
*/
EventTarget.prototype.offListeners = function(evtName,listener){
  /*  
    evtName?   str,不存在则移除所有监听  
    listener?  fn,可选,存在则只移除当前事件,否则移除所有该类事件 
  */
  
  // 无事件绑定 
  if (!this.evtNameListenerMap) { return ; }
  
  // 无参数,默认移除所有事件 
  if (!evtName) {
    for(var key in this.evtNameListenerMap){
      let lsns = this.evtNameListenerMap[key];
      if (lsns && lsns.length>0) {
        lsns.forEach(fn=>this.removeEventListener(evtName,fn))
      }
    };
    this.evtNameListenerMap = {}
    return ;
  }
  
  let listeners = this.evtNameListenerMap[evtName]; 
  // 无该类事件绑定 
  if (!listeners) { return ; }
  
  // 未指定事件名,解绑该事件所有监听  
  if (!listener) {
    listeners.forEach(fn=>this.removeEventListener(evtName,fn));
    this.evtNameListenerMap[evtName] = [];
  }
  // 解绑指定事件 
  else {
    this.removeEventListener(evtName,listener)
    this.evtNameListenerMap[evtName] = listeners.filter(itm=>itm!==listener);
  }
}
/* 
新增功能: 
可自定义传递的数据; 
选择触发方式: 是否需要原始事件效果,或者只是执行响应回调 
*/
EventTarget.prototype.emitListeners = function(evtName,data,emitWay){
  /*  
    evt?      Event/str,可选,事件名称,不存在则触发所有事件的所有监听 
    data?     any,可选,传递的数据 
    emitWay?  0/1,触发方式,默认:0  
  */
  if (!this.evtNameListenerMap) { return ; }
  
  let evts = [];
  if (!evtName) {
    for(var key in this.evtNameListenerMap){ evts.push(key) };
  }
  else { evts.push(evtName) }
  
  let emitWayMap = {
    /* 原生触发方式,将获得原生事件效果 */
    0: (evtName)=>{ 
      evts.forEach((itm,idx)=>{
        let evt = new Event(itm);
        // 传递自定义数据, 不使用 data 字段,避免和原生事件的data冲突  
        evt.msg = data; 
        this.dispatchEvent(evt);
      });
    },
    /* 仅执行回调 */
    1: (evtName)=>{ 
      evts.forEach((itm,idx)=>{
        let evt = new Event(itm);
        // 传递自定义数据, 不使用 data 字段,避免和原生事件的data冲突  
        evt.msg = data; 
        let listeners = this.evtNameListenerMap[itm]; 
        listeners && listeners.forEach(fn=>fn(evt))
      });
    },
  }
  let emitWayItm = emitWayMap[emitWay];
  emitWayItm = emitWayItm || emitWayMap[0];
  emitWayItm(evtName);
  
}





