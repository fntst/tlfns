import StateManager from "../src/design/StateManager.js";

/* test StateManager */
// 初始化配置  
let stMg = new StateManager([ 
  'aa', // 条件a 
  'bb', // 条件b 
  'cc', // 条件c 
  'dd', // 条件d 
  'ee', // 条件e 
  'ff', // 条件f 
]);
stMg.setConfigs([
  [
    // 表示 条件aa为'01'&条件bb为'01'&条件cc为'03', 对应的 hd1: '001', hd2: true 
    { aa: '01', bb: '01', cc: '03' },
    { hd1: '001', hd2: true, },
  ],
  [
    // 表示 aa条件为'02'时[其他条件任意],对应的 hd1: '222' 
    { aa: '02', },
    { hd1: '222', },
  ],
  [
    // 表示 cc 条件不为'02'时,对应的 hd1: '非02' 
    { cc: '!02', },
    { hd1: '非02', },
  ],
])
stMg.setter(
  { aa: '01', bb: '02', },
  { hd1: true, hd2: '01', },
)

// console.log(stMg);

console.log(stMg);
let val1 = stMg.getter('hd1',{ aa: '01', bb: '01', }); 
console.log( val1 ); // '222'  
let val2 = stMg.getter('hd2',{ aa: '01' }); 
console.log( val2 ); // undefined  
let val3 = stMg.getter('hd1',{ aa: '01', bb: '01', cc: '03' }); 
console.log( val3 ); // '001'  
let val4 = stMg.getter('hd1',{ cc: '01' }); 
console.log( val4 ); // '非02'  


// // 针对于使用vue的项目,若使用了vuex,则可将该功能集成到 store 中 
// stMg.install(vm.$store,'stateManager');  // 注册到store中 
// vm.$store.getters['stateManager/query']('hd2',{
//   aa: '01',
//   bb: '02',
// })

