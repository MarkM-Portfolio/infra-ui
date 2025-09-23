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
    nextBtn: "Næste",
    prevBtn: "Forrige",
    doneBtn: "Udført",
    skipBtn: "Spring over",
    closeTooltip: "Luk",
    prevBtnDisabled: "Knappen Forrige er deaktiveret",
    nextBtnDisabled: "Knappen Næste er deaktiveret",
    tourAriaLabel: "Tur: {numSteps} trin i alt",
    tourThisStepAriaLabel: "Trin {thisStep} af {numSteps}."
};
})));
