define([
   "dojo/_base/declare",
   "../../sbw/StatefulBackedTemplatedWidget",
   "dojo/text!./TextFileViewer.html",
   "./TextFileModel",
   "dojo/_base/lang",
   "dojox/html/entities"
], function (declare, StatefulBackedTemplatedWidget, template, TextFileModel, lang, entities) {
   var TYPE_MAP = {
      js: "javascript",
      html: "markup",
      xml: "markup",
      xslt: "markup",
      xsd: "markup",
      sh: "bash",
      feature: "gherkin",
      m: "matlab",
      py: "python",
      rb: "ruby"
   };

   function getLanguage(extension) {
      return TYPE_MAP[extension] || extension;
   }

   var TextFileViewer = declare([ StatefulBackedTemplatedWidget ], {
      templateString: template,

      postCreate: function () {
         this.inherited(arguments);

         this.model.watch("text", lang.hitch(this, function () {
            setTimeout(function () {
               Prism.highlightAll();
            }, 1);
         }));
      },

      _escape: function (text) {
         return entities.encode(text);
      },

      _getLanguageClass: function (extension) {
         return "language-" + getLanguage(extension);
      },

      _toggleEmpty: function (hasContent) {
         return hasContent ? "textfileviewer-nonempty" : "textfileviewer-empty";
      }
   });

   return {
      createEmptyViewer: function () {
         var model = new TextFileModel();

         return new TextFileViewer({
            model: model
         });
      }
   };
});