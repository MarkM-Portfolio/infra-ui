define([
	"dojo",
	"dojo/cookie",
	"dojo/base/config",
	"dojo/topic",
	"com/ibm/lconn/layout/track"
], function (dojo, cookie, topic, config, track) {

	/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
	
	com.ibm.social.ee.track.file.read = function(fileData, network, oauth){      
	   var tracker = {
	      file: fileData,
	      getContentId : function() {
	         return this.file.id;
	      },
	      getItemType : function() {
	         return "FILESUMMARY";
	      },
	      getAuthUserId : function() {
	         return this.file.authUser.id;
	      },
	      getCommunityId : function() {
	         return this.file.inCommunity ? this.file.communityId : null;
	      },
	      getExtraMetrics : function() {
	         return {
	            contentTitle : this.file.title,
	            contentContainerId : this.file.libraryId,
	            contentCreatorId : this.file.createdBy.id,
	            contentCreateTs : this.file.created,
	            contentLink : this.file.altLink
	         };
	      }
	   };
	   
	   try{
	      track.read(tracker.getContentId(), tracker.getItemType(), {
	         context : "ee",
	         sid: cookie("JSESSIONID"),
	         network : network,
	         oauth: oauth,
	         source : "FILES",
	         userId : tracker.getAuthUserId(),
	         community : tracker.getCommunityId(),
	         extra : tracker.getExtraMetrics()
	      });
	   }catch(e){
	      if (config.isDebug){
	         console.debug(e);
	      }
	   }
	};
	
	(function() {
	   topic.subscribe("social/ee/file/load", function(fileData, network, oauth) {
	      if (fileData) {
	         com.ibm.social.ee.track.file.read(fileData, network, oauth);
	      }         
	   });
	})();
	return com.ibm.social.ee.track.file;
});
