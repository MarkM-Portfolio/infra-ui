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

dojo.provide("com.ibm.social.ee.data.NewsRoutes");

dojo.require("com.ibm.social.ee.data.AbstractRoutes");
dojo.require("com.ibm.social.ee.util.misc");
dojo.require("com.ibm.social.incontext.util.url");

(function () {
var url = com.ibm.social.incontext.util.url;
var misc = com.ibm.social.ee.util.misc;
dojo.declare("com.ibm.social.ee.data.NewsRoutes", com.ibm.social.ee.data.AbstractRoutes, {
   service: "news",	
	getStatusUpdateEEUrl: function (contextId, resourceId, commentCount) {
       var eeActionUrl = this.getServiceUrl() + 
          (this.anonymous ? "/anonymous" : "") + (this.oauth ? "/oauth" : "") + 
          "/web/statusUpdateEE.action";
       return url.rewrite(
         eeActionUrl, 
         { id: misc.getItemId(contextId), commentCount: commentCount, resourceId: resourceId }
      );
	},
	getStatusUpdateEEPreviewUrl: function(contextId, previewUrl, isPublic) {
		 var eeActionUrl = this.getServiceUrl() + (isPublic ? "/anonymous" : "") + "/web/statusUpdateEE.action";
       return url.rewrite(
          eeActionUrl, 
          { id: misc.getItemId(contextId), redirect: previewUrl }
	   );
	},
	
	getSUPermissionsUrl: function () {
	   return this.getServiceUrl() + 
          (this.anonymous ? "/anonymous" : "") + (this.oauth ? "/oauth" : "") +  
          "/microblogging/isPermitted.action";
	}	
});
})();