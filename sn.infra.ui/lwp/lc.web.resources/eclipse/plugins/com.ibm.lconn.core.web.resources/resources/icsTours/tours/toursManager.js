/* Copyright IBM Corp. 2016  All Rights Reserved.                    */

(function(context, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ToursManagerClass'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    var namespace = 'toursManager';
    // Browser globals
    if (context[namespace]) {
      // toursManager already exists.
      return;
    }
    context[namespace] = factory();
  }
  
}(this, (function(ToursManagerClass) {
  
  return new ToursManagerClass();
 
})));