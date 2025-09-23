/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([ "dojo/_base/lang"
], function(lang) {

   // TODO use a CSS class !!!
   lang.setObject("lconn.highway.util.styling", "getInfoBoxStyles", function(color) {
      switch (color) {
         case "GRAY":
            return "background:#eeeeee !important; border-color:#eeeeee !important;";
         case "PINK":
            return "background:#fff0f8 !important; border-color:#fff0f8 !important;";
         case "PURPLE":
            return "background:#f0eeff !important; border-color:#f0eeff !important;";
         case "BLUE":
            return "background:#ddeeff !important; border-color:#ddeeff !important;";
         default:
            return "";
      }
   });

   lang.setObject("lconn.highway.util.styling", "getInfoBoxStylesBorder", function(color) {
      switch (color) {
         case "GRAY":
            return "background:#f8f8f8 !important; border-color:#cccccc !important;";
         case "PINK":
            return "background:#fff0f8 !important; border-color:#f582d1 !important;";
         case "PURPLE":
            return "background:#f0eeff !important; border-color:#f582f5 !important;";
         case "BLUE":
            return "background:#eef8ff !important; border-color:#82d1f5 !important;";
         default:
            return "";
      }
   });
   return lconn.highway.util.styling;
});
