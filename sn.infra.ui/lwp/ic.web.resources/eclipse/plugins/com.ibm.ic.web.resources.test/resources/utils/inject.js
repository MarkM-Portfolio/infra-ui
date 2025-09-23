/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define(function() {
   return function(id, impl) {
//      if (!define._modules[id])
//         throw "Module '" + id + "' doesn't exist";
      var prev = define._modules[id];
      if (impl !== undefined) {
         define._modules[id] = impl;
      }
      return prev;
   };
});
