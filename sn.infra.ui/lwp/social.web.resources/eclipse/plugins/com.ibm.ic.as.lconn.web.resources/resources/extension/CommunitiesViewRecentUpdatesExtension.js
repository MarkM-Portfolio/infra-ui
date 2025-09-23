/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
define([
	"dojo",
	"dojo/_base/declare",
	"dojo/i18n!ic-as/lconn/nls/activitystream_lconn",
	"ic-as/extension/ViewAllExtension",
	"ic-as/extension/interfaces/IExtension"
], function (dojo, declare, i18nactivitystream_lconn, ViewAllExtension, IExtension) {

	// Overrides com.ibm.social.as.extension.ViewAllUpdates to define
	// custom link text, and view target for Communities use-case
	var CommunitiesViewRecentUpdatesExtension = declare("com.ibm.social.as.lconn.extension.CommunitiesViewRecentUpdatesExtension", 
	ViewAllExtension,
	{
		constructor: function(){
			var strings = i18nactivitystream_lconn;
			this.linkText = strings.viewRecentUpdates;
			this.targetViewId = "RecentUpdates";
			this.linkPlacement = com.ibm.social.as.view.placeholder.location.headerCenter;
		}
	});
	
	return CommunitiesViewRecentUpdatesExtension;
});
