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
	dojo.provide("com.ibm.example.ClassOverrideExample");
	dojo.require("lconn.core.widget.Feeds");
	
	/**
	 * This example shows how to override a method of an existing class, by storing a reference to the original method.
	 * @namespace com.ibm.example.ClassOverrideExample
	 */
	
	// Store a reference to the original implementation
	var _decorate = lconn.core.widget.Feeds.prototype.decorate
	
	dojo.extend(lconn.core.widget.Feeds, {
		decorate: function(a, l) {
			// Replaces the href of all feeds to an arbitrary URL
			a.href = "http://www.example.com/feed.xml";
			// Calls original implementation
			_decorate.apply(this, arguments);
		}
	});
})();