/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/config/ConfigManager",
		"ic-core/config/services",
		"ic-core/url",
		"ic-ee/data/ProfilesRoutes"
	], function (declare, lang, ConfigManager, services, urlModule, ProfilesRoutes) {
	
		var RouteHelper = declare("com.ibm.social.as.util.RouteHelper", null, { 
			useOAuth: false,
			isAnonymous: false,
			inited: false,
			cfg: null,
			profilesRoutes: null,
			
			constructor: function(options){
				if(options){
					lang.mixin(this, options);
				}
			},
		
			initRouteHelper: function() {
				if ( this.inited ) return;
				
				if(!this.cfg){
					this.cfg = ConfigManager.getConfigObject();	
				}
				
				// if ( !(this.cfg && this.cfg.userInfo && this.cfg.userInfo.id ) ) {
				// 	this.isAnonymous = true;
				// }
				
				if ( this.isGadget ) {
					this.useOAuth = asc.useOAuth || this.useOAuth;
				}
				
				this.profilesRoutes = new ProfilesRoutes({
					oauth: this.useOAuth,
					anonymous: this.isAnonymous,
					network: this.network
				});
				
				this.inited = true;
			},
			
			getBaseOpensocialUrl: function() {
				this.initRouteHelper();
				var url = urlModule.getServiceUrl(services.opensocial).uri;
				
				if ( this.useOAuth )			url += "/oauth";
				else if ( this.isAnonymous ) 	url += "/anonymous";
				
				return url;
			},
			
			getBaseNewsUrl:function() {
				this.initRouteHelper();
				var url = urlModule.getServiceUrl(services.news).uri;
				
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

		    getMarkAllReadUrl: function() {
				return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all/@all";
		    },
		
		    getBadgesDataUrl: function() {
		        return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/@all/@all?count=1";
		    },
		    
		    getBadgeResetUrl: function(id) {
		        return this.getBaseOpensocialUrl() + "/rest/activitystreams/@me/" + id + "/@all?count=1&resetCounter=true";
		    },
		
		    getNotificationsForMeUrl: function() {
		
		        var url = urlModule.getServiceUrl(services.opensocial).uri;
		
		        return url + "/rest/activitystreams/@me/@responses/@all";
		    },

		    getNotificationsLivePreviewPreferences: function() {
		
		        var url = urlModule.getServiceUrl(services.opensocial).uri;
		
		        return url + "/rest/people/@me/@self?fields=userSettings.LIVEPREVIEW_MENTIONS,userSettings.LIVEPREVIEW_NOTIFICATIONS";
		    },			   

		    getNotificationsForMeWebUrl: function() {
		
		        var url = urlModule.getServiceUrl(services.homepage).uri;
		
		        return url + "/web/updates/#myNotifications/forme/all";
		    },
		    
		    getActivityByIDUrl: function(id){
		    	var url = urlModule.getServiceUrl(services.opensocial).uri;
		        return url + "/rest/activitystreams/@me/@all/@all/"+id;
		    }
		});

		RouteHelper._Instance = null;
		  
		RouteHelper.getInstance = function(){
			if(RouteHelper._Instance == null){
				RouteHelper._Instance = new RouteHelper();				
		  	}
		  	return RouteHelper._Instance;
		}
		
		return RouteHelper;
	});
