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

/**
 *
 *    Track read event in EE for forum topic
 *    
 **This file is obsolete, forum topic ee read is tracked in generic.js**
 */

dojo.provide("com.ibm.social.ee.track.forumTopic");

dojo.require("com.ibm.lconn.layout.track");

com.ibm.social.ee.track.forumTopic.read = function(forumTopic, network, oauth){
      
   var tracker = {
      forumTopic : forumTopic,
      getSource : function(){
         return "FORUMS";
      },
      getContentId : function() {
         var id = this.forumTopic.id;
         return id.substring(id.length - 36);
      },
      getItemType : function() {
         return "TOPIC";
      },
      getAuthUserId : function() {
         var authUser = this.forumTopic.authUser;
         return authUser ? authUser.id : null;
      },
      getCommunityId : function() {
         var communityId = this.forumTopic.communityid;
         if (communityId)
            return communityId.substring(communityId.length - 36);
         return null;
      },
      getExtraMetrics : function() {
         return {
            contentTitle : this.forumTopic.title,
            contentContainerId : this.forumTopic.containerid,
            contentCreatorId : (dojo.hitch(this, function(){
                var id = this.forumTopic.actor.id;
                return id.substring(id.length - 36);
            }))(),
            contentCreateTs : this.forumTopic.published,
            contentLink : this.forumTopic.itemUrl
         };
      }
   };
   
   try{
      com.ibm.lconn.layout.track.read(tracker.getContentId(), tracker.getItemType(), {
	  	 context : "ee",
		 network : network,
		 oauth: oauth,
         source : tracker.getSource(),
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
   dojo.subscribe("social/ee/forumtopic/load", function(topic, network, oauth) {
      if (topic) { 
         com.ibm.social.ee.track.forumTopic.read(topic, network, oauth);
      }
   });
})();