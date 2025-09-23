/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/_base/config",
        "dojo/has"
], function(dojo, declare, config, has) {

   var Logger = declare("com.ibm.oneui.Logger", null, {

      error : function(msg) {
         try {
            if (has("ie")) {
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
            if (has("ie")) {
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
            if (has("ie")) {
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
            if (has("ie")) {
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
            if (has("ie")) {
               console.log("DEBUG: " + msg);
            }
            else {
               if (config.isDebug) {
                  console.debug.apply(console, arguments);
               }
            }
         }
         catch (ignore) {

         }
      }

   });
   return Logger;
});
