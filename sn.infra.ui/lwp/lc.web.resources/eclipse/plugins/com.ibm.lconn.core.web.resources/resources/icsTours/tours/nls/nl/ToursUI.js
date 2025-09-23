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
    nextBtn: "Volgende",
    prevBtn: "Vorige",
    doneBtn: "Klaar",
    skipBtn: "Overslaan",
    closeTooltip: "Sluiten",
    prevBtnDisabled: "Vorige knop uitgeschakeld",
    nextBtnDisabled: "Volgende knop uitgeschakeld",
    tourAriaLabel: "Introductie: totaal {numSteps} stappen",
    tourThisStepAriaLabel: "Stap {thisStep} van {numSteps}."
};
})));