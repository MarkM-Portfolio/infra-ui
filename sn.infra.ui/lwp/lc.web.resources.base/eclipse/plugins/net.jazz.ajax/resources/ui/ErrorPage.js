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
dojo.provide("net.jazz.ajax.ui.ErrorPage");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.i18n");

dojo.requireLocalization("net.jazz.ajax.ui.internal", "ErrorPageMessages");

(function() {

/*
 * An error widget that appears in the content area, when
 * something has gone wrong processing a request
 * 
 * @since 0.7
 */
dojo.declare("net.jazz.ajax.ui.ErrorPage",
	[dijit._Widget, dijit._Templated], {

	templatePath: dojo.moduleUrl("net.jazz.ajax", "ui/internal/templates/ErrorPage.html"),
	
	// internal; do not call
	constructor: function () {
		this.messages = dojo.i18n.getLocalization("net.jazz.ajax.ui.internal", "ErrorPageMessages");
	},
	
	// internal; do not call
	postCreate: function() {
		if (this.message) this.setMessage(this.message);
		if (this.hideRunDefaultAction) this.setHideRunDefaultAction(this.hideRunDefaultAction);
	},
	
	// summary:
	//		Sets the text for the error page.
	// description:
	//		Callers may specify a general message and/or a message with finer-
	//		grained detail. If the caller does not specify the general message,
	//		the ErrorPage widget displays a default error message.
	// since:
	//		0.7
	setMessage: function(/*String*/message, /*String?*/finePrint) {
		this._errorMessage.innerHTML = "";
		if (message && message.nodeType) {
			this._errorMessage.appendChild(message);
		} else {
			if (!message) message = this.messages.defaultErr;
			this._errorMessage.appendChild(document.createTextNode(message));
		}
		if (finePrint) {
			var div = document.createElement("div");
			div.className = "fine-print";
			div.appendChild(document.createTextNode(finePrint));
			this._errorMessage.appendChild(div);	
		}
		this.message = message;	
	},
	
	// summary:
	//		Specifies whether or not the ErrorPage should provide a control to
	//		run the current application's default action. By default, the
	//		ErrorPage displays the 'run default action' control.
	// since:
	//		0.7
	setHideRunDefaultAction: function(/* Boolean */ hideRunDefaultAction) {
		this.hideRunDefaultAction = hideRunDefaultAction;
		if (hideRunDefaultAction === true) {
			this._runDefault.style.display = "none";
		} else {
			this._runDefault.style.display = "";
		}
	}
});

})();