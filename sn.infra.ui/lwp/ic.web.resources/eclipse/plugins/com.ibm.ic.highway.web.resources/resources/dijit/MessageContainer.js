/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/array",
      "dojo/_base/declare",
      "dijit/_Widget",
      "ic-highway/dijit/MessageItem"
], function(array, declare, _Widget, MessageItem) {

   /**
    * Simple widget to display full or small messages in a message area - can
    * display multiple or single message (overwriting previous)
    * 
    * @author Bill Looby
    */
   var MessageContainer = declare("lconn.highway.dijit.MessageContainer", _Widget, {

      msgStyle : "",

      /**
       * Create a message area -defining it as small if required
       */
      constructor : function(object) {
         if ((object != null) && (object.small)) {
            this.msgStyle = "padding: 5px !important; margin-bottom: 0px !important;"; // contract
                                                                                       // the
                                                                                       // normal
                                                                                       // message
         }
      },

      /**
       * Create a message item in the MessageContainer
       */
      createMessage : function(msg, type, canClose) {

         // Clear out the current messages (if any) before adding
         this.clearMessage();
         this.addMessage(msg, type, canClose);
      },

      /**
       * Create a message item in GlobeMessageContainer
       */
      addMessage : function(msg, type, canClose) {

         // Create a new message item and add to this widget
         var messageItem = new MessageItem({
            msgText : msg,
            msgType : type,
            canClose : canClose,
            msgStyle : this.msgStyle
         });
         this.domNode.appendChild(messageItem.domNode);
         // For accessibility
         messageItem.closeBtn.focus();
      },

      /**
       * Clear the MessageContainer
       */
      clearMessage : function() {
         // Destroy all children dijits
         array.forEach(dijit.findWidgets(this.domNode), function(widget) {
            widget.destroyRecursive();
         });
      }

   });

   return MessageContainer;
});
