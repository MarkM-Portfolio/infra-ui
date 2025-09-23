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

dojo.provide("com.ibm.social.ee.config");
dojo.require("lconn.core.config.services");

(function(){
   var config, isSecure, gadgetUrlPrefix, svcCfg = lconn.core.config.services;

   isSecure = function () {
      var srcUrl = window.webResourcesUrl || window.location.href;
      var scheme = srcUrl.substring(0, srcUrl.indexOf(':'));
      return (scheme === "https");
   };
   gadgetUrlPrefix = isSecure() ? svcCfg.webresources.secureUrl : svcCfg.webresources.url;

   config = com.ibm.social.ee.config = {
      inlineGadgets:{
/*         
         "file" : {
            url: gadgetUrlPrefix + "/web/com.ibm.social.ee/File.xml",
            getInlineUrl: function(id, usePublic) {
               return dojo.replace("{svcUrl}/basic/{access}/document/{fileId}/embedded?type=inline", {
                  svcUrl: isSecure() ? svcCfg.files.secureUrl : svcCfg.files.url,
                  access: usePublic ? "anonymous/api" : "api",
                  fileId: id
               });
            }
         },
         "networkInvite": {
            url: gadgetUrlPrefix + "/web/com.ibm.social.ee/NetworkInvite.xml",
            getInlineUrl: function(id, usePublic) {
               return usePublic ? null : dojo.replace("{svcUrl}/app/person/@me/forms/connect/{inviteId}?type=inline",{
                  svcUrl: isSecure() ? svcCfg.profiles.secureUrl : svcCfg.profiles.url,
                  inviteId: id
               });
            }
         },
        
         "statusUpdate": {
            url: gadgetUrlPrefix + "/web/com.ibm.social.ee/StatusUpdate.xml",
            getInlineUrl: function(id, usePublic) {
               return usePublic ? null : dojo.replace("{svcUrl}/app/person/@me/forms/connect/{suId}?type=inline", {
                  svcUrl: isSecure() ? svcCfg.news.secureUrl : svcCfg.news.url,
                  suId: id
               });
            }
         }
         */
      },
      files: {
         canShare: true 
      },
      gadgetParams: {
         width: 380,
         maxWidth: 250,
         maxHeight: 250,
         maxTags: 3
      },
      common: {
         commentCount: 5,
         maxCommentLength: 1000,
         imageFileTypes: ["gif", "jpeg", "jpg", "png"]
      },
      htmlContentParams: {
    	  width: 70,
    	  height: 70,
    	  numImages: 4,
    	  numChar: 500
      },
      ecm: {
         publishedParams: {includeRecommendation: true, includeTags: true, includeNotification: true, includeWorkingDraftInfo: true, includeApprovers: true},
         draftParams: {includeWorkingDrafts: true, includeApprovers: true},
         generatorName: "{ecm_files}",
         forceSSO: true //Use to enable or disable OAuth for ECM.  Overrides com.ibm.social.eeconfig.config.useSSO and any cookie settings to enable OAuth
      },
	  notificationEvents: {
		"files.notification.share" : true,
		"blogs.notification.notify" : true,
		"ideationblog.notification.notify-idea" : true
	  }
   };

   config.getInlineGadgetUrlFunc = function(gadgetXmlUrl) {
   	  /*
      for(key in config.inlineGadgets) {
         if(config.inlineGadgets[key].url == gadgetXmlUrl)
            return config.inlineGadgets[key].getInlineUrl;
      }
      */
      return null;
   };
   config.getProfileUrl = function() {
      return isSecure() ? svcCfg.profiles.secureUrl : svcCfg.profiles.url;
   };
   config.getOpenSocialUrl = function() {
	   return svcCfg.opensocial[isSecure() ? "secureUrl" : "url"];
   };
})();