/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.portlet.PortletUrlUtil");
dojo.require("lconn.core.config.services");

(function() {
var BLOG_ENTRY_PREFIX = "urn:lsid:lconn.ibm.com:blogs.article:";
var BLOG_PREFIX = "urn:lsid:lconn.ibm.com:blogs.blog:";
var IDEATION_BLOG_ENTRY_PREFIX = "urn:lsid:lconn.ibm.com:blogs.question:";
var IDEATION_BLOG_EVENT_PREFIX = "ideationblog";
var COMMUNITY_PREFIX = "urn:lsid:lconn.ibm.com:communities.community:";
var ECM_URL_PREFIX = "{ecm_files}";
var ECM_COMM_ID_URL_ATTR = "communityUuid=";
dojo.declare("com.ibm.social.as.portlet.PortletUrlUtil", null, {
   connSvcUrls: null,
   skipPocUpdate: false,
   openLinksNewWindow: true,
   constructor: function(portletUrlSettings) {
	  if(portletUrlSettings && portletUrlSettings.pocTemplates && portletUrlSettings.usePocUrls) {
	     var templates = portletUrlSettings.pocTemplates;
         this.pocUrlTemplate = templates.standard;
         this.pocCommunityUrlTemplate = templates.community;
         this.pocCommunityBlogEntryUrlTemplate = templates.communityBlogEntry;
         this.pocBlogEntryUrlTemplate = templates.blogEntry;
         this.pocCommunityIdeationBlogEntryUrlTemplate = templates.communityIdeationBlogEntry;
         this.pocCommunityIdeationBlogUrlTemplate = templates.communityIdeationBlog;
	  } else {
		  this.skipPocUpdate = true;
	  }
	  
	  if(portletUrlSettings && typeof portletUrlSettings.openLinksNewWindow !== 'undefined') {
	     this.openLinksNewWindow = portletUrlSettings.openLinksNewWindow;
	  }

      //Create serviceUrl list
      this.connSvcUrls = [];
      for(var service in lconn.core.config.services) {
          if(lconn.core.url.getServiceUrl(lconn.core.config.services[service])) {
              var svcString = lconn.core.url.getServiceUrl(lconn.core.config.services[service]).toString();
              if(dojo.trim(svcString).length > 0)
                 this.connSvcUrls.push(svcString);
          }
      }
      //Set blogs url
      this.blogsSvcUrl = lconn.core.config.services.blogs ? 
         lconn.core.url.getServiceUrl(lconn.core.config.services.blogs).toString() : "";

      //Subscribe to like popup additions
      dojo.subscribe("com/ibm/oneui/likePopup/personAdded", dojo.hitch(this, function(likePerson){
    	 if(likePerson && likePerson.domNode)
            this._updateUrls(likePerson.domNode);
      }));
   },
   updateUrls: function(node) {
      dojo.forEach(dijit.findWidgets(node), dojo.hitch(this, this.updateUrlsByWidget));
   },
   updateEEUrls: function(node, context) {
	  node = dojo.byId(node);
	  var checkItemUrl = context.itemUrl;
	  var communityId = this.getCommunityId(context.communityid);
      if(!checkItemUrl && context.entryUrl && context.entryUrl.indexOf(ECM_URL_PREFIX) == 0) { //Check for ECM Files use case
         checkItemUrl = context.entryUrl;
         if(!communityId) {
            communityId = this.getECMCommunityId(context.activityUrl);
         }
      }

      if(node && context.id && checkItemUrl) {
    	 //EE requires a same window target value of "_parent" so that the links don't open in the iframe
         this._updateUrls(node, context.id, checkItemUrl, communityId , dojo.hitch(this, this._resetEEPocExclusions), context.eventType, "_parent");
      }
   },

   updateUrlsByWidget: function(widget) {
	  if(widget && widget.domNode && widget.newsData && widget.newsData.object) {
		 var newsData = widget.newsData;
		 var id = newsData.object.id;
		 var url = newsData.object.url;
		 var eventType = "";
		 if(newsData && newsData.openSocial && newsData.openSocial.embed && newsData.openSocial.embed.context && newsData.openSocial.embed.context.eventType) {
			 eventType = newsData.openSocial.embed.context.eventType;
		 }
		 //Use target "id" and "url" if this is a blogs entry comment
		 if((newsData.object.objectType == "comment") && 
            (this.getBlogEntryId(newsData.target.id) || this.getIdeationBlogEntryId(newsData.target.id))) {
			 id = newsData.target.id;
			 url = newsData.target.url;
		 }
         this._updateUrls(widget.domNode, id, url, 
        		 newsData.connections ? this.getCommunityId(newsData.connections.communityid) : null,
            dojo.hitch(this, this._resetActivityStreamPocExclusions, widget.domNode), eventType);
	  }
   },
   _resetEEPocExclusions: function(domNode) {
	  var updateFunc = function(resetTargetUpdate, link) {
		  if(dojo.attr(link, "connectionsWebUrl") && !dojo.hasClass(link, "lotusPerson") && 
	        		 link.parentNode && !dojo.hasClass(link.parentNode, "vcard") && !dojo.hasClass(link, "eeActionLinks")) {
	            dojo.attr(link, "href", dojo.attr(link, "connectionsWebUrl"));
		  }
		  if(resetTargetUpdate && dojo.attr(link, "connectionsOriginalTarget")) {
              dojo.attr(link, "target", dojo.attr(link, "connectionsOriginalTarget"));
		  }
	  };
      //Return user generated content links back to original url (activity stream summary and comments)
	  //1st - user generated comments (All EEs with comments)
	  //2nd - div.blogsWrapText --> applicable for blogs EE
	  //3rd - div.lotusStatus --> applicable for status update EE
      dojo.query("div.eeCommentContent a, div.blogsWrapText a, div.lotusStatus a", domNode).forEach(dojo.hitch(null, updateFunc, false));

      //Don't change files download/preview type of links
      dojo.query("a[id$='_downloadLink'], a[id$='_previewLink'], a[dojoAttachPoint='downloadLink'], a[dojoAttachPoint='prevLink']", domNode).forEach(dojo.hitch(null, updateFunc, true));
   },   
   _resetActivityStreamPocExclusions: function(domNode) {
	 //Return user generated content links back to original url (activity stream summary and comments)
      dojo.query("div.activityStreamSummary div.lotusPostContent a, div.activityStreamSummary div.lotusPostDetails a, li.lotusCommentItem div.lotusPostContent a", domNode).forEach(function(link){
            if(link.parentNode && !dojo.hasClass(link.parentNode, "vcard")) {
               if(dojo.attr(link, "connectionsWebUrl"))
                  dojo.attr(link, "href", dojo.attr(link, "connectionsWebUrl"));
               if(dojo.attr(link, "connectionsOriginalTarget"))
                  dojo.attr(link, "target", dojo.attr(link, "connectionsOriginalTarget"));
            }
         });
   },
   _updateUrls: function(domNode, objectId, objectUrl, communityId, resetUrlsFunc, eventType, sameWindowTargetValue) {
      dojo.query("a", domNode).forEach(dojo.hitch(this,function(objectId, objectUrl, communityId, link){
       	    var url = dojo.attr(link, "href");
            if(this.isConnectionsUrl(url)  && !dojo.attr(link, "pocRun")) {
               dojo.attr(link, "connectionsWebUrl", url);
               if(!this.skipPocUpdate) {
                  dojo.attr(link, "href", this.getUrl(dojo.trim(url.toString()), communityId, objectId, objectUrl, eventType));
               }
               //Connections normally opens links in a new tab, enable this to be configurable based on openLinksNewWindow variable
               if(dojo.attr(link, "target")) {
                  dojo.attr(link, "connectionsOriginalTarget", dojo.attr(link, "target"));
               }
               if(this.openLinksNewWindow) {
                  dojo.attr(link, "target", "_blank");
               } else {
                  dojo.attr(link, "target", sameWindowTargetValue || "_self");
               }
               dojo.attr(link, "pocRun", true);
            }
         }, objectId, objectUrl, communityId));

      //Return user generated content links back to original url
      if(resetUrlsFunc)
         resetUrlsFunc(domNode);

      //Clean-up and remove webUrl placeholder as well as target placeholder
      dojo.query("a[connectionsWebUrl],a[connectionsOriginalTarget]", domNode).forEach(function(link){
    	  dojo.removeAttr(link, "connectionsWebUrl");
    	  dojo.removeAttr(link, "connectionsOriginalTarget");
      });
   },
   
   getUrl: function (url, communityId, objectId, objectUrl, eventType) {
      if(this.isProfilesUrl(url)) {
         url = this.getStandardPocUrl(url, null);
      } else if(this.isBlogEntryUrl(url, objectId, objectUrl)){
    	  //PoC Resolver requires an entryId for blog entries.  This may be retrieved from the newsData object id
    	  //All other Url types have sufficient data in the webUrl for PoC resolver
    	  url = this.getBlogEntryPocUrl(url, communityId, this.getBlogEntryId(objectId));
      } else if(this.isIdeationBlogEntryUrl(url, objectId, objectUrl)) {
    	  //PoC Resolver requires an entryId for blog entries.  This may be retrieved from the newsData object id
    	  //All other Url types have sufficient data in the webUrl for PoC resolver
    	  url = this.getIdeationBlogEntryPocUrl(url, communityId, this.getIdeationBlogEntryId(objectId));
      } else if(this.isIdeationBlogUrl(url, eventType)){
          url = this.getIdeationBlogPocUrl(url, communityId);
      } else {
    	  url = this.getStandardPocUrl(url, communityId);
      }
	  return url;
   },

   getStandardPocUrl: function(webUrl, communityId) {
	   var url = communityId ? this.pocCommunityUrlTemplate : this.pocUrlTemplate;
          //Decode values first to ensure that items such as webUrl are encoded exactly once
	      url = url.replace("{url}", encodeURIComponent(decodeURIComponent(webUrl)));
	      url = url.replace("{communityId}", encodeURIComponent(decodeURIComponent(communityId)));	      
	   return url;
   },

   getBlogEntryPocUrl: function(webUrl, communityId, entryId) {
      var url = communityId ? this.pocCommunityBlogEntryUrlTemplate : this.pocBlogEntryUrlTemplate;
         //Decode values first to ensure that items such as webUrl are encoded exactly once
         url = url.replace("{url}", encodeURIComponent(decodeURIComponent(webUrl)));
         url = url.replace("{communityId}", encodeURIComponent(decodeURIComponent(communityId)));
         url = url.replace("{entryId}", encodeURIComponent(decodeURIComponent(entryId)));
      return url;
   },
   getIdeationBlogEntryPocUrl: function(webUrl, communityId, entryId) {
	   var url = this.pocCommunityIdeationBlogEntryUrlTemplate;
	      if(url) {
            //Decode values first to ensure that items such as webUrl are encoded exactly once
            url = url.replace("{url}", encodeURIComponent(decodeURIComponent(webUrl)));
            url = url.replace("{communityId}", encodeURIComponent(decodeURIComponent(communityId)));
            url = url.replace("{entryId}", encodeURIComponent(decodeURIComponent(entryId)));
         } else {
            url = this.getBlogEntryPocUrl(webUrl, communityId, entryId);
         }
      return url;
   },
   getIdeationBlogPocUrl: function(webUrl, communityId) {
	   var url = this.pocCommunityIdeationBlogUrlTemplate;
          if(url) {	   
             //Decode values first to ensure that items such as webUrl are encoded exactly once
	         url = url.replace("{url}", encodeURIComponent(decodeURIComponent(webUrl)));
	         url = url.replace("{communityId}", encodeURIComponent(decodeURIComponent(communityId)));
	      } else {
	         url = this.getStandardPocUrl(webUrl, communityId);
	      }
	   return url;
   },
	   
   getBlogEntryId: function(objectId) {
      return objectId && (objectId.indexOf(BLOG_ENTRY_PREFIX) == 0) ? objectId.substring(BLOG_ENTRY_PREFIX.length) : null;
   },
   getIdeationBlogEntryId: function(objectId) {
      return objectId && (objectId.indexOf(IDEATION_BLOG_ENTRY_PREFIX) == 0) ? objectId.substring(IDEATION_BLOG_ENTRY_PREFIX.length) : null;
   },
   getIdeationBlogId: function(objectId) {
      //Regular and Ideation blogs have the same id prefix
      return objectId && (objectId.indexOf(BLOG_PREFIX) == 0) ? objectId.substring(BLOG_PREFIX.length) : null;
   },
   getCommunityId: function(objectId) {
      return objectId && (objectId.indexOf(COMMUNITY_PREFIX) == 0) ? objectId.substring(COMMUNITY_PREFIX.length) : null;
   },
   getECMCommunityId: function(objectUrl) {
      var id = null;
      if(objectUrl) {
    	  var startIndex = objectUrl.indexOf(ECM_COMM_ID_URL_ATTR);
    	  if(startIndex != -1) {
    		  startIndex += ECM_COMM_ID_URL_ATTR.length;
    		  var endIndex = objectUrl.indexOf("&", startIndex);
    		  id = (endIndex == -1) ? objectUrl.substring(startIndex) : objectUrl.substring(startIndex, endIndex);
    	  }
      }
      return id;
   },   
   isConnectionsUrl: function(url) {
      if(!url || (url === "javascript:;"))
         return false;
      return  (url.indexOf(ECM_URL_PREFIX) == 0)|| dojo.some(this.connSvcUrls, dojo.hitch(null, function(url, svcUrl) {
    	  return url.indexOf(svcUrl) == 0;
      }, url));
   },
   isProfilesUrl: function(url) {
	   var profileServiceFromConfig = lconn.core.config.services.profiles ? lconn.core.config.services.profiles : lconn.core.config.services.scprofiles;
	   return url && (url.indexOf(lconn.core.url.getServiceUrl(profileServiceFromConfig).toString()) == 0);
   },
   isBlogEntryUrl: function(url, objectId, objectUrl) {
	   //Check if the url matches the "objectUrl" or at least starts with the objectUrl to handle cases where url is to a comment 
       return url && (url.indexOf(objectUrl) == 0) && this.getBlogEntryId(objectId);
   },
   isIdeationBlogEntryUrl: function(url, objectId, objectUrl) {
	 //Check if the url matches the "objectUrl" or at least starts with the objectUrl to handle cases where url is to a comment 
     return url && (url.indexOf(objectUrl) == 0) && this.getIdeationBlogEntryId(objectId);
   },
   isIdeationBlogUrl: function(url, eventType) {
	 //Ideation and regular blogs use the same blogs service url
     return url && (url.indexOf(this.blogsSvcUrl) == 0) && (eventType.indexOf(IDEATION_BLOG_EVENT_PREFIX) == 0);
   }
});
})();
