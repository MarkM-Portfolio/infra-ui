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
    nextBtn: "Següent",
    prevBtn: "Anterior",
    doneBtn: "Fet",
    skipBtn: "Ignora",
    closeTooltip: "Tanca",
    prevBtnDisabled: "Botó anterior inhabilitat",
    nextBtnDisabled: "Botó següent inhabilitat",
    tourAriaLabel: "Visita guiada: {numSteps} passos en total",
    tourThisStepAriaLabel: "Pas {thisStep} de {numSteps}."
};
})));