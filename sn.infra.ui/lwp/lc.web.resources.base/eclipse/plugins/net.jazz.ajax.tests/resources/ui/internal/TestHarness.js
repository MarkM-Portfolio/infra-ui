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
dojo.provide("net.jazz.ajax.tests.ui.internal.TestHarness");

dojo.require("net.jazz.ajax.ui.PlatformUI");
dojo.require("net.jazz.ajax.ui._Application");
dojo.require("net.jazz.ajax.tests.ui.internal.widget.TestHarnessWidget");

dojo.declare("net.jazz.ajax.tests.ui.internal.TestHarness", net.jazz.ajax.ui._Application, {

    constructor: function() {
        this._createUI();
        this.start();
    },

    _createUI: function() {
		var testModule;
		var qstr = window.location.search.substr(1);
		if (qstr.length) {
		    var qparts = qstr.split("&");
		    for (var x=0; x<qparts.length; x++) {
		        var tp = qparts[x].split("=");
		        if (tp[0] == "testModule") {
		            testModule = tp[1];
		        }
		    }
		}
        var testHarness = new net.jazz.ajax.tests.ui.internal.widget.TestHarnessWidget({
			testRunnerSrc: net.jazz.ajax._contextRoot + "/_ajax-modules/" + testModule 
		}, net.jazz.ajax.ui.PlatformUI.getWorkbench().rootNode());
    }
});

})();

