/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/text!./templates/Filter.html",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin"
   ], function(declare, filterTemplate, _WidgetBase, _TemplatedMixin) {

   /**
    * Base class for all widgets implementing the ICS UI Filter pattern
    * @class ic-ui.Filter
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   return declare("com.ibm.oneui.Filter", [ _WidgetBase, _TemplatedMixin ], /** @lends ic-ui.Filter.prototype */ {
      templateString : filterTemplate,

      /**
       * Strings used by the template. Callers must pass at least the string "remove"
       * @type {Object}
       */
      strings : {
      // remove: "Remove"
      },

      /**
       * The text of the filter
       * @type {String}
       */
      text : "",

      postCreate : function() {
         this.connect(this.domNode, "onclick", "notifyAndDestroy");
      },

      /**
       * Notifies connected listeners by calling {@link #onClose} and then destroys the widget
       */
      notifyAndDestroy : function() {
         this.onClose();
         this.destroy();
      },

      /**
       * Connect to this method to know when the filter is removed
       */
      onClose : function() {
         return;
      }
   });
});
