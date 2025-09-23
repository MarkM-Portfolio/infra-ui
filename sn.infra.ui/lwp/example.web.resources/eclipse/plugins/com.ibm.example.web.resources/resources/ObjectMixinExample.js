/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
	dojo.provide("com.ibm.example.ObjectMixinExample");
	dojo.require("lconn.core.util.html");
	dojo.require("lconn.core.DialogUtil");
	
	/**
	 * This example shows how to mix a new method into an existing object.
	 * @namespace com.ibm.example.ObjectMixinExample
	 */
	
	dojo.mixin(lconn.core.util.html, {
		// Adds a new method to the lconn.core.util.html object
		prompt: function(message, callback) {
			lconn.core.DialogUtil.prompt("Prompt", message, "Yes", "No", callback);
		}
	});
})();