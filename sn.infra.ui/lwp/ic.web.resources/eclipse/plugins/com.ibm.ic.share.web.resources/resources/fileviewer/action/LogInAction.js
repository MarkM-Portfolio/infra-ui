/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/globals",
   "dojo/dom-attr"
], function (declare, Action, i18n, globals, domAttr) {
   "use strict";

   var LogInAction = declare([Action], {

     postMixInProperties: function () {
       this.nls = i18n.ACTION;
       if(!this.nls.LOG_IN){
         this.title = "Log in to upload and share files, comment, and create folders";
         this.name = "Log In";
       } else{
         this.title = this.nls.LOG_IN.TOOLTIP;
         this.name = this.nls.LOG_IN.NAME; 
       }
    
       this.hide();
     },

     postCreate: function () {
       domAttr.set(this.altText, "innerHTML", "");
       this.show();
     },
     
     onLinkClicked: function () {
       globals.login();
     }
   });

   return {
      isSubItem: false, 

      create: function (args) {
         return new LogInAction(args);
      },

      isValid: function (file, args) {
          return !globals.isAuthenticated;
      },

      getClassName: function () {
         return "ics-viewer-action-login";
      }
   };
});
