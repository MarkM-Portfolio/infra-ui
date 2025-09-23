/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.track.statusUpdate");

dojo.require("com.ibm.lconn.layout.track");

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
      if (dojo.config.isDebug) {
         console.log("Send read event with itemType = "
               + tracker.getItemType() + ", contentId = "
               + tracker.getContentId());
         console.log("Options=" + dojo.toJson(tracker.getExtraMetrics(), true));
      }
      com.ibm.lconn.layout.track.read(tracker.getContentId(), tracker.getItemType(), {
		 context : "ee",
		 network : network,
		 oauth: oauth,
         source : "STATUSUPDATE",
         userId : tracker.getAuthUserId(),
         community : tracker.getCommunityId(),
         extra : tracker.getExtraMetrics()
      });
   }catch(e){
      if (dojo.config.isDebug){
         console.debug(e);
      }
   }
};

(function() {
   dojo.subscribe("social/ee/statusupdate/load", function(statusUpdateData) {
      if (statusUpdateData) { 
         com.ibm.social.ee.track.statusUpdate.read(statusUpdateData);
      }         
   });
})();