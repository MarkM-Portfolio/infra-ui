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
      nextBtn: "Další",
      prevBtn: "Předchozí",
      doneBtn: "Hotovo",
      skipBtn: "Přeskočit",
      closeTooltip: "Zavřít",
      prevBtnDisabled: "Tlačítko Předchozí je znepřístupněno",
      nextBtnDisabled: "Tlačítko Další je znepřístupněno",
      tourAriaLabel: "Prohlídka: Celkový počet kroků: {numSteps}",
      tourThisStepAriaLabel: "Krok {thisStep} z {numSteps}."
/**
     * Languages can be added using
     * "zh": true
     *
     * And specified as not available using
     * "zh": false
     */
};
})));

