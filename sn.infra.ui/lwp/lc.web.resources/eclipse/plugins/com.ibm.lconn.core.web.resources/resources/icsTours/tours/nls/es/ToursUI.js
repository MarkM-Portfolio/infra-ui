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
    nextBtn: "Siguiente",
    prevBtn: "Anterior",
    doneBtn: "Aceptar",
    skipBtn: "Ignorar",
    closeTooltip: "Cerrar",
    prevBtnDisabled: "Botón Anterior inhabilitado",
    nextBtnDisabled: "Botón Siguiente inhabilitado",
    tourAriaLabel: "Visita guiada: {numSteps} pasos en total",
    tourThisStepAriaLabel: "Paso {thisStep} de {numSteps}."
};
})));