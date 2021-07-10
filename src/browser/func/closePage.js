/* ** 关闭页面 
*/


export default function closePage(){
  let userAgent = navigator.userAgent || "";
  if ( userAgent.includes('MSIE') ) { 
    if ( userAgent.includes('MSIE 6.0') ) { return window.close(); } 
    
    window.open('', '_top');
    window.top.close();
    return ;
  } 
  
  window.open('', '_self');
  window.close();
} 



