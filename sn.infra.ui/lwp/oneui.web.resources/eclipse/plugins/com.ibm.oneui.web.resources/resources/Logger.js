/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {

   dojo.provide("com.ibm.oneui.Logger");

   dojo.declare("com.ibm.oneui.Logger", null, {

      constructor : function() {
         return;
      },

      error : function(msg) {
         try {
            if (dojo.isIE) {
               console.log("ERROR: " + msg);
            }
            else {
               console.error.apply(console, arguments);
            }
         }
         catch (ignore) {

         }

      },

      warn : function(msg) {
         try {
            if (dojo.isIE) {
               console.log("WARNING: " + msg);
            }
            else {
               console.warn.apply(console, arguments);
            }
         }
         catch (ignore) {

         }
      },

      info : function(msg) {
         try {
            if (dojo.isIE) {
               console.log("INFO: " + msg);
            }
            else {
               console.info.apply(console, arguments);
            }
         }
         catch (ignore) {

         }
      },

      log : function(msg) {
         try {
            if (dojo.isIE) {
               console.log(msg);
            }
            else {
               console.log.apply(console, arguments);
            }
         }
         catch (ignore) {

         }
      },

      debug : function(msg) {
         try {
            if (dojo.isIE) {
               console.log("DEBUG: " + msg);
            }
            else {
               if (dojo.config.isDebug) {
                  console.debug.apply(console, arguments);
               }
            }
         }
         catch (ignore) {

         }
      }

   });
}());
