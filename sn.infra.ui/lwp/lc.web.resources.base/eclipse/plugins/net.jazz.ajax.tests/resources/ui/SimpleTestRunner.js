/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
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
dojo.provide("net.jazz.ajax.tests.ui.SimpleTestRunner");

dojo.require("dijit._Widget");
dojo.require("doh.runner");

dojo.declare("net.jazz.ajax.tests.ui.SimpleTestRunner", [dijit._Widget], {
	postCreate: function () {
		document.body.style.background = "#FFFFFF";
		if (window.parent != null && window.parent != window && window.parent.doh) {
			dojo.connect(doh, "_testRegistered", window.parent.doh, "_testRegistered");
			dojo.connect(doh, "_groupStarted", window.parent.doh, "_groupStarted");
			dojo.connect(doh, "_groupFinished", window.parent.doh, "_groupFinished");
			dojo.connect(doh, "_testStarted", window.parent.doh, "_testStarted");
			dojo.connect(doh, "_testFinished", window.parent.doh, "_testFinished");
			dojo.connect(doh, "debug", window.parent.doh, "debug");
		}
	}
});

})();
