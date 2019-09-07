// 自定义事件 

function EvtTarget(){
  this.msg = '自定义的事件对象'
  this.store = {};
}
EvtTarget.prototype = {
  constructor: EvtTarget,
  listen(evtName,listener){
    if ( !this.store[evtName] ) { this.store[evtName] = [] }
    this.store[evtName].push(listener);
  },
  strike(evtName,data){
    var listeners = this.store[evtName];
    if (listeners && listeners.length ) {
      listeners.forEach(itm=>{ itm(data); })
    }
    else {
      console.warn(`no ${evtName} to strike`);
    }
  },
  remove(evtName,listener){
    var listeners = this.store[evtName];
    if (listeners && listeners.length ) {
      if (listener) {
        this.store[evtName] = listeners.filter(val=>{
          return val !== listener
        })
      }
      else {
        this.store[evtName] = [];
      }
    }
    else {
      console.warn(`no ${eventName} to remove`);
    }
  },
}

export default EvtTarget;
/* Example:  
let myET = new EvtTarget();
*/














