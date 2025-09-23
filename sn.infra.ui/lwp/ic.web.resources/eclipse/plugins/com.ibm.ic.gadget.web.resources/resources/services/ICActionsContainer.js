/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "../container/ICActions"
], function(array, declare, lang, ICActions) {

   /**
    * Implements
    * 
    * @see com.ibm.lconn.gadget.container.ICActions
    */
   var Impl_ = declare('com.ibm.lconn.gadget.services.ICActionsContainer', ICActions, {
      _renderGadgetInContainer : null,

      /* */
      constructor : function() {
         this._renderGadgetInContainer = [];
      },

      registerService : function(commonContainer) {
         commonContainer.actions.registerNavigateGadgetHandler(lang.hitch(this, this.handleGadgetSelection));
      },

      registerNavigateGadgetHandler : function(renderGadgetFunction) {
         if (typeof renderGadgetFunction === 'function') {
            this._renderGadgetInContainer.push(renderGadgetFunction);
         }
      },

      handleGadgetSelection : function(gadgetUrl, opt_params) {
         array.forEach(this._renderGadgetInContainer, function(renderGadgetFunction) {
            renderGadgetFunction(gadgetUrl, opt_params);
         });
      }
   });

   /* Setup instance */
   var instance_ = new Impl_();

   /* Setup instance accessor */
   ICActions.__instance__ = function() {
      return instance_;
   };

   return Impl_;
});
