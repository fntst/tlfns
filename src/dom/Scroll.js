/* 监听元素滚动
  ◆功能: 
  0.1 滚动过程中触发 
  0.2 设置滚动触发距离 [滚动距离大于该值,才会触发一次滚动事件] 
  1.0 滚动到顶部触发 
  1.1 设置滚动顶部的触发区间[触发区间内只会触发一次] 
  2.0 滚动到底部触发
  2.1 设置滚动底部的触发区间[触发区间内 只会触发一次] 
*/

class Scroll {
  /* 
  @params elemTarget  Element,监听的滚动目标元素 
  @params isVertical  bol,是否为垂直滚动 
  */
  constructor(elemTarget,isVertical=true){ 
    this.elem = elemTarget
    
    this.beginProp = 'scrollTop'
    this.clientProp = 'clientHeight'
    this.totalProp = 'scrollHeight'
    if (!isVertical) {
      this.beginProp = 'scrollLeft'
      this.clientProp = 'clientWidth'
      this.totalProp = 'scrollWidth'
    }
    
    // 记录前一滚动位置,用来区分滚动方向 
    this.currentVal = 0; 
    let that = this; 
    elemTarget.addEventListener("scroll",function(evt){
      setTimeout(()=>{ that.currentVal = this[that.beginProp]; ; })
    })
  }
  
  
  /* 
  到开始位置 
  @params isSlow    bol,是否缓慢滚动到开始位置 
  @params callback  fn,滚动到开始位置后触发 
  */
  toBegin(callback,isSlow=true){ 
    if (isSlow) {
      this._slow2Begin(this.elem[this.beginProp],callback);
    }
    else { 
      this.elem[this.beginProp] = 0; 
      callback();
    }
  }
  _slow2Begin(num,cb){
    // console.log('#1');
    if ( num <= 0 ) { 
      this.elem[this.beginProp] = 0; 
      cb();
      return ; 
    }
  
    this.elem[this.beginProp] = num; 
    setTimeout(()=>{
      this._slow2Begin( num/2 - 3, cb );
    },55)
  }
  /* 
  到结束位置 
  @params isSlow    bol,是否缓慢滚动到结束位置 
  @params callback  fn,滚动到结束位置时触发 
  */
  toEnd(callback,isSlow=true){ 
    let endVal = this.elem[this.totalProp]-this.elem[this.clientProp]
    let currentVal = this.elem[this.beginProp]
    if (isSlow) {
      this._slow2End(currentVal,endVal,callback)
    }
    else {
      this.elem[this.beginProp] = endVal;
      callback();
    }
  }
  _slow2End(currentV,totalV,cb){
    // console.log('#2');
    if ( currentV >= totalV ) { 
      this.elem[this.beginProp] = totalV; 
      cb();
      return ; 
    }
    
    let nextV = currentV + (totalV-currentV)/2 + 3;
    this.elem[this.beginProp] = nextV; 
    setTimeout(()=>{
      this._slow2End(nextV,totalV,cb);
    },55)
  }
  /* 待优化: 
  _slow2Pos(beginV,endV,cb){
    if ( num <= 0 ) { 
      this.elem[this.beginProp] = 0; 
      cb();
      return ; 
    }
  
    this.elem[this.beginProp] = num; 
    setTimeout(()=>{
      this._slow2Pos( num/2 - 3, cb );
    },55)
  },
  */

  
  /* 
  @params callback    fn(next),触发时的回调 
    next  fn,调用方法才后续才可能继续触发下一次滚动,否则滚动回调在next执行前不会执行 
    val   num,当前的滚动值 
  @params distance    num,滚动的触发距离,unit:px 
  @params direction   KW,触发的滚动方向 
    'double' 双向,默认值
    'reduce' 滚动量减少的方向 
    'growth' 滚动量增加的方向
  */
  onScroll(callback,distance=3,direction='double'){ 
    let that = this; 
    
    if (direction==='reduce') {
      let isRun = true; 
      let preVal = 0; // 用来判断滚动距离是否达到指定值 
      this.elem.addEventListener("scroll",function(evt){
        let scrollVal = this[that.beginProp]; 
        let isDire = scrollVal-that.currentVal<0;
        let delta = preVal-scrollVal; 
        if (!isDire) { preVal = scrollVal; }
        if ( !isRun || !isDire || delta<=distance ) { return ; }
        isRun = false;
        preVal = scrollVal; 
        
        callback(()=>{ isRun = true; },scrollVal);
      })
    }
    else if (direction==='growth') {
      let isRun = true; 
      let preVal = 0; // 用来判断滚动距离是否达到指定值 
      this.elem.addEventListener("scroll",function(evt){
        let scrollVal = this[that.beginProp]; 
        let isDire = scrollVal-that.currentVal>0;
        let delta = scrollVal - preVal; 
        if (!isDire) { preVal = scrollVal; }
        if ( !isRun || !isDire || delta<=distance ) { return ; }
        isRun = false;
        preVal = scrollVal; 
        
        callback(()=>{ isRun = true; },scrollVal);
      })
    }
    else {
      let isRun = true; 
      let preVal = 0; // 用来判断滚动距离是否达到指定值 
      this.elem.addEventListener("scroll",function(evt){
        let scrollVal = this[that.beginProp]; 
        // let delta = scrollVal-that.currentVal;
        // Math.abs(delta)<=distance
        if ( !isRun || Math.abs(scrollVal-preVal)<=distance ) { return ; }
        isRun = false;
        preVal = scrollVal; 
        
        callback(()=>{ isRun = true; },scrollVal);
      })
    }
  }
  
  /* 
  向开始位置滚动
  @params callback    fn(next),触发时的回调 
    next  fn,调用方法才后续才可能继续触发下一次滚动,否则滚动回调在next执行前不会执行 
  @params distance    num,滚动到起始位置的触发区间,unit:px 
  */
  onBegin(callback,distance=10){ 
    let that = this; 
    let isRun = true; 
    this.elem.addEventListener("scroll",function(evt){
      let scrollVal = this[that.beginProp]; 
      let delta = that.currentVal - scrollVal;
      if ( !isRun || delta<=0 || scrollVal>=distance ) { return ; }
      isRun = false; 
      
      // 防止出现滚动条贴顶 
      if (scrollVal===0) { this[that.beginProp] = 0.1; } 
      callback(()=>{ isRun = true; },scrollVal)
    })
  }
  
  /* 
  向终点位置滚动
  @params callback    fn(next),触发时的回调 
    next  fn,调用方法才后续才可能继续触发下一次滚动,否则滚动回调在next执行前不会执行 
  @params distance    num,滚动到终止位置的触发区间,unit:px 
  */
  onEnd(callback,distance=10){ 
    let that = this; 
    let isRun = true; 
    
    this.elem.addEventListener("scroll",function(evt){
      let scrollVal = this[that.beginProp]; 
      let delta = scrollVal - that.currentVal;
      let scroll1 = this[that.totalProp]; 
      let client2 = this[that.clientProp]; 
      let restVal = scroll1 - client2 - scrollVal;
      if ( !isRun || delta<=0 || restVal>=distance ) { return ; }
      isRun = false; 
      
      callback(()=>{ isRun = true; },scrollVal)
    })
  }
}

export default Scroll; 


