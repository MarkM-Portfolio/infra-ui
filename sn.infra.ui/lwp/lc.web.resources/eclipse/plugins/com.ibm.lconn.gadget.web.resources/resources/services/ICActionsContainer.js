/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.ICActionsContainer');

dojo.require('com.ibm.lconn.gadget.container.ICActions');

(function(dojo, ICActions_) {
   /**
    * Implements
    * 
    * @see com.ibm.lconn.gadget.container.ICActions
    */
   var Impl_ = dojo.declare('com.ibm.lconn.gadget.services.ICActionsContainer',
         [ ICActions_ ], {
            _renderGadgetInContainer : null,

            /* */
            constructor : function() {
               this._renderGadgetInContainer = [];
            },

            registerService : function(commonContainer) {
               commonContainer.actions.registerNavigateGadgetHandler(dojo
                     .hitch(this, this.handleGadgetSelection));
            },

            registerNavigateGadgetHandler : function(renderGadgetFunction) {
               if (typeof renderGadgetFunction === 'function') {
                  this._renderGadgetInContainer.push(renderGadgetFunction);
               }
            },

            handleGadgetSelection : function(gadgetUrl, opt_params) {
               dojo.forEach(this._renderGadgetInContainer, function(
                     renderGadgetFunction) {
                  renderGadgetFunction(gadgetUrl, opt_params);
               });
            }
         });

   /* Setup instance */
   var instance_ = new Impl_();

   /* Setup instance accessor */
   ICActions_.__instance__ = function() {
      return instance_;
   };
})(dojo, com.ibm.lconn.gadget.container.ICActions);
