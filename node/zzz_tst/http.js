const http = require("http");


// const type = require("../../Base/check/type_.js")


let server = http.createServer((req,res)=>{
  // console.log( req.constructor );
  // console.log( type.default(req) );
  // console.log( type.default(req.headers) );
  

  
  res.end('finished')
})

server.listen(9000);

