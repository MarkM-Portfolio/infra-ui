/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.RouteHelper");

dojo.require("com.ibm.social.ee.data.ProfilesRoutes");
dojo.require("com.ibm.social.as.config.ConfigManager");
dojo.require("lconn.core.url");

dojo.declare("com.ibm.social.as.util.RouteHelper", null, { 
	useOAuth: false,
	isAnonymous: false,
	inited: false,
	cfg: null,
	profilesRoutes: null,
	
	constructor: function(options){
		if(options){
			dojo.mixin(this, options);
		}
	},

	initRouteHelper: function() {
		if ( this.inited ) return;
		
		if(!this.cfg){
			this.cfg = com.ibm.social.as.configManager.getConfigObject();	
		}
		
		if ( !(this.cfg && this.cfg.userInfo && this.cfg.userInfo.id ) ) {
			this.isAnonymous = true;
		}
		
		if ( this.isGadget ) {
			this.useOAuth = asc.useOAuth || this.useOAuth;
		}
		
		this.profilesRoutes = new com.ibm.social.ee.data.ProfilesRoutes({
			oauth: this.useOAuth,
			anonymous: this.isAnonymous,
			network: this.network
		});
		
		this.inited = true;
	},
	
	getBaseOpensocialUrl: function() {
		this.initRouteHelper();
		var url = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri;
		
		if ( this.useOAuth )			url += "/oauth";
		else if ( this.isAnonymous ) 	url += "/anonymous";
		
		return url;
	},
	
	getBaseNewsUrl:function() {
		this.initRouteHelper();
		var url = lconn.core.url.getServiceUrl(lconn.core.config.services.news).uri;
		
		if ( this.useOAuth )			url += "/oauth";
		else if ( this.isAnonymous ) 	url += "/anonymous";
		
		return url;
	},
	
	getUblogRelativePath: function() {
		this.initRouteHelper();
		var url = "";
		
		if ( this.useOAuth )			url += "/oauth";
		else if ( this.isAnonymous ) 	url += "/anonymous";
		
		url += "/rest/ublog/";
		
		return url;
	},
	
	getProfilesRoutes: function(){
		this.initRouteHelper();
		return this.profilesRoutes;
	},
	
	getMBSettingsUrl: function() {
		return this.getBaseOpensocialUrl() + "/rest/ublog/@config/settings";
	},
	
	getMBDeleteUrl: function(id) {
		return this.getBaseOpensocialUrl() + "/rest/ublog/@me/@all/" + id;
	},
	
	getMBDeleteCommentUrl: function(id, cid) {
		return this.getBaseOpensocialUrl() + "/rest/ublog/@me/@all/" + id + "/comments/" + cid;

	},
	
	getMBCommentLikeUrl: function(cid) {
		return this.getBaseOpensocialUrl() + "/rest/ublog/@me/@all/" + cid + "/likes";
	},
	
	getCommentUrl: function(id) {
		return this.getBaseOpensocialUrl() + "/rest/ublog/@all/@all/" + id + "/comments";
	},

	getCommentSvcRetrievalUrl: function(id, page, count) {
		var url = this.getBaseOpensocialUrl() + "/rest/ublog/@all/@all/" + id + "/comments?sortBy=published&sortOrder=descending";
		if ( page ) 	{ url += "&startIndex=" + page; }
		if ( count ) 	{ url += "&count=" + count; }
		return url;
	},
	
	getCommentPermittedUrl: function(entryId) {
		return this.getBaseNewsUrl() + "/microblogging/isPermitted.action?action=COMMENT&entityId=" + entryId;
	},
	
	getSaveUrl: function(id) {
		return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all/" + id;
	},
	
	getUnsaveUrl: function(id) {
		return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all/" + id;
	},
	
	getActionRequiredUrl: function(id) {
		return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all/" + id;
	},
	
	getActionRequiredInitUrl: function() {
		return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@actions/@all?count=1";
	},
	
	getRepostUrl: function() {
		return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all";
    },

    getBadgesDataUrl: function() {
        return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all?count=1";
    },
    
    getBadgeResetUrl: function(id) {
        return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/" + id + "/@all?count=1&resetCounter=true";
    },

    getNotificationsForMeUrl: function() {

        var url = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri;

        return url + "/rest/activitystreams/@me/@responses";
    }

});
