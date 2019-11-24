// 数值 相关操作 


// 取舍小数位 
export function roundFloat(num,decimals=0){  
  /*Input:  
  * Output: float,
  */
  return Number( Math.round(`${num}e${decimals}`) + `e-${decimals}` );
}


/* 精确四则运算 */
// 获取数值的小数位个数 
function getDecimal(num){
  let arr = num.toString().split('.')
  let result = 0; 
  if (arr[1]) { result = arr[1].length; }
  return result; 
}
/* 
方式1: 转换为整数后运算 
缺点: 可能导致大整数溢出问题 
*/
export function preciseCalc1(type,num1,num2,decimal){
  /* 
  type     KW,运算类型: '+' '-' '*' '/' 
  num1     num,操作数1 
  num2     num,操作数2 
  decimal  int,保留小数位,默认:2 
  */
  let typMap = { 
    '+': function(n1,n2,pow1,pow2){ 
      let pow = Math.max(pow1,pow2)
      let p = Math.pow(10,pow)
      return (n1*p+n2*p)/p;
    }, 
    '-': function(n1,n2,pow1,pow2){ 
      let pow = Math.max(pow1,pow2)
      let p = Math.pow(10,pow)
      return (n1*p-n2*p)/p;
    }, 
    '*': function(n1,n2,pow1,pow2){ 
      let p1 = Math.pow(10,pow1)
      let p2 = Math.pow(10,pow2)
      return ((n1*p1)*(n2*p2))/p1/p2;
    }, 
    '/': function(n1,n2,pow1,pow2){ 
      let p1 = Math.pow(10,pow1)
      let p2 = Math.pow(10,pow2)
      return ((n1*p1)/(n2*p2))*p2/p1;
    },
  }
  if (!(type in typMap)) { return console.error('运算符错误: ', type); }
  
  let d1 = getDecimal(num1)
  let d2 = getDecimal(num2)
  let deci = decimal?decimal:2;
  return Number( typMap[type](num1,num2,d1,d2).toFixed(deci) ) 
}
/* 
方式2: 转换成数组进行模拟运算  
*/
// 单位数乘多位数 
function multiply(arr1,arr2,d1,d2){
}
export function preciseCalc2(type,num1,num2,decimal){
  /* 
  type     KW,运算类型: '+' '-' '*' '/' 
  num1     num,操作数1 
  num2     num,操作数2 
  decimal  int,保留小数位,默认:2 
  */
  let typMap = { 
    '+': function(arr1,arr2,d1,d2){ 
      if (!arr1.isNegative && !arr2.isNegative) {
        let d = Math.max(d1,d2)
        let isUp = false; 
        let result = arr1.map((itm,idx)=>{
          let val = itm*1; 
          let itm2 = arr2[idx]*1;
          if (itm2) { val += itm2; }
          if (isUp) { 
            val++; 
            isUp = false;
          }
          if (val>9) {
            val -= 10; 
            if (arr1[idx+1]!==undefined) { isUp = true; }
            else { arr1.push(1) }
          }
          return val; 
        }).reverse() 
        if (d!==0) { result.splice(-d,0,'.') }
        return result.reduce((retVal,itm,idx)=>{ 
          return  retVal+itm;
        },'') *1 
      }
      else if (arr1.isNegative && arr2.isNegative) {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['+'](arr1,arr2,d1,d2) * -1;
      }
      else if (arr1.isNegative) {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['-'](arr2,arr1,d1,d2);
      }
      else {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['-'](arr1,arr2,d1,d2);
      }
    }, 
    '-': function(arr1,arr2,d1,d2){ 
      if (!arr1.isNegative && !arr2.isNegative) {
        let d = Math.max(d1,d2)
        let isDown = false; 
        let result = arr1.map((itm,idx)=>{
          let val = itm*1; 
          let itm2 = arr2[idx]*1;
          if (itm2) { val -= itm2; }
          if (isDown) { 
            val--; 
            isDown = false;
          }
          if (val<0) {
            val += 10; 
            if (arr1[idx+1]!==undefined) { isDown = true; }
            else { arr1.push(-1) }
          }
          return val; 
        }).reverse() 
        if (d!==0) { result.splice(-d,0,'.') }
        result = result.reduce((retVal,itm,idx)=>{ 
          return  retVal+itm;
        },'') 
        if (arr1.pop()<0) {
          result = result - Math.pow(10,result.split('.')[0].length)
        }
        return result*1; 
      }
      else if (arr1.isNegative && arr2.isNegative) {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['-'](arr2,arr1,d1,d2);
      }
      else if (arr1.isNegative) {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['+'](arr1,arr2,d1,d2) *-1;
      }
      else {
        arr1.isNegative = false; 
        arr2.isNegative = false; 
        return this['+'](arr1,arr2,d1,d2);
      }
    }, 
    '*': function(arr1,arr2,d1,d2){ 
      // 
    }, 
    '/': function(arr1,arr2,d1,d2){ 
      
    },
  }
  if (!(type in typMap)) { return console.error('运算符错误: ', type); }
  
  // 
  let d1 = getDecimal(num1); 
  let d2 = getDecimal(num2); 
  
  let arr1 = num1.toString().replace(".", "").split('').reverse()
  if (num1<0) {
    arr1.pop()
    arr1.isNegative = true; 
  }
  else {
    arr1.isNegative = false; 
  }
  let arr2 = num2.toString().replace(".", "").split('').reverse()
  if (num2<0) {
    arr2.pop()
    arr2.isNegative = true; 
  }
  else {
    arr2.isNegative = false; 
  }
  let delta = d1 - d2; 
  if (delta>0) {
    while (delta>0) {
      delta--;
      arr2.unshift(0)
    }
  }
  else if (delta<0) {
    while (delta<0) {
      delta++;
      arr1.unshift(0)
    }
  }
  
  let deci = decimal?decimal:2;
  return Number( typMap[type](arr1,arr2,d1,d2).toFixed(deci) ) 
}

/* 
数字转换为中文 
  如 378 叁佰柒拾捌 
*/

















