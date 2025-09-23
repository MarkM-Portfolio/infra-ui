/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang"
], function (declare, lang) {

	/**
	 * Defines interface for a handle object to an open gadget or iWidget 
	 * @class
	 */
	var Handle = declare("com.ibm.lconn.gadget.container.Handle", null, {
		/**
		 * Display the configured widget (gadget or iWidget)
		 * @memberOf com.ibm.lconn.gadget.container.Handle.prototype
		 * @name open
		 * @function
		 * @returns {Void}
		 */
		load : function() {},
		
		/**
		 * Close the configured widget (gadget or iWidget)
		 * @memberOf com.ibm.lconn.gadget.container.Handle.prototype
		 * @name close
		 * @function
		 * @returns {Void}
		 */
		unload : function() {},
		
		/**
		 * Refresh the configured widget (gadget or iWidget)
		 * @memberOf com.ibm.lconn.gadget.container.Handle.prototype
		 * @name refresh
		 * @function
		 * @returns {Void}
		 */
		refresh : function() {
			if (this.getState() === com.ibm.lconn.gadget.container.Handle.LOADED) {
				this.unload();
				this.load();
			}
		},
		
		/**
		 * Refresh the configured widget (gadget or iWidget)
		 * @memberOf com.ibm.lconn.gadget.container.Handle.prototype
		 * @name getWidgetInfo
		 * @function
		 * @returns {Object} Promise object to that resolves to widgetInfo.
		 */
		getWidgetInfo : function() {},
			
		/**
		 * Test to see if the object is currently open
		 * @memberOf com.ibm.lconn.gadget.container.Handle.prototype
		 * @name getState
		 * @function
		 * @returns {Boolean}
		 */
		getState: function() {}
	});
	
	/**
	 * @lends com.ibm.lconn.gadget.container.Handle
	 */
	lang.mixin(com.ibm.lconn.gadget.container.Handle, {
	
		/**
		 * Indicates that the Handle is in the process of loading
		 * @constant
		 */
		LOADING : 'LOADING',	
	
		/**
		 * Indicates that the Handle is open
		 * @constant
		 */
		LOADED : 'LOADED',
		
		/**
		 * Indicates that the handle is unloaded
		 * @constant
		 */
		UNLOADED : 'UNLOADED',
		
		/**
		 * Indicates that there was an error opening the handle. Once in this state
		 * the handle cannot be opened.
		 * @constant
		 */
		ERROR : 'ERROR',
		
		/**
		 * Creates a new instance of a handle
		 * 
		 * @param accessor {Object} The accessor object for accessing the various deferrable loading objects (eg iRuntime)
		 * @param widgetSpec {Object} CRE matching widget spec
		 * @param loadPromise {Object} If loading is in progress, use this promise to resolve load complete
		 * @function
		 * @private
		 * @return {Object} Return a new instance of Handle
		 */
		__factory__ : function(accessor, widgetSpec, loadPromise) {}
	});
	return Handle;
});
