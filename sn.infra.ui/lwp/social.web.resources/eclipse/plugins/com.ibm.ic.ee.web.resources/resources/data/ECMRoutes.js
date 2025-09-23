/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-core/config/services",
	"ic-ee/config",
	"ic-ee/data/AbstractRoutes",
	"ic-ee/util/misc",
	"ic-incontext/util/url"
], function (declare, services, config, AbstractRoutes, misc, urlModule) {

	var ECMRoutes = declare("com.ibm.social.ee.data.ECMRoutes", AbstractRoutes, {
	   service: "ecm_files",
	   getRecommendationsFeed: function () {
		  var entryUrl = this.getEntryUrl();
	      var base = entryUrl.substring(0, entryUrl.lastIndexOf("/entry"));
	      return base + "/recommendedby/feed";
	   },
	   getRecommendationEntry: function (userName) {
		  var entryUrl = this.getEntryUrl();
	      var base = entryUrl.substring(0, entryUrl.lastIndexOf("/entry"));
	      var url = base + "/recommendation/" + userName + "/entry";
	      return encodeURI(url);
	   },
	   getUserCommunityRoleURL: function(communityId, userId){
		   if(!communityId)
			   return null;
		   
		   var entryUrl = this.getEntryUrl();
		   var base = this.getEntryUrl().split("/dm")[0];
		   
		   var communityPath = "";
		   if(this.oauth){
			   communityPath = "/communities/service/json/oauth/community/canviewcommunity?communityUuid=";
		   }else{
			   communityPath = "/communities/service/json/community/canviewcommunity?communityUuid=";
		   }
		   
		   var url = base + communityPath;
		   url += communityId.split("=")[1]; //if communityId === null return null
		   url += "&directoryUuid=";
		   url += userId;
		   url += "&includeRole=true";
		   return url;
	   },
	   getEntryUrl: function () {
	      var context = this.context;
	      if (this.anonymous)
	         return this.getUpdatedUrl(context.anonymousEntryUrl);
	      else if (this.oauth)
	    	 return this.getUpdatedUrl(context.oauthEntryUrl);
	      else
	         return this.getUpdatedUrl(context.entryUrl);
	   },
	   getDraftEntryUrl: function(draftId) {
	      var entryUrl = this.getEntryUrl();
	      var draftUrl = entryUrl.substring(0, entryUrl.lastIndexOf("/document")) + "/draft/" + encodeURIComponent(draftId) + "/entry";
	      return draftUrl;
	   },
	   getUpdatedUrl: function(url) {
	      var shouldReplace = url.indexOf(config.ecm.generatorName) != -1;
		  if (shouldReplace && this.getServiceUrl(this.service))
		     return url.replace(config.ecm.generatorName, this.getServiceUrl(this.service))	  
		  else
		     return url;
	   },
	   getAuthUserUrl: function () {
	      return this.getECMServer() + "/dm/atom" + (this.oauth ? "/oauth" : "") + "/people/feed?self=true&format=json";
	   },
	   getImagePreviewLink: function (id, title, download) {
	      var webResourcesUrl = services.webresources[this.isSecure() ? "secureUrl" : "url"];
	      var uu = urlModule;
	      var previewLink = webResourcesUrl + "/web/com.ibm.social.ee/html/ecmFilePreview.html";
	      return uu.rewrite(previewLink, { link: download });
	   },
	   getECMServer: function() {
		  var url = this.getEntryUrl();
		  if (url)
	         return this.getEntryUrl().split("/dm/atom")[0];
		  else
			  throw "Entry URL is not included in the context";
	   }
	});
	return ECMRoutes;
});
