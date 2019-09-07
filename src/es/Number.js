// 数值 相关操作 


// 取舍小数位 
export function roundFloat(num,decimals=0){  
  /*Input:  
  * Output: float,
  */
  return Number( Math.round(`${num}e${decimals}`) + `e-${decimals}` );
}


// 数值精确相加 
export function preciseAdd(arg1,arg2){ 
  /*原理: 整数可进行精确加减计算  
  * Input: 
  -  PS: 做减法 需将对应的加数取负 
  -  arg1  num,加数 
  -  arg2  num,加数
  * Output: num,精确相加后的数值 
  */

  let r1, r2 
  try { r1 = arg1.toString().split(".")[1].length }
  catch(e) { r1 = 0 } 
  try { r2 = arg2.toString().split(".")[1].length }
  catch(e) { r2 = 0 } 
  
  let m1 = Math.max(r1,r2) 
  let m2 = Math.pow(10,m1) 
  
  return (arg1*m2 + arg2*m2) / m2
}
// 数值精确相乘 
export function preciseMul(arg1,arg2,arg3){  
  /*原理: 整数可进行精确相乘计算 
  * Input: 
  -  arg1   num,乘数 
  -  arg2   num,乘数 
  -  arg3?  num,保留小数的位数,默认: 两个乘数小数位的和 
  * Output: num,相乘后的数值 
  */
  let r1 = arg1.toString() 
  let r2 = arg2.toString() 
  let len1 = r1.split(".")[1] ? r1.split(".")[1].length : 0
  let len2 = r2.split(".")[1] ? r2.split(".")[1].length : 0 
  let num1 = Number(r1.replace(".", ""));
  let num2 = Number(r2.replace(".", ""));
  let pow = Math.pow(10,len1+len2);
  let decimals = arguments[2] ? arguments[2] : len1 + len2;
  
  return Number( (num1*num2/pow).toFixed(decimals) ) 
}



















