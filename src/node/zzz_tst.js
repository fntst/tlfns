

const http = require("http");
const importFn = require("./require_esmodule_file.js")(__dirname)


/* 测试 require_esmodule_file */
let checkType = importFn('../base/check/type.js');
// checkType.test(); 
// importFn('../base/check/members.js').test()
// importFn('../base/check/regexp.js').test()
// importFn('../base/format/money.js').test()
// importFn('../base/format/query.js').test()
// importFn('../base/format/sort.js').test()
// importFn('../base/format/time.js').test()
// importFn('../base/func/arithmetic.js').test()
// importFn('../base/func/log.js').test()
// importFn('../base/func/StateManager.js').test()
// importFn('../base/func/utils.js').test()
// importFn('../base/functions/debounce.js').test()
// importFn('../base/functions/getCallerName.js').test()
// importFn('../base/functions/throttle.js').test()
// importFn('../base/functions/timeout.js').test()
// importFn('../base/noexport/Object.js').test()
// importFn('../base/polyfill/apply.js').test()
// importFn('../base/polyfill/bind.js').test()
// importFn('../base/polyfill/call.js').test()
// importFn('../base/callthen/Callthen.js').test()
// importFn('../base/callthen/Pledge.js').test()
// importFn('../base/callthen/Chain.js').test()
// importFn('../base/callthen/index.js').test()




let server = http.createServer((req,res)=>{
  console.log( req.constructor );
  console.log( checkType.default(req) );
  console.log( checkType.default(req.headers) );

  
  res.end('finished')
}).listen(9000);



