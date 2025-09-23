define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/cookie",
	"dojo/topic",
	"com/ibm/lconn/layout/track"
], function (dojo, lang, config, cookie, topic, track) {

	/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
	
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
	            contentCreatorId : (lang.hitch(this, function(){
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
	      track.read(tracker.getContentId(), tracker.getItemType(), {
			 context : "ee",
	         sid: cookie("JSESSIONID"),
			 network : network,
			 oauth: oauth,
	         source : tracker.getSource() || "EE",
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
	   topic.subscribe("social/ee/generic/load", function(genericData, network, oauth) {
	      if (genericData) { 
	         com.ibm.social.ee.track.generic.read(genericData, network, oauth);
	      }
	   });
	   
	   topic.subscribe("social/ee/forumtopic/load", function(topic, network, oauth) {
	      if (topic) { 
	         com.ibm.social.ee.track.generic.read(topic, network, oauth, "FORUMS", "TOPIC");
	      }
	   });
	   
	   topic.subscribe("social/ee/blogentry/load", function(entry, network, oauth) {
	      if (entry) { 
	         com.ibm.social.ee.track.generic.read(entry, network, oauth, "BLOGS", "ENTRY");
	      }
	   });
	   
	   topic.subscribe("social/ee/ideationblogidea/load", function(idea, network, oauth) {
	      if (idea) { 
	         com.ibm.social.ee.track.generic.read(idea, network, oauth, "IDEATIONBLOG", "IDEA");
	      }
	   });
	})();
	return com.ibm.social.ee.track.generic;
});
