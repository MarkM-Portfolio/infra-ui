/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.container.Views');

/**
 * Definition of 'views' interface for 
 * 	@see com.ibm.lconn.gadget.container.iContainer.views
 * 
 * This is the public API for this consumers
 * 
 * @implementedBy com.ibm.lconn.gadget.services.ViewContainer
 * @name com.ibm.lconn.gadget.container.Views
 * @class
 */
dojo.declare('com.ibm.lconn.gadget.container.Views', null, {	
	/**
	 * @memberOf com.ibm.lconn.gadget.container.Views.prototype
	 * @function
	 * @param {String} viewTarget 
	 * 		The name of the view target to associate the
	 *      handler with. <code>null</code> is an accpetable value.
	 * @param {Function} createHandler 
	 * 		The handler method for handling an open view call.
	 *      This method conforms to the createElementForGadget spec.
	 *      In addition, if your Element will display the title, please subscribe
	 *      to com.ibm.lconn.gadget.container.Topics.getSiteTopic(gadgetNodeId, com.ibm.lconn.gadget.container.Topics.SITE_TOPIC_SET_TITLE)
	 *      gadgetNodeId = the id of the node returned by your createHandler
	 * @param {Function} destroyHandler
	 * 		This handler is associated with this view target for 
	 * 		the purpose of handling destroy calls.
	 */
	registerCreateElementGadgetHandler : function(viewTarget, createHandler, destroyHandler) { },
	
	/**
	 * @memberOf com.ibm.lconn.gadget.container.Views.prototype
	 * @function
	 * @param {String} viewTarget 
	 * 		The name of the view target to associate the
	 *      handler with. <code>null</code> is an accpetable value.
	 * @param {Function} createHandler 
	 * 		The handler method for handling an open view call.
	 *      This method conforms to the createElementForEmbeddedExperience spec.
	 *      In addition, if your Element will display the title, please subscribe
	 *      to com.ibm.lconn.gadget.container.Topics.getSiteTopic(gadgetNodeId, com.ibm.lconn.gadget.container.Topics.SITE_TOPIC_SET_TITLE)
	 *      gadgetNodeId = the id of the node returned by your createHandler
	 * @param {Function} destroyHandler
	 * 		This handler is associated with this view target for 
	 * 		the purpose of handling destroy calls.
	 */
	registerCreateElementForEEHandler : function(viewTarget, createHandler, destroyHandler) { },
	
	/**
	 * @memberOf com.ibm.lconn.gadget.container.Views.prototype
	 * @function
	 * @param {String} viewTarget 
	 * 		The name of the view target to associate the
	 *      handler with. <code>null</code> is an acceptable value.
	 * @param {Function} createHandler 
	 * 		The handler method for handling an open view call.
	 *      This method conforms to the createElementForUrl spec.
	 * @param {Function} destroyHandler
	 * 		This handler is associated with this view target for 
	 * 		the purpose of handling destroy calls.
	 */
	registerCreateElementForUrlHandler : function(viewTarget, createHandler, destroyHandler) { }
});

/**
 * Internal method for 
 */
dojo.mixin(com.ibm.lconn.gadget.container.Views, {
	
	/**
	 * Hook to get implementation of the Views an _ViewContainer interfaces.
	 * @function
	 * @private
	 * @returns
	 */
	__instance__ : function() {}
	
});
