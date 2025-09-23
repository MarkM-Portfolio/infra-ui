/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.container.ICActions');

/**
 * Definition of 'ICActions' interface for
 * 
 * @see com.ibm.lconn.gadget.container.iContainer.ICActions
 * 
 * This is the public API for this consumers
 * 
 * @implementedBy com.ibm.lconn.gadget.services.ICActionsContainer
 * @name com.ibm.lconn.gadget.container.ICActions
 * @class
 */
dojo.declare('com.ibm.lconn.gadget.container.ICActions', null, {
   /**
    * @memberOf com.ibm.lconn.gadget.container.ICActions.prototype
    * @function
    * @param {Function}
    *           renderGadgetFunction
    * 
    */
   registerNavigateGadgetHandler : function(renderGadgetFunction) {
   },
   
  /**
   * @memberOf com.ibm.lconn.gadget.container.ICActions.prototype
   * @function
   * @param {Object}
   *           commonContainer Registers the common container with the
   *           service instace.  Cannot be <code>null</code>.
   */
   registerService : function(commonContainer) {
   }
});

/**
 * Internal method for
 */
dojo.mixin(com.ibm.lconn.gadget.container.ICActions, {

   /**
    * Hook to get implementation of the ICActions and ICActionsContainer
    * 
    * @function
    * @private
    * @returns
    */
   __instance__ : function() {
   }
});
