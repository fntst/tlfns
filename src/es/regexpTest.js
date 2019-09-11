// 常用的正则检测 

// 是否为邮箱地址 
export function isEmail(str){ 
  /*Input:  
  * Output: bol, 
  * Example: 
  -   validateEmail('mymail@gmail.com') //  true
  */
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

// 数字验证
export function validateNumber(num){  
  /*Input:  
  * Output: bol,
  * Example: 
  -   validateNumber('0x10') // true
  */

  return !isNaN(parseFloat(num)) && isFinite(num) && Number(num)===num;
}




































