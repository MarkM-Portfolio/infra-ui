/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang"
], function (declare, lang) {

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
	var ICActions = declare('com.ibm.lconn.gadget.container.ICActions', null, {
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
	lang.mixin(com.ibm.lconn.gadget.container.ICActions, {
	
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
	
	return ICActions;
});
