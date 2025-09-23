/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang"
], function (declare, lang) {

	/**
	 * Defines interface for Widget/Gadget metadata
	 * @name com.ibm.lconn.gadget.container.Meta
	 * @class 
	 */
	var Meta = declare("com.ibm.lconn.gadget.container.Meta", null, {
		
		/**
		 * Creates Meta object from widget handle
		 * @param {com.ibm.lconn.gadget.container.Handle} handle - widget handle 
		 * @memberOf com.ibm.lconn.gadget.container.Meta
		 * @constructor
		 * @name constructor
		 * @function
		 */
		 constructor: function(handle) {},
		 
		/**
		 * Return promise to the max URL for this Widget
		 * @memberOf com.ibm.lconn.gadget.container.Meta
		 * @name MaxUrl
		 * @function
		 * @returns {Object} promise that resolves to widget's max url
		 */
		maxUrl : function() {},
		
		/**
		 * Return promise to the user preferences for this Widget
		 * @memberOf com.ibm.lconn.gadget.container.Meta
		 * @name userPrefs
		 * @function
		 * @returns {Object} promise that resolves to the User Prefs in Open Social gadget format.  Will resolve to NULL if no user prefs.
		 */
		userPrefs : function() {},
		
		/**
		 * Returns promise to the help link for this Widget.
		 * @memberOf com.ibm.lconn.gadget.container.Meta
		 * @name helpLink
		 * @function
		 * @returns {Object} promise that resolves to the Help Link as a string.  Will resolve to NULL if no help link.
		 */
		 
		 helpLink : function() {}
	});
	
	/**
	 * @lends com.ibm.lconn.gadget.container.Meta
	 */
	lang.mixin(com.ibm.lconn.gadget.container.Meta, {
		/**
		 * IWidget meta data
		 * @constant
		 * @private
		 */
		_WIDGET_META_ : null,
		
		/**
		 * Open Social gadget meta data
		 * @constant
		 * @private
		 */
		_GADGET_META_ : null
	});
	
	return Meta;
});
