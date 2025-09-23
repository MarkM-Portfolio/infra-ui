/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/has",
   "dojo/sniff"
], function (has) {

   var hasTextNav = has("fileviewer-panels-textnav"),
      hasResize = has("fileviewer-panels-resize"),
      hasOffice365 = has("files_office365_editor"),
      hasOffice365WithoutDocsEditor = has("fileviewer-office365-without-docseditor"),
      safari7 = has("safari") < 8,
      feature;

   feature = {
      isTextNavEnabled: function() {
         if (hasTextNav && !safari7) {
            return true;
         }
         return false;
      },

      isResizeEnabled: function() {
         if (hasResize && !safari7) {
            return true;
         }
         return false;
      },

      isOffice365Enabled: function() {
         if (hasOffice365) {
            return true;
         }
         return false;
      },

      isOffice365EnabledWithoutDocsEditor: function() {
         if (hasOffice365 && hasOffice365WithoutDocsEditor) {
            return true;
         }
         return false;
      }
   };

   return feature;
});