import listenConsoleOpen from "../src/bom/onConsoleOpen.js";


let id = listenConsoleOpen(function(){
  alert('opened');
})
setTimeout(function(){
  console.log('clearInterval');
  clearInterval(id)
},2000)




