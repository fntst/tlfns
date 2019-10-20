/* 
http请求封装 
功能: 
  自动处理接口的响应 成功/失败 
  请求loading 
  文件上传 
注: 依赖 axios ElementUI/MintUI 
*/

import axios from "axios";
import { Loading, MessageBox } from 'element-ui';

// 显示loading 
function loadingShow(){ 
}
// 隐藏loading 
function loadingHide(){ 
}
// 显示提示弹窗 
function alertShow(){ 
}

// 是否请求成功判断 
function isSuccess(result){
  let {data,status,statusText,headers,request,config,} = result; 
  
  // 接口定义 
  // if ( data && data.errcode===0 ) { return true; }
  // if ( data && data.errcode===undefined ) { return true; }
  // if ( !data && status===200 ) { return true; }
}
// 错误信息获取 
function getErrorMsg(result){
  let {data,status,statusText,headers,request,config,} = result; 
  
  // 接口定义 
  console.log(result,data);
  return data.errmsg || statusText;
}


let request = ({
  url='/',          // str,请求地址 
  
  data={},          // jsonObj,请求数据 
  query={},         // obj,请求查询键值对
  file=null,        // obj,上传文件对象 
  fileField="file", // str,文件上传字段 
  
  method="post",    // post/get,请求方法 
  
  headers={},       // obj,请求头键值对 
  
  timeout=60*1000,  // num,请求超时,unit:s 
  
  loading=true,           // bol,是否使用loading 
  loadingText='加载中...', // str,loading文案 
  alert=true,             // bol,是否请求出错后提示 
  
})=>
{
  let loadingInstance = null; // 
  if (loading) {
    loadingInstance = Loading.service({
      text: loadingText,
      background: 'rgba(0,0,0,0.2)',
    });
  }
  return axios({ url, data, params: query, method, headers, timeout, })
  .then(response=>{
    // console.log(response);
    
    if (isSuccess(response)) { return Promise.resolve(response.data); }
    
    let msg = getErrorMsg(response) || '未知错误';
    return Promise.reject(msg);
  })
  .catch(errMsg=>{
    console.warn(errMsg);
    
    alert && MessageBox.alert({
      title: '提示',
      type: 'error',
      message: errMsg,
    });
    return Promise.reject(errMsg);
  })
  .finally(()=>{
    loading && loadingInstance && loadingInstance.close();
  });
}

export default request;


// TODO 



