/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "./text/TextFileViewer",
   "dojo/request",
   "dojo/_base/array",
   "dojo/when",
   "dojo/dom-construct",
   "ic-core/config/services",
   "ic-core/url",
   "dojo/has"
], function (TextFileViewer, request, array, when, domConstruct, services, url, has) {
   "use strict";

   var TYPES = [ "txt", "js", "html", "sh", "feature", "css", "c", "cpp", "git", "ini", "java", "less", "m", "perl",
      "php", "py", "rb", "sql", "xml", "xsd", "xslt", "yaml", "log" ];

   function loadPrism() {
      var webresourcesUrl = url.getServiceUrl(services.webresources);

      domConstruct.create("link", {
         rel: "stylesheet",
         href: webresourcesUrl + "/web/ic-share/fileviewer/preview/text/prism.css"
      }, document.getElementsByTagName("head")[0]);

      domConstruct.create("script", {
         src: webresourcesUrl + "/web/ic-share/fileviewer/preview/text/prism.js"
      }, document.getElementsByTagName("head")[0]);
   }

   if (has("fileviewer-preview-text")) {
      loadPrism();
   }

   return {
      create: function (args) {
         var viewer = TextFileViewer.createEmptyViewer();
         viewer.previewId = "text";

         viewer.model.set("loading", true);

         when(args.file.bean.get("fullEntry"), function () {
            var filename = args.file.bean.get("name");

            request(args.file.bean.get("downloadUrl"), {
               handleAs: "text",
               withCredentials: true
            }).then(function (data) {
               viewer.model.set({
                  type: filename.slice(filename.lastIndexOf(".") + 1),
                  text: data
               });
            }, function (error) {
               console.error("An error occurred loading the file", filename, error);
               viewer.model.set({
                  error: true
               });
            });
         });

         return viewer;
      },

      isValid: function (file) {
         return has("fileviewer-preview-text") && array.indexOf(TYPES, file.bean.get("type")) > -1;
      }
   };
});
