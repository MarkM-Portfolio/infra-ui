/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.CommunitiesCommentExtension");

dojo.require("com.ibm.social.as.extension.CommentExtension");

dojo.declare("com.ibm.social.as.lconn.extension.CommunitiesCommentExtension", 
[com.ibm.social.as.extension.CommentExtension],
{	
	onLoginClicked: function(){
		var pageContextPath = lconn.core.url.getServiceUrl(lconn.core.config.services.communities).path;
		//dojo.cookises will encode the url, so not use it. 
		document.cookie = "CommunitiesReqURL=" + location.href + "; expires=" +
	        new Date(new Date().getTime() + 365*24*60*60*1000).toGMTString() + "; SameSite=None; path="+pageContextPath;
		location.href = pageContextPath+"/service/html/login";
	},
	
	isCommentable: function(newsData) {
		// If it's a moderated community, and user cannot contribute (i.e. not member), don't enable Comment action
		if ( window.communityType === "publicInviteOnly" && !window.activityStreamConfig.containerInfo.canContribute ) {
			return false;
		}
		
		return this.isStatusUpdateNewsItem(newsData);
	}
});
