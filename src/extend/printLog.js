// 自定义log,
/* 收口: 方便集中管理 
*/

let printLog = (function(){
  let num = 0;
  let style = `
    border-bottom: 1px solid #000;
  `;
  let typMap = {
    string: {
      ph: '%c%s',
      sty: style+`color: #C10007;`
    },
    number: {
      ph: '%c%d',
      sty: style+`color: #231BA7;`
    },
    object: {
      ph: '%c%o',
      sty: style
    },
  }
  return function(...args){
    num++;
    if (args.length===1) {
      let type = (typMap[typeof args[0]] || {
          ph: '%c%s',
          sty: style
        });
      console.log('%c%s'+type.ph,'font-weight: bold;',`${num}:`,type.sty,args[0]);
    }
    else {
      console.group(`${num}:`);
      // console.groupCollapsed()
      args.forEach((itm,idx)=>{
        let type = (typMap[typeof itm] || {
          ph: '%c%s',
          sty: style
        });
        console.log(type.ph,type.sty,itm);
      })
      console.groupEnd();
    }
  }
})();

export default printLog;


