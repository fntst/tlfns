<h1>FrontEnd Tool Funciotns</h1>
<h2>前端常用工具函数库</h2>




使用方式: 
```
// 集中引入 
import tlfns from "../src/index.js";
const {
  xxx,
} = tlfns;

// 引入指定功能 
import xxx from "../src/utils/xxx.js";
或 
import 'tlfns/src/xxx.js';  // 引入无变量导出的某些功能 
```

<h1> 功能列表文档: </h1>

无变量导出的预设功能: 
```
EventTarget
  .addListener(evtName,listener,immediateWay)  // 绑定事件监听 
    evtName       str,事件名称 
    listener      fn,事件回调 
    immediateWay  bol,可选,立即响应的方式,默认:不立即响应,0:原生触发方式,1:仅执行回调 
  .offListeners(evtName,listener)             // 移除事件监听 
    evtName?   str,不存在则移除所有监听  
    listener?  fn,可选,存在则只移除当前事件,否则移除所有该类事件 
  .emitListeners(evtName,data,emitWay)        // 触发事件 
    evt?      Event/str,可选,事件名称,不存在则触发所有事件的所有监听 
    data?     any,可选,传递的数据,在 evt.msg 中获取  
    emitWay?  0/1,触发方式,默认:0 原生触发方式 
    
Object
  .forEach((val,key)=>{})        // 对象遍历 
  .map((val,key)=>{})            // 返回一新对象,键的值由回调返回值确定 
    let obj = { key1: 1, key2: 2 }
    let obj1 = obj.map((val,key)=>{
      if(val===1){ return 100; }
      return val;
    })
    console.log(obj1); // {key1: 100, key2: 2}
  .filter((val,key)=>{})         // 返回一新对象,根据返回调回值来过滤原对象的键值对 
  .reduce((val,key)=>{},initVal) // 返回最后一次回调的返回值 
  .some((val,key)=>{})           // 当返回值返回true时,则立即返回true,否则最终返回 false 
  .every((val,key)=>{})          // 当返回值返回false时,则立即返回false,否则最终返回 true 
```

功能类: 
```
LocalFiles  本地文件上传 
  let localFiles = new LocalFiles({
    // 配置项可选 
    multiple=true,  // 是否多选 
    accept='*',             // 可选文件类型,可自定义,如: '.pdf,.doc' 
    limitNum=99,            // 一次最多可选数量 
    limitSize=10*1024*1024, // 最大文件体积10M,unit:B 
    base64=false, // 是否返回base64 
    
    url='',              // 上传地址 
    uploadField='',      // 文件上传字段
  });
  button1.addEventListener("click",function(evt){
    localFiles.pick()
    .then(list=>{
      console.log(list);
    });
  })
  // 使用拖放功能上传 
  localFiles.onDrop(div1,function(list){
    console.log(list);
  })

```

功能函数: 
```
  getThisFnName()    // str,函数内获取当前函数的名称 [函数内执行当前函数] [严格模式下可用] 
  throttle(fn,context,time=600)   // 函数节流: 限制函数执行频率 
    fn       // [高频]执行的函数 
    context  // 函数执行的上下文 
    time=600 // num,限制的频率,单位:ms  
    
  getOSName()       // str,获取操作系统名称 
    如: 'windows' 'mac' 'linux' 'android' 'ios' 'unkonwn' 
  getBrowserInfo()  // str,获取浏览器名称&版本 
  isIE()            // bol,是否为IE 
  isLowerIE()       // bol,是否为低版本IE [IE7、8、9 之一] 
  webPAble()        // bol,浏览器是否支持webP格式图片 
    
  roundFloat(num,decimals=0)       // 取舍小数位 
  preciseAdd(num1,num2)            // 浮点数精确相加 
  preciseMul(num1,num2,decimals)   // 浮点数精确相乘 
  
  adapt(sizeList,root,outMinHandle,outMaxHandle)  // 用于移动端页面布局 
    Example: 
      adapt(
        [200,375,600],  // 最小屏幕宽度 200, 最大 600, 默认按照 375 宽度布局 
        window, 
        ()=>{
          // 当屏幕宽度超过了最小值时的回调 
          console.log('超过了最小值 200px');
        }, 
        ()=>{
          // 当屏幕宽度超过了最大值时的回调 
          console.log('超过了最大值 600px');
        } 
      )
      
      // 在按照 375 宽度布局时, 
      // CSS样式中, 0.2rem 即表示 20px 
      // 使用less时: 
      // 在less中定义变量 @w: 1rem/ratio; 来表示1px 
      // 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
      // 而当屏幕尺寸变化时,将按比例进行缩放,始终保持同 375 屏宽时,相同的比例大小 
      
  copyText(text)    // 文本复制,返回是否复制成功的 Promise, 
  
  listenResize(elem,callback,immediate=true)   // 监听元素的尺寸变化 
    elem       监听的元素 [目前仅支持可插入子元素的元素监听] 
    callback   元素尺寸变化时的回调 
    immediate  是否立即触发响应 
    
  multiRowsEllipsis(elem,rows=2,sym='...',autoMode=true)   // 多行省略号,返回最终的字符串  
    elem      显示文本的且需设置多行省略的元素 
    rows      行数 
    sym       省略号字符串 
    autoMode  是否自动改变 [vue中需交给vue来维护,将返回最终的字符串重新赋值到文本显示区] 
```



<h1>持续更新中....</h1>







