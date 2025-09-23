/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-core/config/services",
	"ic-ee/data/AbstractRoutes",
	"ic-ee/util/misc",
	"ic-incontext/util/url"
], function (declare, services, AbstractRoutes, misc, urlModule) {

	var FilesRoutes = declare("com.ibm.social.ee.data.FilesRoutes", AbstractRoutes, {
	   service: "files",
	   getEEUrl: function (contextId, numComments) {
	      var url = this.getServiceUrl();
	      if (this.oauth)
	         url += "/oauth";
	      else
	         url += "/form";
	      if (this.anonymous)
	         url += "/anonymous";
	      url += "/api/document/";
	      url += misc.getItemId(contextId);
	      url += "/embedded";
	      return urlModule.rewrite(url, { commentCount: numComments });
	   },
	   getRecommendationsFeed: function (entryUrl) {
	      var base = entryUrl.substring(0, entryUrl.lastIndexOf("/entry"));
	      return base + "/recommendedby/feed";
	   },
	   getRecommendationEntry: function (entryUrl, userId) {
	      var base = entryUrl.substring(0, entryUrl.lastIndexOf("/entry"));
	      return base + "/recommendation/" + userId + "/entry";
	   },
	   getSharesFeed: function (entryUrl) {
	      var base = entryUrl.substring(0, entryUrl.lastIndexOf("/entry"));
	      return base + "/permissions/feed";
	   },
	   getEntryUrl: function (id) {
	   	  var url = this.getServiceUrl();
	   	  url += (this.oauth ? "/oauth" : "/form") + (this.anonymous ? "/anonymous" : "") + "/api/document/" + id + "/entry";
	   	  return url;
	   },
	   getACLUrl: function (id) {
		   	  var url = this.getServiceUrl();
		   	  var isAnonymous = this.anonymous;
		   	  
		   	  if (this.network && this.network.anonymousNotAllowed)
		   		  isAnonymous = false;
		   	  
		   	  url += "/form" + (isAnonymous ? "/anonymous" : "") + "/api/document/" + id + "/entry";
		   	  return url;
	   },
	   getImagePreviewLink: function (id, title, isPublic, dontRedirect) {
	      var webResourcesUrl = services.webresources[this.isSecure() ? "secureUrl" : "url"];
	      var uu = urlModule;
	      var previewLink = webResourcesUrl + "/web/com.ibm.social.ee/html/filePreview.html";
	      var isAnonymous = isPublic && !(this.network && this.network.anonymousNotAllowed);
	      if (dontRedirect)
	         return uu.rewrite(previewLink, {fileId: id, title: title, anonymous: isAnonymous});
	      var url = this.getServiceUrl();
	      url += "/form";
	      if (isAnonymous) {
	         url += "/anonymous";
	      }
	      url += "/api/document/";
	      url += misc.getItemId(id);
	      url += "/embedded";      
	      return uu.rewrite(url, 
	    		  {redirect: uu.rewrite(previewLink, {fileId: id, title: title, anonymous: isAnonymous})});
	   }   
	});
	return FilesRoutes;
});
