

// 处理文件上传 
/* Input: obj,请求 */
function dealFileLoad(requset){  
  return new Promise((resolve,reject)=>{
    let reqData = '';
    // 边界字符串
    let contentType = requset.headers['content-type'] || requset.headers['Content-Type'];
    let boundary = contentType.split('; ')[1].replace('boundary=', '');
    requset.setEncoding('binary');
    requset.on("data",function(chunk){ reqData += chunk; })
    let fileName = '';
    let ext = '';
    requset.on("end",function(){
      let file = require("querystring").parse(reqData, '\r\n', ':');
      let fileInfo = file['Content-Disposition'].split('; ');
      for (let value in fileInfo) {
        if (fileInfo[value].indexOf("filename=") != -1) {
          fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);
          
          if (fileName.indexOf('\\') != -1) {
            fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
          }
          ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
        }
      }
      
      let upperBoundary = reqData.toString().indexOf(file['Content-Type'].substring(1)) + 
        file['Content-Type'].substring(1).length;
      let binaryDataAlmost = reqData.toString().substring(upperBoundary) 
        .replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      
      resolve(
        binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(`--${boundary}--`)),
        fileName
      );
    });
  });
},

module.exports = dealFileLoad;
// 使用案例：
// dealFileLoad(req).then((data,fileName)=>{
//   let writerStream = fs.createWriteStream(`./files/${fileName}`);
//   writerStream.write(data,'binary'); //开始写入文件 
//   writerStream.end(); //写入完成 
//   writerStream.on('finish',function(){
//     console.log(`    上传文件： ${fileName}`);
//     res.writeHeader(200,{
//       "Content-Type": 'application/json;charset:utf-8',
//       'Access-Control-Allow-Origin': '*',
//     })
//     res.end(JSON.stringify({
//       success: true,
//       msg: 'upload success',
//     }))
//   });
// })
// .catch((err)=>{ 
//   console.warn(err);
// });
