/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/_base/array",
		"dojo/i18n!ic-homepage/nls/activitystreamconfig",
		"ic-as/util/xhr/XhrHandler",
		"ic-core/config/properties",
		"ic-core/config/services",
		"ic-core/url",
		"ic-core/util/LCDeferred",
		"ic-core/util/promises",
		"ic-incontext/util/auth"
	], function (dojo, lang, declare, i18nactivitystream, array, i18nactivitystreamconfig, XhrHandler, properties, services, urlModule, LCDeferred, promises, auth) {
	
		/**
		 * Utility class for generating AS config for AS gadgets
		 * @author BrianOG
		 */
		var ActivityStreamConfigUtil = declare("com.ibm.social.as.gadget.ActivityStreamConfigUtil", null,
		{
			strings: null,
			stringsHp: null,
			coreFilters: null,
			svcs: null,
			xhrHandler: null,
			thirdPartyApps: null,
			isExternalUser: null,
			
			constructor: function(){
				this.strings = i18nactivitystream;
				this.stringsHp = i18nactivitystreamconfig;
				this.svcs = lang.mixin({}, services);
				this.xhrHandler = XhrHandler;
			},
			
			getASConfig: function(opts) {
				as_console_debug("ActivityStreamConfigUtil - getASConfig - entering");
				var cfg = {};
				
				var cfgPromise = this.attachUserInfo(cfg)
					.then(lang.hitch(this, "getThirdPartyApps"))
					.then(lang.hitch(this, function() {
						lang.mixin(cfg, this.buildConfig(opts, cfg.userInfo));
						return cfg;
					}));
				
				as_console_debug("ActivityStreamConfigUtil - getASConfig - exiting - returning promise : ", cfgPromise);
				
				return cfgPromise;
			},
			
			buildConfig: function(opts, userInfo) {
				as_console_debug("ActivityStreamConfigUtil - buildConfig - building config");
				
				// handle guest users for SC - they only have access to Activities & Files
				// Fake all other services as being unavailable
				if ( userInfo.orgId === "0" ) {
					for ( var s in this.svcs ) {
						if ( this.svcs.hasOwnProperty(s) && s != "activities" && s != "files" ) {
							delete this.svcs[s];
						}
					}
					
					this.thirdPartyApps = null;
				}
				
				var cfg = this._getConfig(opts, userInfo);
				
				// If microblogging service disabled, remove Status Updates and @Mentions views
				// Using delete to remove them, instead of conditionally adding them to maintain the order
				if ( !services["microblogging"] ) {
					delete cfg.views.myStream.filters.options.statusUpdates;
					delete cfg.views.atMentions;
				}
				
				
				// If user is external remove the discover view
				if (userInfo.isExternal === "true") {
					delete cfg.views.myStream.filters.options.discover;
				}
				
				this.configureFromGadgetOpts(cfg);
				
				as_console_debug("ActivityStreamConfigUtil - buildConfig - returning config: ", cfg);
				return cfg;
			},
			
			_buildFollowingView: function(userInfo){
				var following;
				var sharedViews;
				if(asc.type=="narrow"){
					following = {imFollowing : this.buildImFollowingView(),
					statusUpdates : this.buildStatusUpdatesView(userInfo),
					discover : this.buildDiscoverView()};
				}else{
					following = {myStream: 	this.buildMyStreamView(userInfo)};	
				}
				sharedViews = {
				atMentions:      this.buildAtMentionsView(),
				myNotifications: this.buildMyNotificationsView(),
				actionRequired:  this.buildActionRequiredView(),
				saved: 			 this.buildSavedView() };
				
				return lang.mixin(following, sharedViews);
			},
			
			_getConfig: function(opts, userInfo) {
				var osSvcUrl = urlModule.getServiceUrl(services.opensocial).uri;
				var cfg;
				if ( opts.mode === "home" ) {
					
					cfg = {
						defaultUrlTemplate : osSvcUrl + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/${userId}/${groupId}/${appId}",
						defaultUrlTemplateValues : { userId : "@public", groupId : "@all", appId : "@all" },
						views: this._buildFollowingView(userInfo),
						extensions: ["lconn.homepage.as.extension.UpdateBadgeMyNotificationsExtension",
						             "lconn.homepage.as.extension.UpdateBadgeMentionsExtension"]
					};
				} else if ( opts.mode === "profile" ) {
					cfg = {
						defaultUrlTemplate: osSvcUrl + (asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/urn:lsid:lconn.ibm.com:profiles.person:${userId}/${groupId}/${appId}",
						defaultUrlTemplateValues: { userId: opts.profileId, groupId: "@involved" },
						views: {
							profile:	this.buildProfileView(opts.profileId, opts.singleEntryId)
						},
						extensions: [ "com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension" ]
					};
				}
				
				cfg.eeManager = "com.ibm.social.as.ee.EEManagerGadget";
				cfg.extensions = cfg.extensions.concat([
					"com.ibm.social.as.extension.CommentExtension",
					"com.ibm.social.as.gadget.refresh.RefreshButtonExtension",
					"com.ibm.social.as.extension.TrendingExtension",
					"com.ibm.social.as.extension.RepostExtension",
					"com.ibm.social.as.lconn.extension.MicroblogDeletionExtension"
				]);
				return cfg;
			},
			
			getUserInfo: function() {
				as_console_debug("ActivityStreamConfigUtil - getUserInfo - entering");
				
				var osSvc = urlModule.getServiceUrl(services["opensocial"]).uri;
				var url = osSvc + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/people/@me/@self";
				
				// allow errors to bubble through, do not intercept.
				var promise = promises.deferredToPromise(this.xhrHandler.xhrGet({
					url: url,
					handleAs: "json"
				}))
		        .then(function(resp){
		            var user = auth.parseUserFromOpensocialResponse(resp);
		            return user;
		        });
				
				as_console_debug("ActivityStreamConfigUtil - getUserInfo - exiting - returning promise: ", promise);
				this.getUserInfo = function(){
					return promise;
				};
				return promise;
			},
		
		    attachUserInfo: function(cfg) {
		        return this.getUserInfo().then(function(ui) {
		            cfg.userInfo = ui;
		            // if there isnt a user in window.currentViewer, put it there
		            var hasCurrentViewer = auth.hasCurrentViewer();
		            if(!hasCurrentViewer){
		                auth.setCurrentViewer(ui);
		                lconn.core.auth.setAuthCheck(function () {
		                    return auth.hasCurrentViewer();
		                });
		            }
		            return cfg;
		        });
		    },
		
			getUserFromEmail: function(email) {
				as_console_debug("ActivityStreamConfigUtil - getUserFromEmail - entering");
				
				var osSvc = urlModule.getServiceUrl(services["opensocial"]).uri;
				var url = osSvc + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/people/@public/@all?filterBy=email&filterOp=contains&filterValue=" + email;
				
				// allow errors to bubble through, do not intercept.
				var promise = promises.deferredToPromise(this.xhrHandler.xhrGet({
					url: url,
					handleAs: "json"
				}))
				.then(lang.hitch(this, "resolveUserFromEmail"));
				
				as_console_debug("ActivityStreamConfigUtil - getUserFromEmail - exiting - returning promise: ", promise);
				return promise;
			},
			
			resolveUserFromEmail: function(resp) {
				as_console_debug("ActivityStreamConfigUtil - getUserFromEmail - loaded, ", arguments);
		
		        var user = auth.parseUser(resp.totalResults == 1 && resp && resp.list && resp.list[0]);
				
				if(user) {
					as_console_debug("ActivityStreamConfigUtil - getUserFromEmail - resolving with, ", user);
					return user;
				}
				else {
					as_console_debug("ActivityStreamConfigUtil - getUserFromEmail - no user found for email, ", resp);
					resp.noUser = true;
					resp.log=false;
					throw resp;
				}
			},
			
			getThirdPartyApps: function() {
				as_console_debug("ActivityStreamConfigUtil - getThirdPartyApps - entering");
				
				var osSvc = urlModule.getServiceUrl(services["opensocial"]).uri;
				var url = osSvc + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/@me/@applications";
		
				// allow errors to bubble through, do not intercept.
				var promise = promises.deferredToPromise(this.xhrHandler.xhrGet({
					url: url,
					handleAs: "json"
				}))
				.then(lang.hitch(this, "resolveThirdPartyApps"));
				
				as_console_debug("ActivityStreamConfigUtil - getThirdPartyApps - exiting - returning promise: ", promise);
				this.getThirdPartyApps = function(){
					return promise;
				};
				return promise;
			},
			
			resolveThirdPartyApps: function(resp) {
				as_console_debug("ActivityStreamConfigUtil - getThirdPartyApps - loaded, ", arguments);
				var list = ( resp && resp.list ) || [];
				var apps = [];
				for ( var i = list.length-1; i>=0; i-- ) {
					var a = list[i];
					if ( a && a.generator ) {
						// need to filter out Connections services
						// check if the generator id is a connections service
						var svc = a.generator.id;
						if ( svc == "bookmarks" ) svc = "dogear";
						if ( !services[svc] ) {
							apps.push({ id: svc, displayName: a.generator.displayName });
						}
					}
				}
				this.thirdPartyApps = apps;
				as_console_debug("ActivityStreamConfigUtil - getThirdPartyApps - resolving with, ", apps);
				return apps;
			},
			
			/**
			 * 
			 * @param options The filterOptions that the new options need to be added to
			 * @param mixins If extra stuff needed in the filters (e.g. subFilter), can be added here.
			 * Note: This is mixed into the filter option after it is created.
			 * 
			 */
			addThirdPartyAppsToFilter: function(options, mixins) {
				if ( ! (this.thirdPartyApps && this.thirdPartyApps.length > 0 ) ) {
					return; // nothing to add
				}
				
				// add a option for each 3rd party app to the options
				for ( var i=this.thirdPartyApps.length-1; i>=0; i-- ) {
					var app = this.thirdPartyApps[i];
					options[app.id] = this.bldFilter({l: app.displayName, a: app.id});
					if ( mixins ) {
						lang.mixin(options[app.id], mixins);
					}
				}
			},	
			
			buildMyStreamView: function(userInfo){
				return {
					label: this.stringsHp.mystreamLabel,
					description: this.stringsHp.mystreamDescription,
					filters : {
						type:asc.type=="narrow" ? "default" : "links",
						label : this.strings.viewFilterLabel,
						options : {
							imFollowing : this.buildImFollowingView(),
							statusUpdates : this.buildStatusUpdatesView(userInfo),
							discover : this.buildDiscoverView()
						}
					}
				};
			},
			
			buildImFollowingView: function() {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.imfollowingLabel,
					description: this.stringsHp.imfollowingDescription,
					params : { userId : "@me", rollup : "true" },
		//			extensions : [ "lconn.homepage.as.extension.SavedActionExtension", "lconn.homepage.as.extension.UnfollowExtension", "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension" ],
					extensions : [ 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension",
					    "com.ibm.social.as.extension.TrendingExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all : { label :st.filterAll, params : { appId : "@all" },extensions: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"] }
						}
					}
				};
		
				var o = view.filters.options;
				if ( s.microblogging ) {
					o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@status", b: true, e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]});
					o.statusUpdates.params.excludeNetwork = true;
				}
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries = 	bf({l: st.filterLibraries, 		a: "ecm_files"}); }	
				if ( s.profiles ) { 
					o.profiles = bf({l: st.filterPeople,			a: "@people"});
					o.profiles.params.excludeNetwork = true;
				}
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
				
				return view;
			},
			
			buildStatusUpdatesView: function(userInfo) {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.statusupdatesLabel,
					description: this.stringsHp.statusupdatesDescription,
					params : { userId : "@me", appId: "@status", rollup : "true" },
					extensions : [ 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension",
					    "com.ibm.social.as.extension.TrendingExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all:				bf({l: st.filterAll, g: "@all",e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]}),
							networkAndFollow: 	bf({l: st.filterMyNetworkAndPeopleIFollow, g: "@following&@friends"}),
							myNetwork:			bf({l: st.filterMyNetwork, g: "@friends"}),
							people:				bf({l: st.filterPeopleIFollow,g: "@following"}),
							myUpdates:			bf({l: st.filterMyUpdates,g: "@self", e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]})
						}
					}
				};
		
		    if ( s.communities ) {
					view.filters.options.communities = bf({l: st.filterCommunities, g: "@all", a: "communities", b: true});
				}
		
				// add, then conditionally delete, to maintain order/position in list
				if ( properties["com.ibm.social.as.noNetwork"] === "true" || userInfo.isExternal ) {
					delete view.filters.options.networkAndFollow;
					delete view.filters.options.myNetwork;
				}
				if(userInfo.isExternal){
					delete view.filters.options.people;
				}
				
				
				return view;
			},
			
			buildAtMentionsView: function() {
				var view = {
						label: this.stringsHp.atmentionsLabel,
						description: this.stringsHp.atmentionsDescription,
						params: { userId: "@me", groupId: "@mentions", appId: "@all" },
						extensions : [ 
						    "lconn.homepage.as.extension.SavedActionExtension", 
						    "lconn.homepage.as.extension.ActivityReplyExtension"				 
						]	
				};
				
				if(asc.isInlineCommentingEnabled === undefined || asc.isInlineCommentingEnabled){
					view.extensions.push("com.ibm.social.as.extension.CommentLinkToEEExtension");
				}
					
				//add in a placholder for all on subfilter in narrow view only
				if(asc.type=="narrow"){
					view.filters = {
						label : this.strings.filterOneLabel,
						options : {
							all: this.bldFilter({l: this.strings.filterAll, a: "@all"})
						}
					};
				}
				
				return this.nestSubMenu(view);
			},
			
			buildActionRequiredView: function() {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.actionrequiredLabel,
					description: this.stringsHp.actionrequiredDescription,
					params : { userId : "@me", groupId: "@actions" },
					extensions : [ 
					    "lconn.homepage.as.extension.ActionRequiredViewExtension", 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "lconn.homepage.as.extension.ActivityReplyExtension", 
					    "lconn.homepage.as.extension.NetworkInviteExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all: bf({l: st.filterAll, a: "@all", e: ["lconn.homepage.as.extension.UpdateBadgeExtension"]})
						}
					}
				};
				
				var o = view.filters.options;
				
				if ( s.microblogging )	{ o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true}); }
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
				if ( s.profiles )		{ o.profiles =		bf({l: st.filterProfiles,		a: "profiles"}); }
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
		
				return this.nestSubMenu(view);
			},
			
			buildSavedView: function() {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.savedLabel,
					description: this.stringsHp.savedDescription,
					params : { userId : "@me", groupId: "@saved" },
					extensions : [ 
					    "lconn.homepage.as.extension.SavedViewExtension", 
					    "lconn.homepage.as.extension.ActivityReplyExtension", 
					    "com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all: bf({l: st.filterAll, a: "@all"})
						}
					}
				};
				
				var o = view.filters.options;
				
				if ( s.microblogging )	{ o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true}); }
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
				if ( s.profiles )		{ o.profiles =		bf({l: st.filterProfiles,		a: "profiles"}); }
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
		
				return this.nestSubMenu(view);
			},
			
			buildMyNotificationsView: function() {
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.mynotificationsLabel,
					description: this.stringsHp.mynotificationsDescription,
					params : { userId : "@me", appId: "@all" },
					extensions : [ 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "lconn.homepage.as.extension.ActivityReplyExtension", 
					    "com.ibm.social.as.lconn.extension.DisableDynamicLoadExtension"
					],
					filters : {
						type:asc.type=="narrow" ? "default" : "links",
						label: st.filterOneLabel,
						options: {
							forme: {
								label: st.filterForMe,
								params: { groupId: "@responses" }
							},
							fromme: {
								label: st.filterFromMe,
								params: { groupId: "@notesfromme" }
							}
						}
					}
				};
				
				return view;
			},
			
			buildDiscoverView: function() {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: this.stringsHp.discoverLabel,
					description: this.stringsHp.discoverDescription,
					params : { userId : "@public", rollup : "true" },
					extensions : [ 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension",
					    "com.ibm.social.as.extension.TrendingExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all : { label :st.filterAll, params : { appId : "@all" },extensions: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"] }
						}
					}
				};
				
				var o = view.filters.options;
				
				if ( s.microblogging )	{ o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true, e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]}); }
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
				if ( s.profiles )		{ o.profiles =		bf({l: st.filterProfiles,		a: "profiles", e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]}); }
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
		
				return view;
			},
			
			buildGlobalSearchView: function() {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
		
				var view = {
					label: st.asSearchGlobalView,
					description: st.discoverDescription,
					params : { userId : "@public", rollup : "true" },
					extensions : [ 
					    "lconn.homepage.as.extension.SavedActionExtension", 
					    "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension",
					    "com.ibm.social.as.extension.TrendingExtension"
					],
					filters : {
						label : st.filterOneLabel,
						options : {
							all : { label :st.filterAll, params : { appId : "@all" } }
						}
					}
				};
				
				var o = view.filters.options;
				
				if ( s.microblogging )	{ o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true}); }
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
				if ( s.profiles )		{ o.profiles =		bf({l: st.filterProfiles,		a: "profiles"}); }
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
		
				return view;
			},
			
			buildProfileView: function(profileId, singleEntryId) {
				var s = this.svcs;
				var bf = this.bldFilter;
				var st = this.strings;
				
				var view = {
					label: "",
					description: "",
					params: { rollup: true },
					filters: {
						label: st.filterOneLabel,
						options: {
							all: { label: st.filterAll, params: { appId: "@all" }, extensions: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"] }
						}
					}
				};
				
				var o = view.filters.options;
				
				if ( singleEntryId ) {
					o["__hidden__"] = { 
						label: "", 
						params: { 
							appId: "@all", 
							filterBy: "object", 
							filterOp: "equals", 
							filterValue: singleEntryId
						},
						selected: true
					};
				}
				
				if ( s.microblogging )	{ o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true, e: ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"]}); }
				if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
				if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
				if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
				if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "communities"}); }
				if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
				if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
				if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
				if ( s.profiles )		{ o.profiles =		bf({l: st.filterProfiles,		a: "profiles"}); }
				if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
				
				this.addThirdPartyAppsToFilter(o);
				
				return view;
			},
			
			// function for adding a second layer of filters which will be displayed in the "sub view" area
			nestSubMenu: function(viewObj){
				if(asc.type!="narrow"){
					var origFilters = viewObj.filters;
					viewObj.filters = {
							label : this.strings.filterOneLabel,
							type: asc.type=="narrow" ? "default" : "links",
							options: {
								subMenu: {
									label: viewObj.label,
									description: viewObj.description
								}
							}
						};
					if(origFilters) {
						viewObj.filters.options.subMenu.filters = origFilters;
					}
				}
				
				return viewObj;
			},
			
			// Utility function to build filter
			// o.l = label
			// o.a = appId
			// o.u = userId
			// o.g = groupId
			// o.r = rollup
			// o.b = broadcast
			// o.e = extensions
			// o.f = subfilters
			bldFilter: function(o) {
				var f = {
					label: o.l,
					params: {}
				};
				
				if ( o.a ) { f.params.appId = o.a; };
				if ( o.u ) { f.params.userId = o.u; };
				if ( o.g ) { f.params.groupId = o.g; };
				if ( o.b ) { f.params.broadcast = true; };
				if ( o.r ) { f.params.rollup = true; };
				
				if ( o.e ) { f.extensions = o.e; };
				if ( o.f ) { f.filters = o.f; };
				
				return f;
			},
			
			// If a config is passed to the gadget using a viewParam, we may need to
			// augument is to ensure all required parts are there
			augmentConfig: function(cfg) {
				as_console_debug("ActivityStreamConfigUtil - augmentConfig - entering - cfg =", cfg);
				
				var cfgPromise = new LCDeferred();
				
				// ensure we have gadget EE Manager defined
				if ( !cfg.eeManager ) 	cfg.eeManager = "com.ibm.social.as.ee.EEManagerGadget";
		
				// ensure we have a basic extensions
				if ( !cfg.extensions )	cfg.extensions = [];
				if ( array.indexOf(cfg.extensions, "com.ibm.social.as.extension.CommentExtension") == -1 ) {
					cfg.extensions.push("com.ibm.social.as.extension.CommentExtension");
				}
				if ( array.indexOf(cfg.extensions, "com.ibm.social.as.gadget.refresh.RefreshButtonExtension") == -1 ) {
					cfg.extensions.push("com.ibm.social.as.gadget.refresh.RefreshButtonExtension");
				}
				if ( array.indexOf(cfg.extensions, "com.ibm.social.as.extension.RepostExtension") == -1 ) {
					cfg.extensions.push("com.ibm.social.as.extension.RepostExtension");
				}
				
				this.configureFromGadgetOpts(cfg);
				
				// Ensure we have userInfo
				if ( !cfg.userInfo || !cfg.userInfo.id || !cfg.userInfo.displayName ) {
					cfgPromise = this.attachUserInfo(cfg);
				} else {
					as_console_debug("ActivityStreamConfigUtil - augmentConfig - resolving promise with cfg =", cfg);
					cfgPromise.resolve(cfg);
				}
				
				as_console_debug("ActivityStreamConfigUtil - augmentConfig - exiting - returning promise =", cfgPromise);
				return cfgPromise;
			},
			
			// If a feed is passed to the gadget using a viewParam, we need to build simple
			// config to display just that feed
			buildConfigFromFeed: function(feed) {
				as_console_debug("ActivityStreamConfigUtil - buildConfigFromFeed - entering - feed =", feed);
		
				var cfg = {
					defaultUrlTemplate : feed,
					defaultUrlTemplateValues : {},
					views : {
						main : {}
					},
					eeManager : "com.ibm.social.as.ee.EEManagerGadget",
					extensions : [ 
		              	"com.ibm.social.as.extension.CommentExtension",
		              	"com.ibm.social.as.gadget.refresh.RefreshButtonExtension",
		              	"com.ibm.social.as.extension.RepostExtension"
		            ]
				};
					
				this.configureFromGadgetOpts(cfg);
				
				var cfgPromise = this.attachUserInfo(cfg);
				
				as_console_debug("ActivityStreamConfigUtil - buildConfigFromFeed - exiting - returning promise =", cfgPromise);
				return cfgPromise;
			},
			
			buildConfigFromEmail: function(email) {
				as_console_debug("ActivityStreamConfigUtil - buildConfigFromEmail - entering - email =", email);
				
				this.getUserInfo(); // trigger fetch early so it's ready when buildConfigFromFeed looks for it
				
				var emailPromise = this.getUserFromEmail(email)
				.then(lang.hitch(this, function(ui) {
					as_console_debug("ActivityStreamConfigUtil - buildConfigFromEmail - got UserInfo: ", ui);
					asc.actionUser = ui;
					var osSvcUrl = urlModule.getServiceUrl(services.opensocial).uri,
						asFeed = osSvcUrl + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/" + ui.id + "/@involved/@all";
					return this.buildConfigFromFeed(asFeed);
				}))
				.then(function(cfg) {
					cfg.extensions.push("com.ibm.social.as.gadget.nav.ActionTitleExtension");
					as_console_debug("ActivityStreamConfigUtil - buildConfigFromEmail - resolving promise with cfg =", cfg);
					return cfg;
				});
		
				
				as_console_debug("ActivityStreamConfigUtil - buildConfigFromEmail - exiting - returning promise =", emailPromise);
				return emailPromise;
			},
			
			configureFromGadgetOpts : function(cfg) {
				// Add the view top-nav extension if we are in narrow mode
				if ( asc.type === "narrow" ) {
					cfg.extensions.push("com.ibm.social.as.gadget.viewnav.ASGadgetViewTopNavExtension");
				}
				
				// Add the communities status updates extension if we are in a communities context
				if ( asc.isCommunityStream ) {
					cfg.extensions.push("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension");
				}
				
				if(!asc.showFeedLink) {
					cfg.pagingHandlerClass = "com.ibm.social.as.paging.NoFeedPagingHandler";
				}
			}
		});
		return ActivityStreamConfigUtil;
	});
