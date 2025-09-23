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
    nextBtn: "التالى",
    prevBtn: "السابق",
    doneBtn: "اتمام",
    skipBtn: "تخطي",
    closeTooltip: "اغلاق",
    prevBtnDisabled: "تم الغاء اتاحة الاختيار سابق",
    nextBtnDisabled: "تم الغاء اتاحة الاختيار تالي",
    tourAriaLabel: "الجولة: اجمالي الخطوات {numSteps}",
    tourThisStepAriaLabel: "الخطوة {thisStep} من {numSteps}."
};
})));