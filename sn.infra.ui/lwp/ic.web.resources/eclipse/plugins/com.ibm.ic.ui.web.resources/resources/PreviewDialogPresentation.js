/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/i18n",
        "dojo/i18n!./nls/PreviewDialog",
        "dojo/text!./templates/PreviewDialog.html",
        "dijit/_Templated",
        "dijit/_Widget"
], function(dojo, declare, i18n, i18nPreviewDialog, template, _Templated, _Widget) {

   /**
    * @class ic-ui.PreviewDialogPresentation
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   return declare("com.ibm.oneui.PreviewDialogPresentation", [
                                                       _Widget,
                                                       _Templated
   ], /** @lends ic-ui.PreviewDialogPresentation.prototype */
   {
      templateString : template,
      messages : i18nPreviewDialog,
      title : "\u00a0",

      next : function(e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         this.parent.next();
      },

      previous : function(e) {
         if (e) {
            e.preventDefault();
            e.stopPropagation();
         }
         this.parent.previous();
      },

      /**
       * Indicate whether paging up and down is available
       */
      setPaging : function(hasNext, hasPrevious) {
         this.nextNode.style.display = hasNext ? "" : "none";
         this.prevNode.style.display = hasPrevious ? "" : "none";
      },

      /**
       * Default implementation that updates the title node as a string.
       * Subclasses should handle null, deferrable, or empty items. Must support
       * strings as the first argument (for an explicit text title).
       */
      setTitle : function(title) {
         this.titleNode.firstChild.data = title || " ";
      },

      loading : function(setTitle) {
         if (setTitle) {
            this.setTitle("Loading...");
         }
         this.contentNode.innerHTML = "<div class='lotusLoading' style='min-height: 60px; background-position: center center;'></div>";
      }
   });
});
