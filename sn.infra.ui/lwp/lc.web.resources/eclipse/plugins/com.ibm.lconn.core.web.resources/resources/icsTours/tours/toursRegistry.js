/* Copyright IBM Corp. 2016  All Rights Reserved.                    */

(function(context, factory) {
  'use strict';

  if (true || typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./ToursRegistryClass'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    var namespace = 'toursRegistry';
    // Browser globals
    if (context[namespace]) {
      // toursRegistry already exists.
      return;
    }
    context[namespace] = factory();
  }
  
}(this, (function(ToursRegistryClass) {
  
  return new ToursRegistryClass();
 
})));