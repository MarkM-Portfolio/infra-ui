/* Copyright IBM Corp. 2012, 2014  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/text!./templates/AttachedFile.html",
      "dijit/_Templated",
      "dijit/_Widget",
      "../util/text"
], function(declare, template, _Templated, _Widget, text) {

   // TODO: use different templates for B, KB, MB and GB
   var SIZE_TEMPLATE = {
      KB : "${0} KB",
      MB : "${0} MB",
      GB : "${0} GB"
   };
   /**
    * Widget representing a file with filename and extension as a ICS UI Filter
    * component.
    * 
    * @class ic-core.widget.AttachedFile
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @author Cecilia Bollini <ceciliab@ie.ibm.com>
    */
   var AttachedFile = declare("lconn.core.widget.AttachedFile", [
         _Widget,
         _Templated
   ], /** @lends ic-core.widget.AttachedFile.prototype */
   {

      /**
       * Template path
       * 
       * @type {String}
       */
      templateString : template,

      /**
       * Strings used by this widget. Implementors must provide them
       * 
       * @type {Object}
       */
      strings : { /*
                   * title: "Title for this attachment" remove_alt: "Title for
                   * the remove icon"
                   */
      },

      /**
       * Name of the file represented by this widget
       * 
       * @type {String}
       */
      filename : "",

      /**
       * Extension of the file represented by this widget
       * 
       * @type {String}
       */
      extension : "",

      /**
       * Size of the file represented by this widget
       * 
       * @type {Number}
       */
      size : 0,

      postMixInProperties : function(props) {
         if (!this.extension) {
            this.extension = text.getExtension(this.filename);
         }

         this.size = text.formatSize(SIZE_TEMPLATE, this.size);
      },

      postCreate : function() {
         // Performs the notifyAndDestroy method when the widget is clicked
         this.connect(this.domNode, "onclick", "notifyAndDestroy");
      },

      /**
       * Notifies connected listeners by calling {@link #onClose} and then
       * destroys the widget
       */
      notifyAndDestroy : function() {
         this.onClose();
         this.destroy();
      },

      /**
       * Connect to this method to know when the filter is removed
       */
      onClose : function() {}
   });

   return AttachedFile;
});
