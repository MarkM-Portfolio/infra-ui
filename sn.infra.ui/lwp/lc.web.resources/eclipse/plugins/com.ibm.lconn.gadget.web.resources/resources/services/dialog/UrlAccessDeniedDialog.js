/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.dialog.UrlAccessDeniedDialog");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");

dojo.declare("com.ibm.lconn.gadget.services.dialog.UrlAccessDeniedDialog", [dijit._Widget, dijit._Templated], {
	widgetsInTemplate: true,

	nls: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
	templatePath: dojo.moduleUrl("com.ibm.lconn.gadget", "services/dialog/templates/UrlAccessDeniedDialog.html"),
	blankGif : null,
	
	errorMessage : null,
	
	constructor : function() {
		this.blankGif = dojo.config.blankGif;
		this.errorMessage = this.nls.EE_DIALOG.ERROR_MSG_CONTENT_NOT_AVAILABLE;
	}
			
});
