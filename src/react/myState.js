/* 供未支持 useState 的版本使用 useSate 的使用方式 
  
  
  // 1 安装 
  import { installState, } from "./myState.js";
  installState(App, document.querySelector("#app"));
  // 2 使用 
  import { myState, } from "./myState.js";
  function Cpt(){
    const [val, valSet] = myState(0);
    
    return <div />;
  } 
*/
import ReactDOM from 'react-dom';
let update = ()=>{ console.log('请先安装后再使用'); }

// way1:
// export function installState(Root, rootEl){
//   update = ()=>{ ReactDOM.render(<Root />, rootEl) }
// } 
// function state(){
//   let _currentIdx = 0;
//   let _valList = [ ];
// 
//   function setVal(val, idx){
//     _valList[idx] = val;
//     update();
//   }
//   return function(val){
//     if (_valList.length===0) {
//       let idx = _currentIdx;
//       _currentIdx = _currentIdx + 1; 
//       setTimeout(()=>{ _valList.push(val); })
// 
//       return [
//         val, 
//         (val)=>{ setVal(val, idx) }
//       ];
//     }
// 
//     if (_currentIdx===_valList.length) {
//       _currentIdx = 0;
//     }
//     let idx = _currentIdx;
//     _currentIdx++;
//     return [
//       _valList[idx], 
//       (val)=>{ setVal(val, idx) }
//     ];
//   };
// }
// export let myState = state();


// way2:
export function installState(Root, rootEl){
  update = ()=>{ ReactDOM.render(<Root />, rootEl) }
} 
function state(){
  let _currentIdx = 0;
  let _valList = [ ];
   
  function setVal(val, idx){
    _valList[idx] = val;
    _currentIdx = 0;
    update();
  }
  return function(val){
    let _val = _valList[_currentIdx];
    if (_val===undefined&&_currentIdx>=_valList.length) { 
      _val = val; 
      _valList.push(val);
    }
    let idx = _currentIdx;
    _currentIdx = _currentIdx + 1; 
    return [
      _val, 
      (v)=>{ setVal(v, idx) }
    ];
    
  };
}
export let myState = state();
// export state;

