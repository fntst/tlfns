
/*** 图片base64转Blob 
* @params  base64  str,待转化的base64字符串 
* @return  blob,转换后的blob 
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
export function dataURL2Blob(base64){  
  let _arr = base64.split(',')
  let type = _arr[0].match(/:(.*?);/)[1]
  let text = window.atob(_arr[1])
  let buffer = new ArrayBuffer(text.length)
  let ubuffer = new Uint8Array(buffer)
  for (var i = 0; i < text.length; i++) { ubuffer[i] = text.charCodeAt(i); }
  
  let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder 
  let blob = null;
  if (Builder) {
    let builder = new Builder();
    builder.append(buffer);
    blob = builder.getBlob(type);
  } 
  else { blob = new window.Blob([buffer], {type: type}); }        
  
  return blob 
}


/*** 压缩单张图片 异步操作  
* @params  imgBase64  str,图片base64 
* @params  options    obj,配置选项 {
-    quality: 1, // float,可选,指定压缩后的质量,范围: 0-1 
-    width: 0,   // num,可选,压缩后的宽,0表示不改变   
-    height: 0,  // num,可选,压缩后的高,0表示不改变 
-  }
* @return  promise->obj/msg 'fulfilled'时传递图片信息对象img 
-   obj<=>{
-     base64: <>, // 图片的base64 
-     blob: <>,   // 图片的blob对象 
-   }
* -----------------------------
* @author  fsl 
* @time    时间值 
* -----------------------------
* @detail  
* 01 详细说明1 
* -----------------------------
* @update  
* 时间值 更新说明 
* -----------------------------
* @TODO  
* 大图片使用瓦片拆分进行压缩 
*/
export function imgCompress(imgBase64, options){  
  if ( !options ) {
    options = { quality: 1, width: 0, height: 0 };
  }
  let _img = new Image()
  return new Promise(function(rs,rj){
    _img.src = imgBase64  
    _img.onload = function(){
      // 默认按比例压缩
      let _width0 = this.width
      let _height0 = this.height
      let _scale0 = _width0 / _height0 
      // 最终 质量 宽 高 
      if ( typeof options !== "object" ) { options = {} }
      let _width1 = options.width || _width0 
      let _height1 = options.height || _width1/_scale0 || _height0 
      let _quality = options.quality || 1  
      //生成canvas
      let _canvas = document.createElement('canvas')
      let _ctx = _canvas.getContext('2d') 
      
      _canvas.width = _width1 
      _canvas.height = _height1  
      // 铺底色
      _ctx.fillStyle = "#fff";
      _ctx.fillRect(0 ,0 ,_width1 ,_width1);
      
      _ctx.drawImage(this, 0, 0, _width1, _height1) 
      
      _canvas.toBlob(function(blobImg){
        let _base64 = _canvas.toDataURL('image/jpeg',_quality);
        rs({ base64: _base64, blob: blobImg, })
      } ,'image/jpeg', _quality ) 
    }
  })
}



