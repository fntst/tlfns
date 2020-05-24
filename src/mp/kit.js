


module.exports = {
  // http请求 
  // 输出: promise  状态改变时,传递结果  
  httpRequest: function(  
    type = "GET"  // 默认:"GET" 
    ,url          // 请求地址 
    ,data = {}    // 请求数据 
    ,header = {   // 请求头 
      // 'Accept': 'application/json' 
      'content-type': 'application/json'  
    }
    ,dataType = 'json' // 响应类型 
  ){ 
    return new Promise(function(rs,rj){
      wx.request({
        method: type 
        ,url: 'https://mujincode.hkbao.com/'+url 
        ,data: data 
        ,header: header 
        ,dataType: dataType  
        ,success: function (back){ 
          var _data = back.data 
          if (_data.error_code == 0) { rs(_data.data) }
          else { rj(_data.info||'API err') }
        }
        ,fail: function (info){ 
          rj(info.errMsg+'-'+info.statusCode) 
        }
        ,complete: function (result){ 
          console.log(type+': '+url,result);
        }
      })
    })
  }
}


