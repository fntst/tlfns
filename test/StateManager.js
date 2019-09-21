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
    { aa:'02', cc:'03' },
    { hd3: true, },
  ],
  [
    { ff: '03', bb: '09' },
    { hd5: true, },
  ],
  [
    { ee: '03', },
    { hd5: true, },
  ],
])
stMg.setter(
  { 
    aa: '01', 
    bb: '02', 
  },
  {
    hd1: true,
    hd2: '01',
  },
)

// console.log(stMg);

button1.addEventListener("click",function(evt){
  console.log(
    stMg.getter('hd5',{ ff: '03', bb: '09', cc: '01', }),
    stMg.getter('hd5',{ ff: '03', bb: '09', }),
    stMg.getter('hd5',{ ff: '03', }),
  );
  
  
})
console.log(stMg);

// // 针对于使用vue的项目,若使用了vuex,则可将该功能集成到 store 中 
// stMg.install(vm.$store,'stateManager');  // 注册到store中 
// vm.$store.getters['stateManager/query']('hd2',{
//   aa: '01',
//   bb: '02',
// })

