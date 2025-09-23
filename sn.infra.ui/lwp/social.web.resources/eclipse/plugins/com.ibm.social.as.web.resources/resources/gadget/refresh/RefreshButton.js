/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.gadget.refresh.RefreshButton");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("com.ibm.social.as.constants.events");

dojo.requireLocalization("lconn.homepage", "activitystream");
dojo.requireLocalization("lconn.homepage", "hpuistrings");

dojo.declare("com.ibm.social.as.gadget.refresh.RefreshButton", 
[dijit._Widget, dijit._Templated],
{
	// strings from resource bundle
	strings_ui: null,
	strings_hpas: null,

	templatePath: dojo.moduleUrl("com.ibm.social.as", "gadget/refresh/templates/refreshButton.html"),
	
	postMixInProperties: function(){
		this.strings_ui = dojo.i18n.getLocalization("lconn.homepage", "hpuistrings");
		this.strings_hpas = dojo.i18n.getLocalization("lconn.homepage", "activitystream");
	},

	refreshStream: function(){
		dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [[]]);
	}
});
