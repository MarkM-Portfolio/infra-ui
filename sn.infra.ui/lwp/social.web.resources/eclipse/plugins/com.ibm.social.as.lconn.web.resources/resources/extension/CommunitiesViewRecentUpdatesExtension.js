/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.lconn.extension.CommunitiesViewRecentUpdatesExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.extension.ViewAllExtension");

dojo.requireLocalization("com.ibm.social.as.lconn", "activitystream_lconn");

// Overrides com.ibm.social.as.extension.ViewAllUpdates to define
// custom link text, and view target for Communities use-case
dojo.declare("com.ibm.social.as.lconn.extension.CommunitiesViewRecentUpdatesExtension", 
[com.ibm.social.as.extension.ViewAllExtension],
{
	constructor: function(){
		var strings = dojo.i18n.getLocalization("com.ibm.social.as.lconn", "activitystream_lconn");
		this.linkText = strings.viewRecentUpdates;
		this.targetViewId = "RecentUpdates";
		this.linkPlacement = com.ibm.social.as.view.placeholder.location.headerCenter;
	}
});
