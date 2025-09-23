/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.portlet.ActivityStreamPortletConfigUtil");

dojo.require("com.ibm.social.as.gadget.ActivityStreamConfigUtil");
dojo.require("lconn.core.util.LCDeferred");

dojo.declare("com.ibm.social.as.portlet.ActivityStreamPortletConfigUtil", 
   [com.ibm.social.as.gadget.ActivityStreamConfigUtil], {
   _getConfig: function(opts, userInfo) {
      var cfg = {extensions:{}};

      if(asc.isCommunityStream && asc.communityId) {
  	    cfg = this._getCommunitiesConfig(asc.communityId);
      }else if (asc.isProfilesStream && asc.profileId) {
  	    cfg = this._getProfilesConfig(asc.profileId);
      } else {
  	    cfg = this._getHomepageConfig(userInfo);
      }


      //Determine if Embedded Experiences should be available
      if(asc.showEmbeddedExperience && asc.showActivityStream) {
    	  cfg.eeManager = "com.ibm.social.as.ee.EEManagerPortlet";
      }

      return cfg;

   },
   _setSelectedView: function(cfg) {
	  if(!cfg.views)
         return;

      if(!(asc.isCommunityStream && asc.communityId) && !(asc.isProfilesStream && asc.profileId)) {
    	  cfg.views.imFollowing.selected = true;
      }
   },
   _getCommunitiesConfig: function(communityId) {
      var osSvcUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri;
      return{
         defaultUrlTemplate: osSvcUrl + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/${userId}/${groupId}/${appId}",
         defaultUrlTemplateValues : { userId : "urn:lsid:lconn.ibm.com:communities.community:" + communityId, groupId : "@all", rollup : "true" },
         views: {
            recentUpdates: {
               label: this.strings.viewRecentUpdates, 
               params:{"appId":"@all"},
               selected:"true"
             },
         	statusUpdates: {
               label: this.strings.viewStatusUpdates,
               params:{"appId":"@status"}
            }
         },
         extensions: [
                      "com.ibm.social.as.lconn.extension.CommunitiesMicroblogDeletionExtension",
                      "com.ibm.social.as.lconn.extension.CommunitiesCommentExtension",
                      "com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension",
                      "com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension",
                      "com.ibm.social.as.extension.RepostExtension"
         ],
         dirtyChecker: true
      };
   },

   _getHomepageConfig: function(userInfo) {
      return {
         defaultUrlTemplateValues : { userId : "@public", groupId : "@all", appId : "@all" },
         views: {
            imFollowing: this.buildImFollowingView(),
            statusUpdates: 	 this.buildStatusUpdatesView(userInfo),
            myNotifications: this.buildMyNotificationsView(),
            atMentions:      this.buildAtMentionsView(userInfo),
            actionRequired:  this.buildActionRequiredView(),
            saved: 			 this.buildSavedView(),
            discover:		 this.buildDiscoverView()
         },
         extensions: ["com.ibm.social.as.extension.CommentExtension",
                      "com.ibm.social.as.extension.DirtyCheckExtension",
                      "com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension",
                      "com.ibm.social.as.extension.RepostExtension"
         ],
         dirtyChecker: true
      };
   },
   
   _getProfilesConfig: function(profileId) {
      var osSvcUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.opensocial).uri;   
      return {
			defaultUrlTemplate : osSvcUrl + ( asc.useOAuth ? "/oauth" : "" ) + "/rest/activitystreams/${userId}/${groupId}/${appId}",
			defaultUrlTemplateValues : { userId : "urn:lsid:lconn.ibm.com:profiles.person:" + profileId, groupId : "@involved", rollup: "true"},
			views: {
				"profiles-activitystream": this.buildProfilesBoardView()
			},
			extensions : [
			              	"com.ibm.social.as.lconn.extension.ProfilesMicroblogDeletionExtension",
			              	"com.ibm.social.as.extension.CommentExtension",
			              	"com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension",
			              	"com.ibm.social.as.extension.RepostExtension"
			             ]
		};
   },
   buildImFollowingView: function() {
      var view = this.inherited(arguments);
      if(view){
         view.extensions = [ "lconn.homepage.as.extension.SavedActionExtension", 
                            "lconn.homepage.as.extension.UnfollowExtension", 
                            "com.ibm.social.as.lconn.extension.MicroblogDeletionExtension"];
      }
      return view;
   },
   buildProfilesBoardView: function() {
		var s = this.svcs;
		var bf = this.bldFilter;
		var st = this.strings;
		var shareBoxExtension = ["com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension"];
		var view = {
				filters : {
					label : st.filterOneLabel,
					options : {
						all : { label :st.filterAll, params : { appId : "@all" }, extensions: shareBoxExtension }
					}
				}
			};
			
			var o = view.filters.options;
			
			if ( s.microblogging )	{ 
				o.statusUpdates = bf({l: st.filterStatusUpdates, 	a: "@all", b: true});
				o.statusUpdates.extensions = shareBoxExtension;
			}
			if ( s.activities )		{ o.activities = 	bf({l: st.filterActivities, 	a: "activities"}); }
			if ( s.blogs )			{ o.blogs =			bf({l: st.filterBlogs, 			a: "blogs"}); }
			if ( s.dogear )			{ o.bookmarks =		bf({l: st.filterBookmarks, 		a: "bookmarks"}); }
			if ( s.communities ) 	{ o.communities =	bf({l: st.filterCommunities,	a: "@communities"}); }
			if ( s.files )			{ o.files =			bf({l: st.filterFiles,			a: "files"}); }
			if ( s.forums )			{ o.forums =		bf({l: st.filterForums,			a: "forums"}); }
			if ( s.ecm_files )		{ o.libraries =		bf({l: st.filterLibraries,		a: "ecm_files"}); }
			if ( s.profiles ) { 
				o.profiles = bf({l: st.filterProfiles, a: "profiles"});
				o.profiles.extensions = shareBoxExtension;
			}
			if ( s.wikis )			{ o.wikis = 		bf({l: st.filterWikis,			a: "wikis"}); }
			
			this.addThirdPartyAppsToFilter(o);

			return view;
  },
	getUserInfo: function() {
	   var parentPromise = this.inherited(arguments);
	      parentPromise.then(function(){}, dojo.hitch(null, function(errorObj){
	    	  if(dojo.config.isDebug) {
	    		  console.debug("ASPortlet: Unable to load user info");
	    	  }
	    	  var errorObj = errorObj || {};
	    	  errorObj.userInfoRetrievalError = true;
	    	  asc.errorCallback(errorObj);
	      }));
		return parentPromise;
	},
   getASConfig: function(){
      var parentPromise = this.inherited(arguments);
      return this.setWidgetUserInfo(parentPromise);
   },
   setWidgetUserInfo: function(parentPromise) {
      var wuiPromise = new lconn.core.util.LCDeferred();
      parentPromise.then(dojo.hitch(this, function(asCfg){
         var widgetUserInfo = window.widgetUserInfo = window.widgetUserInfo || {};
            widgetUserInfo.userid = asCfg.userInfo.id;
         if(asc.isCommunityStream && asc.communityId) {
            asc.util.cfgUtil.xhrHandler.xhrGet({
               url: lconn.core.url.getServiceUrl(lconn.core.config.services.communities).toString() + "/userinfo.do?resourceId=" + asc.communityId,
               handleAs: "xml",
               load: function(doc) {
        	      var userInfoNode = doc.getElementsByTagName("user-info")[0];
        	      var getIEAttr = function(node, attrName) {
                     return (node && node.attributes.getNamedItem(attrName))? node.attributes.getNamedItem(attrName).value : "";
                  };
        	      if(userInfoNode) {
        	         if(dojo.isIE) {
        	            widgetUserInfo.canContribute = getIEAttr(userInfoNode, "canContribute");
                        widgetUserInfo.canPersonalize = getIEAttr(userInfoNode, "canPersonalize");
                        widgetUserInfo.canView = getIEAttr(userInfoNode, "canView");
                        widgetUserInfo.displayName = getIEAttr(userInfoNode, "displayName");
                        widgetUserInfo.email = getIEAttr(userInfoNode, "email");
                        widgetUserInfo.key = getIEAttr(userInfoNode, "key");
                        widgetUserInfo.userId = getIEAttr(userInfoNode, "userId");
                        widgetUserInfo.userid = getIEAttr(userInfoNode, "userid");
        	         } else {
                        widgetUserInfo.canContribute = dojo.attr(userInfoNode, "canContribute");
                        widgetUserInfo.canPersonalize = dojo.attr(userInfoNode, "canPersonalize");
                        widgetUserInfo.canView = dojo.attr(userInfoNode, "canView");
                        widgetUserInfo.displayName = dojo.attr(userInfoNode, "displayName");
                        widgetUserInfo.email = dojo.attr(userInfoNode, "email");
                        widgetUserInfo.key = dojo.attr(userInfoNode, "key");
                        widgetUserInfo.userId = dojo.attr(userInfoNode, "userId");
                        widgetUserInfo.userid = dojo.attr(userInfoNode, "userid");
                     }
                     asCfg.widgetUserInfo = widgetUserInfo;
                     wuiPromise.resolve(asCfg);
        	      }
               },
               error: function(error) {
            	  if(dojo.config.isDebug) { 
            		  console.debug("ASPortlet: Unable to load user info for community");
            	  }
                  wuiPromise.reject(asCfg);
               } 
            });
         } else {
            if(asc.isProfilesStream && asc.profileId) {
               window.profilesData = {displayedUser: {userid: asCfg.userInfo.id}};
            }
            wuiPromise.resolve(asCfg);
         }
      }));
      return wuiPromise;
   }
});
