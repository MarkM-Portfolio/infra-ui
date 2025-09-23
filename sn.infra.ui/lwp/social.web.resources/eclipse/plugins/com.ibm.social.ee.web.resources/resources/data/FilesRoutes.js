/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.FilesRoutes");

dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.ee.data.AbstractRoutes");

dojo.declare("com.ibm.social.ee.data.FilesRoutes", com.ibm.social.ee.data.AbstractRoutes, {
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
      url += com.ibm.social.ee.util.misc.getItemId(contextId);
      url += "/embedded";
      return com.ibm.social.incontext.util.url.rewrite(url, { commentCount: numComments });
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
      var webResourcesUrl = lconn.core.config.services.webresources[this.isSecure() ? "secureUrl" : "url"];
      var uu = com.ibm.social.incontext.util.url;
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
      url += com.ibm.social.ee.util.misc.getItemId(id);
      url += "/embedded";      
      return uu.rewrite(url, 
    		  {redirect: uu.rewrite(previewLink, {fileId: id, title: title, anonymous: isAnonymous})});
   }   
});