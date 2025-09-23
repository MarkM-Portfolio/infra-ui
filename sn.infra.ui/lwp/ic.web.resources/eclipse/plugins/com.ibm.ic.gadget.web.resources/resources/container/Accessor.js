/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"./Handle"
], function (declare, Handle) {

	/**
	 * Interface for Connections Container Accessor. This interface documents the
	 * accessor methods supported by
	 * <code>com.ibm.lconn.gadget.container.iContainer</code>
	 * 
	 * @class
	 */
	var Accessor = declare("com.ibm.lconn.gadget.container.Accessor", null, {
		/**
		 * Get a handle to the OpenSocial container
		 * @memberOf com.ibm.lconn.gadget.container.Accessor.prototype
		 * @name getCommonContainer
		 * @function
		 * @returns {Object} A promise to obtain the Connections OpensSocial Container singleton
		 */
		getCommonContainer : function() {},
		
		/**
		 * Get a handle to the cre$.iRuntime object
		 * @memberOf com.ibm.lconn.gadget.container.Accessor.prototype
		 * @name getIRuntime
		 * @function
		 * @returns {Object} A promise to obtain the Connections OpensSocial Container singleton
		 */
		getIRuntime : function() {}
		
	});
	
	/**
	 * Method to load CRE JS and retunrs the Accessor singleton. Container API callers should not call this directly.
	 * @see com.ibm.lconn.gadget.container.iContainer
	 * 
	 * @memberOf com.ibm.lconn.gadget.container.Accessor
	 * @name __instance__
	 * @function
	 * @private
	 * @param {Object} Optional initialization parameters for the first call.
	 * @returns {Object} The Accessor singleton
	 */
	com.ibm.lconn.gadget.container.Accessor.__instance__ = 
		com.ibm.lconn.gadget.container.Accessor.__instance__ || function(config) {};
	return Accessor;
});
