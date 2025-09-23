/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Widget to show the Shared Externally message block
 * 
 * @author Marco Vicente
 */

dojo.provide("com.ibm.social.as.item.SharedExternally");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.item.SharedExternally", 
		[dijit._Widget, dijit._Templated], {
	
	// Resource bundle
	strings: null,
	
	// Path to the template HTML
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/sharedExternally.html"),
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		// Get the strings bundle
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	}
});
