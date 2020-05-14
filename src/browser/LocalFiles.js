
/* 选取本地文件 */
export default class LocalFiles {
  /*** 功能初始化 
  * @params  multiple     bol,是否可多选 
  * @params  accept       bol,可选文件类型,可自定义,如: '.pdf,.doc'   
  * @params  limitNum     num,一次最多可选数量  
  * @params  limitSize    num,最大文件体积,unit:B,默认:10M 
  * @params  base64       bol,是否返回base64 
  * @params  url          str,上传地址 
  * @params  uploadField  str,文件上传字段 
  * @return  obj,用来提供操作方法的对象 
  */
  constructor({
    multiple=true,
    accept="*",
    limitNum=99,
    limitSize=1024*1024*10,
    base64=false, 
    
    url='', 
    uploadField='', 
  })
  { 
    if (!document) { return new Error("document is not defined") }
    
    this.options = { multiple, accept, limitNum, limitSize, base64, url, uploadField, } 
    
    this._fileInput = document.createElement("input"); // 缓存元素  
    this._fileInput.setAttribute("type","file"); 
    
    this._fileInput.multiple = multiple;
    this._fileInput.setAttribute("accept",accept);
    
    this._resolve = function(){ };
    this._reject = function(){ };
    
    this._fileInput.addEventListener("change",(evt)=>{
      let _files = [...evt.target.files];   
      // 清空选择的文件,evt.target 此时已为 null,需提前缓存 
      evt.target.value = ""; 
      
      this._collectFiles(_files,this.options)
      .then(data=>{ this._resolve(data); })
      .catch(err=>{ this._reject(err); });
    })
  }
  
  pick(){
    this._fileInput.click(); 
    return new Promise((res,rej)=>{
      this._resolve = res; // 更新 _resolve 
      this._reject = rej; // 更新 _reject 
    });
  }
  onDrop(dropElem,callback){
    // 接收拖放文件的元素 
    
    dropElem.addEventListener("dragenter",function(evt){
      this.classList.add('file-drag-active');
    })
    dropElem.addEventListener("dragleave",function(evt){
      this.classList.remove('file-drag-active');
    })
    dropElem.addEventListener("dragover",function(evt){
      evt.preventDefault() 
    })
    dropElem.addEventListener("drop",(evt)=>{
      evt.preventDefault(); 
      evt.target.classList.remove('file-drag-active');
      
      let files = [...evt.dataTransfer.files];
      if (files.length===0) { return rej({ code: 0, msg: 'not files' });}
      
      this._collectFiles(files,this.options)
      .then(data=>{ 
        callback(data)
      })
      .catch(err=>{ 
        console.error(err)
      });
    })
  }
  
  _uploadFiles(files){
    let { url, uploadField, } = this.options;
    
    let fd = new FormData();
    files.forEach((itm,idx)=>{
      fd.append(uploadField,itm.file,itm.file.name)
    })
    return new Promise((res,rej)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('post',url,true);
      // xhr.setRequestHeader('Content-Type','application/json'); 
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState!==4){ return ; }
        
        if( xhr.response ) {
          res({ list: files, response:xhr.response, xhr, });
        }
        else{
          rej({ list: files, response:xhr.response, xhr, });
        } 
      }
      xhr.send(fd); 
    });
  }
  _dealFiles(files,resolve,reject){
    if (!this.options.url) {
      resolve({ list: files, }); 
      return ;
    }
    
    this._uploadFiles(files)
    .then(data=>{ resolve(data); })
    .catch(err=>{ reject(err); });
  }
  _collectFiles(files,{accept,limitNum,limitSize,base64}){
    return new Promise((resolve,reject)=>{
      // 文件类型控制 
      
      let isOutTypes = false;
      if (accept!=='*') {
        isOutTypes = files.some(itm=>{
          let ext = (itm.name.match(/\.\w+?$/)||[])[0]
          if (!accept.includes(ext)) {
            reject({ 
              code: 1, 
              msg: 'out limit types', 
              
              acceptTypes: accept,
              currentType: ext,
            });
            return true;
          }
        })
      }
      if (isOutTypes) { return ; }
      
      // 文件数量控制 
      if (files.length>limitNum) {
        reject({ 
          code: 2, 
          msg: 'out limit num', 
          
          limitNum: limitNum,
          currentNum: files.length,
        });
        return ;
      }
      
      // 文件大小控制 
      let isOutSize = files.some(itm=>{
        if (itm.size>limitSize) {
          reject({ 
            code: 3, 
            msg: 'out limit size', 
            
            limitSize: limitSize,
            currentSize: itm.size,
          });
          return true;
        }
      })
      if (isOutSize) { return ; }
      
      // 不转换为 base64 
      if (!base64) { return this._dealFiles(files.map(file=>({file,})),resolve,reject); }
      
      // 转换为 base64 
      let rstList = []; 
      let _counter = 0; 
      files.forEach(file=>{
        let flRd = new FileReader();
        flRd.readAsDataURL(file);
        flRd.onload = ()=>{
          _counter++; 
          rstList.push({ 
            file,       
            base64: flRd.result, 
            more: flRd 
          });
          
          files.length===_counter && this._dealFiles(rstList,resolve,reject);
        }; 
      });
    });
  }
};


/* 测试 */
export function test(){
  
  document.body.insertAdjacentHTML("beforeend",`
    <button id="button1" type="button">测试</button>
    <div id="div1"> </div>
    <style >
      #div1 {
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
      }
    </style>
  `)
  
  
  let localFiles = new LocalFiles({
    base64: true, 
  });
  button1.addEventListener("click",function(evt){
    localFiles.pick()
    .then(list=>{
      console.log(list);
    });
  })
  localFiles.onDrop(div1,function(data){
    console.log(data);
  })
  
} 