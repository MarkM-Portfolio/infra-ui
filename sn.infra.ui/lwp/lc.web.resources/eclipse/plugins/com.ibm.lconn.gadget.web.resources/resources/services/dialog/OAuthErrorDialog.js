/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.lconn.gadget.services.dialog.OAuthErrorDialog");

dojo.require("dijit.Dialog");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");

dojo.declare("com.ibm.lconn.gadget.services.dialog.OAuthErrorDialog", [dijit._Widget, dijit._Templated], {
	widgetsInTemplate: true,

	nls: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings"),
	templatePath: dojo.moduleUrl("com.ibm.lconn.gadget", "services/dialog/templates/OAuthErrorDialog.html"),
	blankGif : null,
	
	errorMessage : null,
	dialog : null,
	
	constructor : function() {
		var messages = this.nls.network;
		
		this.blankGif = dojo.config.blankGif;
		this.errorMessage = dojo.replace(messages.error, {again : messages.error_again},  /\$\{([^\}]+)\}/g);
		this.dialog = new dijit.Dialog();
	},
	
	show : function() {
		this.dialog.show();
		this.dialog.attr({content: this.domNode});
	},
	
	closeDialog : function() {
		this.dialog.destroy();
		this.dialog = null;
		this.destroy();
	}
		
});
