define([
	"dojo",
	"dojo/base/config",
	"dojo/json",
	"dojo/topic",
	"com/ibm/lconn/layout/track"
], function (dojo, config, JSON, topic, track) {

	/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
	
	com.ibm.social.ee.track.statusUpdate.read = function(statusUpdateData){      
	   var tracker = {
	      statusUpdate: statusUpdateData,
	      getContentId : function() {
	         return this.statusUpdate.id;
	      },
	      getItemType : function() {
	         return "STATUS";   // how to identify status and wallpost?
	      },
	      getAuthUserId : function() {
	         return this.statusUpdate.authUser.id;
	      },
	      getCommunityId : function() {
	         return this.statusUpdate.inCommunity ? this.statusUpdate.communityId : null;
	      },
	      getExtraMetrics : function() {
	         return {
	            contentTitle : this.statusUpdate.message,
	            contentContainerId : null,
	            contentCreatorId : this.statusUpdate.author.id,
	            contentCreateTs : this.statusUpdate.createDate,
	            contentLink : this.statusUpdate.commentsFeedUrl
	         };
	      }
	   };
	   
	   try{
	      if (config.isDebug) {
	         console.log("Send read event with itemType = "
	               + tracker.getItemType() + ", contentId = "
	               + tracker.getContentId());
	         console.log("Options=" + JSON.stringify(tracker.getExtraMetrics(), true));
	      }
	      track.read(tracker.getContentId(), tracker.getItemType(), {
			 context : "ee",
			 network : network,
			 oauth: oauth,
	         source : "STATUSUPDATE",
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
	   topic.subscribe("social/ee/statusupdate/load", function(statusUpdateData) {
	      if (statusUpdateData) { 
	         com.ibm.social.ee.track.statusUpdate.read(statusUpdateData);
	      }         
	   });
	})();
	return com.ibm.social.ee.track.statusUpdate;
});
