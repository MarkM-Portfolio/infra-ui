/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.AttachedFile");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.util.text");

(function() {

   // TODO: use different templates for B, KB, MB and GB
   var SIZE_TEMPLATE = { KB: "${0} KB", MB: "${0} MB", GB: "${0} GB" };
/**
 * Widget representing a file with filename and extension as a ICS UI Filter component.
 * @class lconn.core.widget.AttachedFile
 * @extends dijit._Widget
 * @extends dijit._Templated
 * @author Cecilia Bollini <ceciliab@ie.ibm.com>
 */
dojo.declare("lconn.core.widget.AttachedFile", [ dijit._Widget,
      dijit._Templated ], /** @lends lconn.core.widget.AttachedFile.prototype */ {

   /**
    * Template path
    * @type {String}
    */
   templatePath : dojo.moduleUrl("lconn.core", "widget/templates/AttachedFile.html"),

   /**
    * Strings used by this widget. Implementors must provide them
    * @type {Object}
    */
   strings : { /*
      title: "Title for this attachment"
      remove_alt: "Title for the remove icon"
      */
   },

   /**
    * Name of the file represented by this widget
    * @type {String}
    */
   filename : "",

   /**
    * Extension of the file represented by this widget
    * @type {String}
    */
   extension: "",

   /**
    * Size of the file represented by this widget
    * @type {Number}
    */
   size : 0,

   postMixInProperties: function(props) {
      if (!this.extension) {
         this.extension = lconn.core.util.text.getExtension(this.filename);         
      }
      
      this.size = lconn.core.util.text.formatSize(SIZE_TEMPLATE, this.size);
   },

   postCreate : function() {
      // Performs the notifyAndDestroy method when the widget is clicked
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
   onClose : function() {}
});

})();
