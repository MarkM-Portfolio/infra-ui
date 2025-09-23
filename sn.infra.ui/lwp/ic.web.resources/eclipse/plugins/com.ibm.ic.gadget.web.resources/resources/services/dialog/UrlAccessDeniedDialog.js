/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/text!./templates/UrlAccessDeniedDialog.html",
	"dijit/_Templated",
	"dijit/_Widget"
], function (dojo, declare, i18n, i18nsocialEEStrings, template, _Templated, _Widget) {

	var UrlAccessDeniedDialog = declare("com.ibm.lconn.gadget.services.dialog.UrlAccessDeniedDialog", [_Widget, _Templated], {
		widgetsInTemplate: true,
	
		nls: i18nsocialEEStrings,
		templateString: template,
		blankGif : null,
		
		errorMessage : null,
		
		constructor : function() {
			this.blankGif = dojo.config.blankGif;
			this.errorMessage = this.nls.EE_DIALOG.ERROR_MSG_CONTENT_NOT_AVAILABLE;
		}
				
	});
	return UrlAccessDeniedDialog;
});
