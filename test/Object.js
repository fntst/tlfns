import "../src/es/Object-noexport.js";

let mainObj = { 
  key1: 1, 
  key2: 2, 
}

// true 
let obj1 = { key1: 1, } 
// false 
let obj11 = { key1: 2, }
// true 
let obj12 = { key2: 2, } 
// false 
let obj13 = { key2: 1, } 
// true 
let obj3 = { key1: 1, key2: 2, }
// false 
let obj4 = { key1: 2, key2: 2, }
// false 
let obj5 = { key1: 1, key2: 3, }
// false 
let obj6 = { key1: 1, key2: 2, key3: 1,  }
// false 
let obj7 = { key1: 2, key2: 2, key3: 1,  }

console.log(
  mainObj.includes(obj1),
  mainObj.includes(obj11),
  mainObj.includes(obj12),
  mainObj.includes(obj13),
  mainObj.includes(obj3),
  mainObj.includes(obj4),
  mainObj.includes(obj5),
  mainObj.includes(obj6),
  mainObj.includes(obj7),
  
);
