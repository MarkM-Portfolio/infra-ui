/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.nav.BackToMainButton");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("com.ibm.social.as.constants.events");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.gadget.nav.BackToMainButton", 
[dijit._Widget, dijit._Templated],
{
	// strings from resource bundle
	strings_ui: null,
	strings_hpas: null,

	// src url for image
	imgSrc: null,
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "gadget/nav/templates/backToMainButton.html"),
	
	postMixInProperties: function(){
		this.strings_as = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},

	backToMain: function(){
		dojo.publish(com.ibm.social.as.constants.events.BACKTOMAIN, [{}]);
	}
});
