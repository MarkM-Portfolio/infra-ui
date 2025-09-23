/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
(function() {
dojo.provide("net.jazz.ajax.core.internal.util");

dojo.require("net.jazz.ajax.toolbox.lang.internal.Lang");

var checkNotNull 	= net.jazz.ajax.toolbox.lang.checkNotNull;

/**
 * Safely calls the specified function (which presumably contains calls to component-contributed
 * code in its body) in a way that will not disrupt the workbench if an exception occurs.
 * 
 * @param {Function} fn
 */
function callContributedCode(fn) {
	//dojo.lang.assertType(fn, Function);
	
	try {
		return fn();
	} catch (e) {
		displayExceptionInfo(e);
		// Rethrow exception if we're not in IE so that it shows up in the
		// console (IE becomes unusable if an exception is thrown and not
		// caught).
		if (!dojo.isIE) {
			throw e;
		}
	}
}

net.jazz.ajax.core.internal.util.callContributedCode = callContributedCode;

function displayExceptionInfo(e) {
	var msg = e.name + ": " + e.message;
	if (dojo.config["isDebug"] && !dojo.isIE) {
		msg += "\nFile: " + e.fileName + " (Line: " + e.lineNumber + ")\n\n" +
			"Stack: " + "\n" + e.stack;
	}
	alert(msg);
}

//
// Internal events for dojo.publish
//

dojo.setObject("net.jazz.ajax.internal.events", {
	hideMessageArea: "net.jazz.ajax.internal.hideMessage",
	orderPages: "net.jazz.ajax.internal.orderPages",
	showMessage: "net.jazz.ajax.internal.showMessage",
	viewErrorPage: "net.jazz.ajax.internal.viewErrorPage",
	viewPage: "net.jazz.ajax.internal.events", // lol, why is the viewPage event "net.jazz.ajax.internal.events"
	setPageDirty: "net.jazz.ajax.internal.setPageDirty"
});

})();