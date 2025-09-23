/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojo/i18n!ic-highway/nls/strings",
      "dojo/text!ic-highway/templates/messageItem.html",
      "dijit/_Widget"
], function(dojo, declare, lang, domClass, i18nstrings, template, _Widget) {

   /**
    * Widget used to build a single message item
    * 
    * @author Bill Looby
    */

   var MessageItem = declare("lconn.highway.dijit.MessageItem", [
         _Widget,
         dijit._Templated
   ], {
      // Message item template
      templateString : template,

      // The message content
      msgText : "",

      // The message type. "WARNING"|"ERROR"|"CONFIRM"|"INFO".
      msgType : null,

      // Whether contain a close button
      canClose : false,

      // Parameters in template
      msgClass : "",
      imgClass : "",
      typeAlt : "",
      closeAlt : "",
      role : "",
      msgStyle : "",

      /**
       * Set the properties for every message type. To mix the matched params to
       * template
       */
      constructor : function(obj) {
         console.log("Debug : MessageItem constructor");
         this.strings = i18nstrings;
         this.msgStyle = obj.msgStyle;
         this.WARNING = {
            type : "WARNING",
            msgClass : "lotusWarning",
            imgClass : "lconnIconMsgWarning",
            typeAlt : this.strings.msgWarningAlt,
            role : "alert"
         };
         this.ERROR = {
            type : "ERROR",
            msgClass : "",
            imgClass : "lotusIconMsgError",
            typeAlt : this.strings.msgErrorAlt,
            role : "alert"
         };
         this.CONFIRM = {
            type : "CONFIRM",
            msgClass : "lotusConfirm",
            imgClass : "lotusIconMsgSuccess",
            typeAlt : this.strings.msgConfirmAlt,
            role : "alert"
         };
         this.INFO = {
            type : "INFO",
            msgClass : "lotusInfo",
            imgClass : "lotusIconMsgInfo",
            typeAlt : this.strings.msgInfoAlt,
            role : "alert"
         };
         lang.mixin(this, this[obj.msgType]);
      },
      /**
       * Called after the widget is rendered in the UI. Render the message item
       */
      postCreate : function() {
         console.log("Debug : MessageItem postCreate");
         this.renderItem();
      },

      renderItem : function() {
         if (this.canClose) {
            domClass.remove(this.closeBtn, "lotusHidden");
         }
      },

      /**
       * Called when click the close button 'X'.
       */
      clearItem : function() {
         this.destroyRecursive();
      }
   });

   return MessageItem;
});
