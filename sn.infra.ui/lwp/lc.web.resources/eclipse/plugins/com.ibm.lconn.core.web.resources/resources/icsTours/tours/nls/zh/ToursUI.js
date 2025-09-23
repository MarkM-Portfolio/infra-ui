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
    skipBtn: "跳过",
    closeTooltip: "关闭",
    prevBtnDisabled: "“上一步”按钮已禁用",
    nextBtnDisabled: "“下一步”按钮已禁用",
    tourAriaLabel: "教程：总共 {numSteps} 步",
    tourThisStepAriaLabel: "第 {thisStep} 步（总共 {numSteps} 步）。"
};
})));