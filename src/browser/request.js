/*** http请求封装 
* @params  options  obj,请求配置对象 
* @return  Promise,返回值说明 
* -----------------------------
* @author  fsl 
* @time    2020年5月10日 19:46:11  
* -----------------------------
* @detail  
* 01 自动处理接口的响应 成功/失败 
* 02 请求loading 
* 03 文件上传 
* 注: 依赖 axios ElementUI/MintUI 
* -----------------------------
* @update 
* 时间值 更新说明 
*/

import axios from "axios";
import { Loading, MessageBox } from 'element-ui';

// loading相关操作 
let loadingInstance = null; // 
// 显示loading 
function loadingShow(text){ 
  loadingInstance = Loading.service({ text, background: 'rgba(0,0,0,0.2)', });
}
// 隐藏loading 
function loadingHide(){ 
  loadingInstance && loadingInstance.close();
}

// 显示提示弹窗 
function alertShow(message){ 
  MessageBox.alert(message, '接口提示', { 
    type: 'error', 
  });
}

// 是否请求成功判断 
function isSuccess(result){
  let {data,status,statusText,headers,request,config,} = result; 
  
  // 接口定义 
  if ( data && data.errcode==='0' ) { return true; }
  // if ( data && data.errcode===undefined ) { return true; }
  // if ( !data && status===200 ) { return true; }
  
  return false;
}
// 错误信息获取 
function getErrorMsg(result){
  let {data,status,statusText,headers,request,config,} = result; 
  
  // 接口定义 
  // console.log(result,data);
  return data.msg || '未知错误';
}


export default function main(options){
  let {
    method="post",    // post/get,请求方法 
    url='/',          // str,请求地址 
    query={},         // obj,请求查询键值对
    headers={},       // obj,请求头键值对 
    
    timeout=60*1000,  // num,请求超时,unit:s 
    
    // data 和 file 二选一 
    data={},          // jsonObj,请求数据 
    fileList=[],      // obj,上传的文件列表,成员为文件对象 
    fileField="file", // str,文件上传字段 
    
    loading=true,            // bol,是否使用loading 
    loadingText='加载中...', // str,loading文案 
    alert=true,              // bol,是否请求出错后提示 
  } = options;
  
  let reqData = data; 
  if (fileList && fileList.length>0) {
    let fd = new FormData();
    fileList.forEach(file=>{
      fd.append(fileField,file,file.name)
    })
    reqData = fd; 
  }
  loading && loadingShow(loadingText);
  
  return axios({ 
    method, 
    url, 
    params: query, 
    headers, 
    data: reqData, 
    timeout 
  })
  .then(response=>{
    // console.log(response);
    
    if (isSuccess(response)) { return Promise.resolve(response.data); }
    
    let msg = getErrorMsg(response) || '未知错误';
    return Promise.reject(msg);
  })
  .catch(errMsg=>{
    console.warn(errMsg);
    
    alert && alertShow(errMsg); 
    return Promise.reject(errMsg);
  })
  .finally(()=>{
    loading && loadingHide()
  });
};


// TODO: 待测试 
/* ================================== 测试 ================================== */
export function test(){
  main({
    url: 'https://dog.ceo/api/breeds/image/random',
    data: { key: 'aa', }
  })
  .then(ret=>{
    console.log(ret);
  })
  .catch(err=>{ 
    console.warn(err);
  });
  
} 

