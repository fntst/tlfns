
// 无导出变量相关 
import "./es/Object-noexport.js";
import "./dom/EventTarget-noexport.js";
import "./polyfill/call.js";
import "./polyfill/apply.js";
import "./polyfill/bind.js";

// ES相关
import {getThisFnName,throttle} from "./es/functions.js";
import {roundFloat,preciseAdd,preciseMul} from "./es/Number.js";
import {isEmail,validateNumber} from "./es/regexpTest.js";

// DOM相关
import copyText from "./dom/copyText.js";
import multiRowsEllipsis from "./dom/multiRowsEllipsis.js";
import onResize from "./dom/onResize.js";

// BOM相关
import {getOSName,getBrowserInfo,isIE,isLowerIE,webPAble} from "./bom/env.js";
import onConsoleOpen from "./bom/onConsoleOpen.js";

// 其他功能 
import LocalFiles from "./utils/LocalFiles.js";
import {dealQuery,formatNowTime} from "./utils/other.js";
import printLog from "./utils/printLog.js";


// 设计方案 
import adapt from "./design/adapt.js";
import StateManager from "./design/StateManager.js";
import EvtTarget from "./design/EvtTarget.js";


export default {
  getThisFnName,
  throttle,
  roundFloat,
  preciseAdd,
  preciseMul,
  isEmail,
  validateNumber,
  
  copyText,
  multiRowsEllipsis,
  onResize,
  
  getOSName,
  getBrowserInfo,
  isIE,
  isLowerIE,
  webPAble,
  onConsoleOpen,
  
  LocalFiles,
  dealQuery,
  formatNowTime,
  printLog,
  
  
  adapt,
  StateManager,
  EvtTarget,
}




