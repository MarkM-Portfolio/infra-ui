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
	dojo.provide("com.ibm.example.ClassExtendExample");
	dojo.require("lconn.core.aria.Toolbar");
	
	/**
	 * This example shows how to add a new method to an existing class.
	 * @namespace com.ibm.example.ClassExtendExample
	 */
	
	dojo.extend(lconn.core.aria.Toolbar, {
		reset: function() {
			// Resets the toolbar by setting the selected item to the first item...
			this.selIdx = 0;
			// ...and then focusing it.
			dijit.focus(this.allItems[this.selIdx]);
		}
	});
})();