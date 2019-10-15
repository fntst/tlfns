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
  /* @params options     obj,可选,配置选项 <=> {
    isHoriz: bol,       // 是否水平滚动,默认:false,垂直滚动 
    scrollingDis: num,  // 滚动过程中的触发距离,默认:3
    scrollTopSec: num,  // type=1时设置,滚动到顶部的触发区间,默认:10 
    scrollBtmSec: num,  // type=2时设置,滚动到底部的触发区间,默认:10 
  }
  */
  constructor({isHoriz=false, scrollingDis=3, scrollTopSec=10, scrollBtmSec=10}){ 
    // this.isHoriz = isHoriz; 
    this.startVal = 'scrollTop'
    this.clientVal = 'clientHeight'
    this.totalVal = 'scrollHeight'
    if (isHoriz) {
      this.startVal = 'scrollLeft'
      this.clientVal = 'clientWidth'
      this.totalVal = 'scrollWidth'
    }
    this.scrollingDis = scrollingDis; 
    
    this.scrollTopSec = scrollTopSec; 
    this.scrollBtmSec = scrollBtmSec; 
    
    this.isRun0 = true; 
    this.isRun1 = true; 
    this.isRun2 = true; 
    this.currentVal = 0; 
  }
  
  /* 
  @params elemTarget  Element,监听的滚动目标元素 
  @params type        0/1/2,触发的类型  
    0  滚动过程中 
    1  滚动到顶部/左边触发 
    2  滚动到底部/右边触发 
  @params callback    fn(next),触发时的回调 
    next  fn,调用方法才后续才可能继续触发下一次滚动,否则滚动回调在next执行前不会执行 
  */
  on(elemTarget,type,callback){
    let that = this; 
    
    elemTarget.addEventListener("scroll",function(evt){
      let scrollVal = this[that.startVal]; 
      if ( Math.abs(scrollVal-that.currentVal)<that.scrollingDis || !that.isRun ) { return ; }
      
      that.currentVal = scrollVal; 
      
      // 滚动触发 
      callback();
      // 顶部滚动触发 
      if ( scrollVal<=that.scrollTopSec ) {
        // 防止出现滚动条贴顶 
        let sv = 0.1;
        if (scrollVal===0) { 
          this[that.startVal] = sv; 
        } 
        callback()
        that.isRun = false; 
      }
      // 底部滚动触发 
      let scroll1 = this[that.totalVal]; 
      let client2 = this[that.clientVal]; 
      if ( scroll1 - client2 - scrollVal <= that.scrollBtmSec ) {
        callback()
        that.isRun = false; 
      }
      
    })
    elemTarget.addEventListener("scroll",function(evt){
      let scrollVal = this[that.startVal]; 
      if ( Math.abs(scrollVal-that.currentVal)<that.scrollingDis || !that.isRun ) { return ; }
      
      that.currentVal = scrollVal; 
      
      // 滚动触发 
      callback();
      // 顶部滚动触发 
      if ( scrollVal<=that.scrollTopSec ) {
        // 防止出现滚动条贴顶 
        let sv = 0.1;
        if (scrollVal===0) { 
          this[that.startVal] = sv; 
        } 
        callback()
        that.isRun = false; 
      }
      // 底部滚动触发 
      let scroll1 = this[that.totalVal]; 
      let client2 = this[that.clientVal]; 
      if ( scroll1 - client2 - scrollVal <= that.scrollBtmSec ) {
        callback()
        that.isRun = false; 
      }
      
    })
    elemTarget.addEventListener("scroll",function(evt){
      let scrollVal = this[that.startVal]; 
      if ( Math.abs(scrollVal-that.currentVal)<that.scrollingDis || !that.isRun ) { return ; }
      
      that.currentVal = scrollVal; 
      
      // 滚动触发 
      callback();
      // 顶部滚动触发 
      if ( scrollVal<=that.scrollTopSec ) {
        // 防止出现滚动条贴顶 
        let sv = 0.1;
        if (scrollVal===0) { 
          this[that.startVal] = sv; 
        } 
        callback()
        that.isRun = false; 
      }
      // 底部滚动触发 
      let scroll1 = this[that.totalVal]; 
      let client2 = this[that.clientVal]; 
      if ( scroll1 - client2 - scrollVal <= that.scrollBtmSec ) {
        callback()
        that.isRun = false; 
      }
      
    })
  }
}

export default Scroll; 


