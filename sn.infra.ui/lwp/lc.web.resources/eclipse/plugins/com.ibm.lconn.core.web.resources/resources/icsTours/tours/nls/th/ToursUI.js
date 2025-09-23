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
      nextBtn: "ถัดไป",
      prevBtn: "ก่อนหน้านี้",
      doneBtn: "เสร็จสิ้น",
      skipBtn: "ข้าม",
      closeTooltip: "ปิด",
      prevBtnDisabled: "ปุ่มก่อนหน้านี้ถูกปิดใช้งาน",
      nextBtnDisabled: "ปุ่ม ถัดไป ปิดใช้งาน",
      tourAriaLabel: "ทัวร์: {numSteps} ขั้นตอนทั้งหมด",
      tourThisStepAriaLabel: "ขั้นตอน {thisStep} ของ {numSteps}."
/**
     * Languages can be added using
     * "zh": true
     *
     * And specified as not available using
     * "zh": false
     */
};
})));

