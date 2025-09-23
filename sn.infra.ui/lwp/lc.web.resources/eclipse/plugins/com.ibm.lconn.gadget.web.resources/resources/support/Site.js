/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.support.Site');

/**
 * Interface for Site object. This object abstracts the functionality used by a
 * 'site' in the context of Homepage. This code was abstracted to locate issues
 * with the current Homepage model and to find areas of reuse.
 * 
 * @class
 */
dojo.declare('com.ibm.lconn.gadget.support.Site', null, {
	/**
	 * Invokes the edit action if one exists
	 * 
	 * @memberOf com.ibm.lconn.gadget.support.Site.prototype
	 * @name edit
	 * @function
	 * @public
	 */
	edit : function() {},
	
	/**
	 * Invokes the edit action if one exists
	 * 
	 * @memberOf com.ibm.lconn.gadget.support.Site.prototype
	 * @name refresh
	 * @function
	 * @public
	 */
	refresh : function() {},
	
	/**
	 * Invokes the help action if supported by the wrapped object
	 * 
	 * @memberOf com.ibm.lconn.gadget.support.Site.prototype
	 * @name help
	 * @function
	 * @public
	 */
	help : function() {},
	
	/**
	 * Get the full page (APP) URL referenced by this widget
	 * 
	 * @memberOf com.ibm.lconn.gadget.support.Site.prototype
	 * @name getMaxUrlAsync
	 * @function
	 * @public
	 * @return {Object} A promise to obtain a URL to a web page containing a full page view of the current content
	 */
	getMaxUrlAsync : function() {},
	
	/**
	 * Gets the list of actions supported by this site.
	 * 
	 * @example
	 * 	this.site = ...;
	 * 	site.getSupportedActionsAsync().then(
	 * 		function(items) {
	 * 			var i = 0, len = items.length;
	 * 			for (; i < len; i++) {
	 * 				addToMenu(items[i]);
	 * 			}
	 * 		}, function(error) {
	 *  		console.log("Failed to retrieve items");
	 *  	});
	 * 
	 * @memberOf com.ibm.lconn.gadget.support.Site.prototype
	 * @name getSupportedActionsAsync
	 * @function
	 * @public
	 * @return {Object} Promise object that retrieves the supported actions.
	 */
	getSupportedActionsAsync : function() {}
});


/**
 * Add constants
 */
com.ibm.lconn.gadget.support.Site.Modes = {
	
	EDIT : 'edit',
	
	HELP : 'help',
	
	REFRESH : 'refresh'
	
};
