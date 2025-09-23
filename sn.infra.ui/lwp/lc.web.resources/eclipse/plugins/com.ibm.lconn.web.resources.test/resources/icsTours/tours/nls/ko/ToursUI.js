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
    nextBtn: "다음",
    prevBtn: "이전",
    doneBtn: "완료",
    skipBtn: "생략",
    closeTooltip: "닫기",
    prevBtnDisabled: "이전 단추 사용 안함",
    nextBtnDisabled: "다음 단추 사용 안함",
    tourAriaLabel: "둘러보기: 전체 {numSteps}단계",
    tourThisStepAriaLabel: "단계 {thisStep}/{numSteps}."
};
})));