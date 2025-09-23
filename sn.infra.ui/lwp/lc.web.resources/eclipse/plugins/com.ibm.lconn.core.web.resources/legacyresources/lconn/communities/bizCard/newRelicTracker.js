/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.communities.bizCard.newRelicTracker");

dojo.require("com.ibm.lconn.layout.insights.NewRelic");
dojo.require("com.ibm.lconn.layout.insights.tracker");

lconn.communities.bizCard.newRelicTracker = {
	prefix: "ic.communities",
	navAction: "navClicked",
	
	navAction: function(communityUuid, userUuid, widgetDef, actionId) {
		com.ibm.lconn.layout.insights.tracker.track("ic.communities.navclicked", {
			 navId:  actionId,
			 widgetDef:  widgetDef,
			 communityUuid: communityUuid,
			 userUuid: userUuid
		 });
	}	
};
