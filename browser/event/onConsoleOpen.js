/* 监听 浏览器控制台打开 
*/


// 原理1: 控制台访问元素时,控制台会获取元素的id值 
function way1(cb,interval){
  var div = document.createElement('div');
  Object.defineProperty(div,"id", {
    get(){ cb() },
  });
  // 使用轮训来监测 [权宜之计] 
  return setInterval(()=>{ console.log(div); },interval);
}

// 原理2: 控制台打开时,console的方法才会执行,且打印方法有运行较慢 
function way2(cb){
  var startTime = performance.now()
  for (var check = 0; check < 1000; check++){ console.log(check); }
  if (performance.now() - startTime > 100){ cb() }
}

// 原理3: 通过 mousemove 事件来优化间时调用 todo 
function way3(cb){ 
  window.addEventListener("mousemove",function(evt){
    
  })
}

/* 控制台打开时持续触发 */
export default function listenConsoleOpen(callback, interval=300, way=1){
  let map = {
    1: way1,
    // 2: way2,
  }
  let fn = map[way];
  if (!fn) { throw new Error('参数错误!') };
  
  return fn(callback,interval);
  // eval(`way${way}(${callback})`)
};

/* 控制台打开时触发 */
export function onConsoleOpen(callback){
  function checkOpen(){ }
  checkOpen.toString = function(){ 
    console.log('onConsoleOpen_run');
    // 避免首次加载完执行,等待打开控制台时执行[第二次] [兼容性问题?] 
    if (checkOpen.flg) { callback(); }
    checkOpen.flg = true;
    // if (checkOpen.flg && !checkOpen.isRunned) { 
    //   callback(); 
    //   checkOpen.isRunned = true;
    // }
  };
  // console.log("%s", checkOpen);
  console.log( checkOpen );
}

/* 控制台关闭时触发 todo */
export function onConsoleClose(callback){
  function checkOpen(){ }
  checkOpen.toString = function(){ 
    console.log('onConsoleOpen_run');
    // 避免首次加载完执行,等待打开控制台时执行[第二次] [兼容性问题?] 
    if (checkOpen.flg) { callback(); }
    checkOpen.flg = true;
    // if (checkOpen.flg && !checkOpen.isRunned) { 
      //   callback(); 
      //   checkOpen.isRunned = true;
      // }
    };
    // console.log("%s", checkOpen);
    console.log( checkOpen );
  }




/* 测试 */
export function test(){
  let id = listenConsoleOpen(function(){
    alert('opened');
  })
  
  // 2s 后结束测试 
  setTimeout(function(){
    console.log('clearInterval');
    clearInterval(id)
  },2000)
  
  onConsoleOpen(function(){
    console.log('running');
  })
} 

