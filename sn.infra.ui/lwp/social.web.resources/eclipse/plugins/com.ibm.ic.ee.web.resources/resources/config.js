/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"ic-core/config/services"
], function (services) {

	(function(){
	   var config, isSecure, gadgetUrlPrefix, svcCfg = services;
	
	   isSecure = function () {
	      var srcUrl = window.webResourcesUrl || window.location.href;
	      var scheme = srcUrl.substring(0, srcUrl.indexOf(':'));
	      return (scheme === "https");
	   };
	   gadgetUrlPrefix = isSecure() ? svcCfg.webresources.secureUrl : svcCfg.webresources.url;
	
	   config = com.ibm.social.ee.config = {
	      inlineGadgets:{
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
	return com.ibm.social.ee.config;
});
