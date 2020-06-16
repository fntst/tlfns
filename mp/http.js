

module.exports = {
  /** http请求 
  * @params  option  obj,请求参数对象 {
  -   method: KW,   // 请求方法,默认:"GET" 
  -   url: str,     // 请求地址 
  -   data: obj,    // 请求数据,默认:{}  
  -   header: obj,  // 请求头,默认: { 'content-type': 'application/json' }  
  -   dataType: KW, // 响应类型,默认: 'json'  
  - } 
  * @return  promise, 
  * -----------------------------
  * @author  fsl 
  * @time    时间值 
  * -----------------------------
  * @detail  
  * 01 详细说明1 
  * -----------------------------
  * @todo  
  * 1 代办事项1 
  */
  request( option ){ 
    let {
      method = "GET",
      url,
      data = {},
      header = { /* 'Accept': 'application/json' */ 'content-type': 'application/json', },
      dataType = 'json',
    } = option 
    return new Promise((rs,rj)=>{
      wx.request({
        method, 
        url: 'https://mujincode.hkbao.com/'+url,
        data, 
        header, 
        dataType,
        success(back){ 
          var _data = back.data 
          if (_data.error_code == 0) { rs(_data.data) }
          else { rj(_data.info||'API err') }
        },
        fail(info){ 
          rj(info.errMsg+'-'+info.statusCode) 
        },
        complete(result){ 
          console.log(method+': '+url,result);
        },
      })
    })
  }

}



