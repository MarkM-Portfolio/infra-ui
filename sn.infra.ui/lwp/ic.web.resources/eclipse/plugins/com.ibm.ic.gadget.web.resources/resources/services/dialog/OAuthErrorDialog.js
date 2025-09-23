/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/i18n",
//      "dojo/i18n!ic-ee/nls/socialEEStrings",
      "dojo/text!./templates/OAuthErrorDialog.html",
      "dijit/Dialog",
      "dijit/_Templated",
      "dijit/_Widget"
], function(dojo, declare, lang, i18n, /*i18nsocialEEStrings,*/ template, Dialog, _Templated, _Widget) {

   var OAuthErrorDialog = declare("com.ibm.lconn.gadget.services.dialog.OAuthErrorDialog", [
         _Widget,
         _Templated
   ], {
      widgetsInTemplate : true,

      nls : {network:{error_again:''}},//i18nsocialEEStrings,
      templateString : template,
      blankGif : null,

      errorMessage : null,
      dialog : null,

      constructor : function() {
         var messages = this.nls.network;

         this.blankGif = dojo.config.blankGif;
         this.errorMessage = lang.replace(messages.error, {
            again : messages.error_again
         }, /\$\{([^\}]+)\}/g);
         this.dialog = new Dialog();
      },

      show : function() {
         this.dialog.show();
         this.dialog.get({
            content : this.domNode
         });
      },

      closeDialog : function() {
         this.dialog.destroy();
         this.dialog = null;
         this.destroy();
      }

   });
   return OAuthErrorDialog;
});
