/*** 函数功能说明  // TODO:  
* @params  xxx  type,参数说明
* @return  type,返回值说明 
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
* 01 详细说明1 
* -----------------------------
* @update  
* 时间值 更新说明 
*/
var cmd = process.platform=='win32'?'netstat -ano':'ps aux';
var exec = require('child_process').exec;
var port = '9999';

exec(cmd, function(err, stdout, stderr) {
  if(err){ return console.log(err); }
  
  stdout.split('\n').filter(function(line){        
    var p=line.trim().split(/\s+/); 
    var address=p[1];        
    
    if(address!=undefined){        
      if(address.split(':')[1]==port) {                
        exec('taskkill /F /pid '+p[4],function(err, stdout, stderr){
          if(err){ return console.log('释放指定端口失败！！'); }
          
          console.log('占用指定端口的程序被成功杀掉！');
        });
      }
    }                          
  });
});

