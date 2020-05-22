


/*** 通过文件的base64下载文件  
* @params  base64    str,文件的base64字符串 
* @params  fileName  str,文件名称 
* @return  / 
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
export function loadBase64(base64,fileName){
  // IE使用 msSaveOrOpenBlob 方法 
  // window.navigator.msSaveBlob( canvas.msToBlob(), 'a.png') 
  if (window.navigator.msSaveOrOpenBlob) {
    // 截取base64的数据内容,去掉前面的描述信息[如 data:image/png;base64],并解码为2进制数据 
    let bstr = atob(base64.split(',')[1]) 
    let n = bstr.length // 获取解码后的二进制数据的长度,用于后面创建二进制数据容器
    let u8arr = new Uint8Array(n) // 创建一个Uint8Array类型的数组以存放二进制数据
    // 将二进制数据存入Uint8Array类型的数组中
    while (n--) { u8arr[n] = bstr.charCodeAt(n) }
    let blob = new Blob([u8arr]) // 创建blob对象
    window.navigator.msSaveOrOpenBlob(blob, fileName) // 这里文件名需要文件类型后缀 
    
    // 方式2: 待测试 
    // let oPop = window.open(img.src, "", "width=0,height=0,top=5000,left=5000");
    // for (; oPop.document.readyState != "complete";) {
    //   if (oPop.document.readyState == "complete") break;
    // }
    // oPop.document.execCommand("SaveAs");
    // oPop.close();
  }
  else {
    let anhor = document.createElement('a')
    anhor.href = base64
    anhor.setAttribute('download', fileName)
    anhor.click()
  }
} 


/* ================================ 测试 ================================== */
import { test } from "./upload.js";
export function test1(){
  test((data)=>{
    loadBase64( data.list[0].base64, 'test.aaa' )
  })
  
} 

