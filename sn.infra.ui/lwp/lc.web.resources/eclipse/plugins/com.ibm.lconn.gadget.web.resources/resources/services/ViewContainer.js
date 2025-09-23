/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.ViewContainer');

dojo.require('com.ibm.lconn.gadget.container.Views');
dojo.require('com.ibm.lconn.gadget.services.ViewHandler');

(function(
 dojo,
 Views_,
 ViewHandler_) 
{	
	/**
	 * Implements @see com.ibm.lconn.gadget.container.Views and extends it 
	 * with methods that are needed to bind the views registry to the container.
	 */
	var Impl_ = dojo.declare('com.ibm.lconn.gadget.services.ViewContainer', [Views_], {

		/**
		 * @type {com.ibm.lconn.gadget.container.ViewHandler}
		 * @private
		 */
		_createForGadgetRegistry : null,
		
		/**
		 * @type {com.ibm.lconn.gadget.container.ViewHandler}
		 * @private
		 */
		_createForEERegistry : null,
		
		/**
		 * @type {com.ibm.lconn.gadget.container.ViewHandler}
		 * @private
		 */
		_createForUrlRegistry : null,
		
		/**
		 * @type {osapi.container.Container}
		 * @private
		 */
		_container : null,
		
		/* */
		constructor : function() {
			this._createForGadgetRegistry = new ViewHandler_("createElementForGadget");
			this._createForEERegistry = new ViewHandler_("createElementForEmbeddedExperience");
			this._createForUrlRegistry = new ViewHandler_("createElementForUrl");
		},
		
		/**
		 * @see com.ibm.lconn.gadget.container.Views.prototype.registerCreateElementGadgetHandler
		 */
		registerCreateElementGadgetHandler : function(viewTarget, createHandler, destroyHandler) { 
			return this._createForGadgetRegistry.registerHandler(viewTarget, createHandler, destroyHandler);
		},
			
		/**
		 * @see com.ibm.lconn.gadget.container.Views.prototype.registerCreateElementForEEHandler
		 */
		registerCreateElementForEEHandler : function(viewTarget, createHandler, destroyHandler) { 
			return this._createForEERegistry.registerHandler(viewTarget, createHandler, destroyHandler);
		},
			
		/**
		 * @see com.ibm.lconn.gadget.container.Views.prototype.registerCreateElementForUrlHandler
		 */
		registerCreateElementForUrlHandler : function(viewTarget, createHandler, destroyHandler) { 
			return this._createForUrlRegistry.registerHandler(viewTarget, createHandler, destroyHandler);
		},
		
		/**
		 * Binds this view container object to an instance of the common container.
		 * 
		 * @memberOf com.ibm.lconn.gadget.container._ViewsContainer.prototype
		 * @function
		 * @public
		 * @param container {osapi.container.Container}
		 * 	 Instance of common container to bind to.
		 */
		bindContainer : function(container) {
			this._container = container;
		},
		
		/**
		 * Means to hook this to container.
		 * 
		 * @memberOf com.ibm.lconn.gadget.container._ViewsContainer.prototype
		 * @function
		 * @public
		 * @see osapi.container.Container.views.createElementForGadget
		 */
		createElementForGadget : function(metadata, rel, opt_view, opt_viewTarget, opt_coordinates, parentSite) {
			return this._createForGadgetRegistry.invokeCreate(this._container, opt_viewTarget, arguments);
		},

		/**
		 * Hook to implementation.
		 * 
		 * @memberOf com.ibm.lconn.gadget.services.ViewsContainer.prototype
		 * @function
		 * @public
		 * @see osapi.container.Container.views.createElementForEmbeddedExperience
		 */
		createElementForEmbeddedExperience : function(rel, opt_gadgetInfo, opt_viewTarget, opt_coordinates, parentSite) {
			return this._createForEERegistry.invokeCreate(this._container, opt_viewTarget, arguments);
		},
		

		/**
		 * Hook to implementation.
		 * 
		 * @memberOf com.ibm.lconn.gadget.services.ViewsContainer.prototype
		 * @function
		 * @public
		 * @see osapi.container.Container.views.createElementForUrl
		 */
		createElementForUrl : function(rel, opt_viewTarget, opt_coordinates, parentSite) {
			return this._createForUrlRegistry.invokeCreate(this._container, opt_viewTarget, arguments);
		},
		
		/**
		 * Hook to implementation.
		 * 
		 * @memberOf com.ibm.lconn.gadget.services.ViewsContainer.prototype
		 * @function
		 * @public
		 * @see osapi.container.Container.views.destroyElement
		 */
		destroyElement : function(site) {
			return ViewHandler_.invokeDestroy(this._container, site, arguments);
		}
	});
	
	
	/* Setup instance */
	var instance_ = new Impl_();
		
	/* Setup instance accessor */
	Views_.__instance__ = function() {
		return instance_;
	};
})
(dojo,
 com.ibm.lconn.gadget.container.Views,
 com.ibm.lconn.gadget.services.ViewHandler);

