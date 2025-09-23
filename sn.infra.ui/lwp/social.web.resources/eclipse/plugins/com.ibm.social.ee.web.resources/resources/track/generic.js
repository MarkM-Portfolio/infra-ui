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

dojo.provide("com.ibm.social.ee.track.generic");

dojo.require("dojo.cookie");
dojo.require("com.ibm.lconn.layout.track");

com.ibm.social.ee.track.generic.read = function(itemData, network, oauth, source, itemType){
   var typeMapping = {
      // "activity.reply.created" : ["ACTIVITIES", "REPLY"],
      "activity.todo.created" : ["ACTIVITIES", "ENTRY"],
      "activity.todo.completed" : ["ACTIVITIES", "ENTRY"],
      "activity.entry.created" : ["ACTIVITIES", "ENTRY"],
      "activity.created" : ["ACTIVITIES", "ACTIVITY"],
      
      "blog.created" : ["BLOGS", "BLOG"],
      
      "community.created" : ["COMMUNITIES", "COMMUNITY"],
      
      //"files.collection.created": ["FILES", "FOLDER"],
      //"files.collection.updated" : ["FILES", "FOLDER"],
      //"files.collection.file.added" : ["FILES", "FOLDER"],
      
      "forum.topic.created" : ["FORUMS", "TOPIC"],
      "forum.topic.reply.created" : ["FORUMS", "REPLY"],
      "forum.created" : ["FORUMS", "FORUM"],
      "forum.updated" : ["FORUMS", "FORUM"],
      
      "ideationblog.created.community" : ["IDEATIONBLOG", "IDEATIONBLOG"],
            
      "wiki.library.created" : ["WIKIS", "LIBRARY"],
      "wiki.page.created" : ["WIKIS", "PAGE"],
      "wiki.page.updated" : ["WIKIS", "PAGE"]
      
      //"wiki.tag.updated" : ["WIKIS", "PAGE"],
      //"wiki.page.recommendation.added" : ["WIKIS", "PAGE"],
      //"wiki.page.comment.added" : ["WIKIS", "PAGE"],      
   };
   var tracker = {
      item : itemData,
      getSource : function(){
         if (source) {
            return source;
         } else if (typeMapping && typeMapping[this.item.eventType]){
            return typeMapping[this.item.eventType][0];
         }
         return null;
      },
      getContentId : function() {
         var id = this.item.id;
         return id.substring(id.length - 36);
      },
      getItemType : function() {      
         if (itemType) {
            return itemType;
         } else if (typeMapping && typeMapping[this.item.eventType]){
            return typeMapping[this.item.eventType][1];
         }
         return null;
      },
      getAuthUserId : function() {
         var authUser = this.item.authUser;
         return authUser ? authUser.id : null;
      },
      getCommunityId : function() {
         var communityId = this.item.communityid;
         if (communityId)
            return communityId.substring(communityId.length - 36);
         return null;
      },
      getExtraMetrics : function() {
         return {
            contentTitle : this.item.title || this.item.summary,
            contentContainerId : this.item.containerid || null,
            contentCreatorId : (dojo.hitch(this, function(){
                var id = this.item.actor.id;
                return id.substring(id.length - 36);
            }))(),
            contentCreateTs : this.item.published,
            contentLink : this.item.itemUrl
        //  eventType: this.item.eventType
         };
      }
   };
   
   try{
      com.ibm.lconn.layout.track.read(tracker.getContentId(), tracker.getItemType(), {
		 context : "ee",
         sid: dojo.cookie("JSESSIONID"),
		 network : network,
		 oauth: oauth,
         source : tracker.getSource() || "EE",
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
   dojo.subscribe("social/ee/generic/load", function(genericData, network, oauth) {
      if (genericData) { 
         com.ibm.social.ee.track.generic.read(genericData, network, oauth);
      }
   });
   
   dojo.subscribe("social/ee/forumtopic/load", function(topic, network, oauth) {
      if (topic) { 
         com.ibm.social.ee.track.generic.read(topic, network, oauth, "FORUMS", "TOPIC");
      }
   });
   
   dojo.subscribe("social/ee/blogentry/load", function(entry, network, oauth) {
      if (entry) { 
         com.ibm.social.ee.track.generic.read(entry, network, oauth, "BLOGS", "ENTRY");
      }
   });
   
   dojo.subscribe("social/ee/ideationblogidea/load", function(idea, network, oauth) {
      if (idea) { 
         com.ibm.social.ee.track.generic.read(idea, network, oauth, "IDEATIONBLOG", "IDEA");
      }
   });
})();