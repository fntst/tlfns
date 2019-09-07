
// 无导出变量相关 
import "./es/Object-noexport.js";
import "./dom/EventTarget-noexport.js";
import "./polyfill/call.js";
import "./polyfill/apply.js";
import "./polyfill/bind.js";


import {getThisFnName,throttle} from "./es/functions.js";
import {roundFloat,preciseAdd,preciseMul} from "./es/Number.js";
import EvtTarget from "./extend/EvtTarget.js";
import printLog from "./extend/printLog.js";
import adapt from "./utils/adapt.js";
import copyText from "./utils/copyText.js";
import {getOSName,getBrowserInfo,isIE,isLowerIE,webPAble} from "./utils/env.js";
import listenResize from "./utils/listenResize.js";
import LocalFiles from "./utils/LocalFiles.js";
import multiRowsEllipsis from "./utils/multiRowsEllipsis.js";
import {dealQuery,formatNowTime} from "./utils/other.js";
import {isEmail,validateNumber} from "./utils/regexpTest.js";

export default {
  getThisFnName,
  throttle,
  roundFloat,
  preciseAdd,
  preciseMul,
  EvtTarget,
  printLog,
  adapt,
  copyText,
  getOSName,
  getBrowserInfo,
  isIE,
  isLowerIE,
  webPAble,
  listenResize,
  LocalFiles,
  multiRowsEllipsis,
  dealQuery,
  formatNowTime,
  isEmail,
  validateNumber,
}






