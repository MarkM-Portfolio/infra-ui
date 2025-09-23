/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

define([
   "dojo/has",
   "ic-core/config/properties"
], function (has, properties) {
   "use strict";

   var documentTypes = {
      view: [ "doc", "docx", "odt", "xls", "xlsx", "ods", "ppt", "pptx", "odp", "pdf", "xlsm",
              "ott", "dot", "dotx", "ots", "xlt", "xltx", "otp", "pot", "potx","rtf","txt" ],
      edit: [ "ppt", "odp", "ods", "xls", "txt", "csv", "docx", "doc", "odt", "pptx", "xlsx", "xlsm" ],
      create: ["ott", "ots", "otp", "dot", "xlt", "pot", "dotx", "xltx", "potx"]
   }

   if (has('fileviewer-dynamic-filetypes')) {
      Object.keys(documentTypes).forEach(function (key) {
         var additionalTypes = properties['com.ibm.docs.types.' + key];
   
         if (additionalTypes) {
            documentTypes[key] = documentTypes[key].concat(additionalTypes.split(','));
         }
      });
   }

   return documentTypes;
});
