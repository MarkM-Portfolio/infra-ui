/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo/i18n!../nls/Recommender",
   "dojo/_base/declare",
   "dijit/_Templated",
   "../_base",
   "dojo/text!../templates/PopupContents.html"
   ], function(i18nRecommender, declare, _Templated, _base, template) {

   /**
    * FIXME: This seems a redundant wrapper around a person object. Remove if possible
    * @class ic-ui.recommend.internal.PopupContents
    * @extends ic-ui.recommend._base
    * @extends dijit._Templated
    * @private
    */
   return declare("com.ibm.oneui.recommend.internal.PopupContents", [_base, _Templated], {
      mail: null,
      cn: null,
      dn: null,
      displayName: null,
      templateString: template,
      widgetsInTemplate: true,
      isAuthenticated:  true,
      strings: null,
      
      postMixInProperties: function () {
         this.isAuthenticated = (this.currentUserId != null);
      },
      
      buildRendering: function() {
         this.inherited(arguments);
                     this.strings = i18nRecommender;  
      }
   }); 
});
