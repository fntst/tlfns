/* 监听 浏览器控制台打开 
*/


// 原理1: 控制台访问元素时,控制台会获取元素的id值 
function way1(cb,timeout){
  var div = document.createElement('div');
  Object.defineProperty(div,"id", {
    get(){ cb() },
  });
  // 使用轮训来监测 [权宜之计] 
  return setInterval(()=>{ console.log(div); },timeout);
}

// 原理2: 控制台打开时,console的方法才会执行,且打印方法有运行较慢 
function way2(cb){
  var startTime = performance.now()
  for (var check = 0; check < 1000; check++){ console.log(check); }
  if (performance.now() - startTime > 100){ cb() }
}

// todo 
function way3(){ }

let listenConsoleOpen = function(callback,timeout=300,way=1){
  let map = {
    1: way1,
    // 2: way2,
  }
  let fn = map[way];
  if (!fn) { throw new Error('参数错误!') };
  
  return fn(callback,timeout);
  // eval(`way${way}(${callback})`)
};

export default listenConsoleOpen 

