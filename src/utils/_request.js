// http请求封装 
// 注: 依赖 axios element-ui, 暂不对外暴露 

import axios from "axios";
import { Loading, MessageBox } from 'element-ui';

let request = ({url,data,params,method,headers,timeout,loading=true,alert=true})=>{
  let loadingInstance = null; // 
  if (loading) {
    loadingInstance = Loading.service({
      text: '加载中...',
      background: 'rgba(0,0,0,0.2)',
    });
  }
  return axios({
    url,
    data: data||{},
    params: params||{},
    method: method||'POST',
    headers: headers||{},
    timeout: timeout||60*1000, // 默认:60s 
  })
  .then(response=>{
    // console.log(response);
    
    let resData = response.data || {};
    if ( resData.success ) {
      return Promise.resolve(resData.result);
    }
    
    let msg = resData.msg || '未知错误';
    alert && MessageBox.alert({
      title: '提示',
      type: 'error',
      message: msg,
    });
    return Promise.reject(msg);
  })
  .catch(err=>{
    console.warn(err);
    
    return Promise.reject(err);
  })
  .finally(()=>{
    loading && loadingInstance && loadingInstance.close();
  });
}

export default request;


















