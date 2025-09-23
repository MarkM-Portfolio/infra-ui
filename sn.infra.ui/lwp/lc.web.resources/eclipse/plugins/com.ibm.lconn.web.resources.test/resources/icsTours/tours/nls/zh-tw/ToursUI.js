/* Copyright IBM Corp. 2016  All Rights Reserved.                    */

// START NON-TRANSLATABLE
(function(context, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    var namespace = 'ToursUI';
    // Browser globals
    if (context[namespace]) {
      // ToursUI already exists.
      return;
    }
    context[namespace] = factory();
  }
} (this, (function() {
  return {
// END NON-TRANSLATABLE
    // Tour i18n UI strings
    nextBtn: "下一步",
    prevBtn: "上一步",
    doneBtn: "完成",
    skipBtn: "跳過",
    closeTooltip: "關閉",
    prevBtnDisabled: "「上一步」按鈕已停用",
    nextBtnDisabled: "「下一步」按鈕已停用",
    tourAriaLabel: "導覽：共 {numSteps} 步驟",
    tourThisStepAriaLabel: "步驟 {thisStep}，共 {numSteps} 個。"
};
})));