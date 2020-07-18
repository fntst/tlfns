
<h1> 个人JS功能/工具集 </h1>

tips: 继承自 tlfns npm模块(本人已不再维护tlfns模块)


```
安装&引入:
$ npm i -S zkits 
// 引入指定功能 
import xxx from "zkits/xx/xxx.js";
// 引入无变量导出的某些功能 
import 'zkits/xx/xxx.js';  

// nodejs中  
const importFn = require('zkits/node/require_esmodule_file.js')(__dirname);
let { xx } = importFn('zkits/xx/xxx.js');
importFn('zkits/xx/xxx.js');
```


```
根据环境不同 划分了不同的文件夹 
base: JS语言基础功能 
browser: browser浏览器 
node: Node服务端 
mp: miniprogram小程序 
```

PS: 持续更新中...., 若有需要的功能 或好的建议, 请GitHub留言.. 



