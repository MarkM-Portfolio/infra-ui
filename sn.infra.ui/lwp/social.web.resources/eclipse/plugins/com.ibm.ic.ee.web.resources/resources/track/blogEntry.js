define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/topic",
	"com/ibm/lconn/layout/track"
], function (dojo, lang, config, topic, track) {

	/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
	
	/**
	 *
	 *    Track read event in EE for blog entry and ideationblog idea
	 *    
	 **This file is obsolete, blog entry ee read is tracked in generic.js**
	 */
	
	com.ibm.social.ee.track.blogEntry.read = function(blogEntry, network, oauth, isIdeationBlog){
	   /*
	   var typeMapping = {
	      "blog.entry.created" : ["BLOGS", "ENTRY"],
	      "blog.entry.updated" : ["BLOGS", "ENTRY"],
	      "blog.entry.recommended" : ["BLOGS", "ENTRY"],
	      "blog.comment.recommended" : ["BLOGS", "ENTRY"],
	      "blog.comment.created" : ["BLOGS", "ENTRY"],
	      "blog.trackback.created" : ["BLOGS", "ENTRY"],
	      "ideationblog.idea.created" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.idea.updated" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.comment.created" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.trackback.created" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.idea.voted" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.comment.recommended" : ["IDEATIONBLOG", "IDEA"],
	      "ideationblog.idea.graduated" : ["IDEATIONBLOG", "IDEA"]      
	   };
	   */
	   
	   var tracker = {
	      blogEntry : blogEntry,
	      getSource : function(){
	         return isIdeationBlog ? "IDEATIONBLOG" : "BLOGS";
	      },
	      getContentId : function() {
	         var id = this.blogEntry.id;
	         return id.substring(id.length - 36);
	      },
	      getItemType : function() {
	         return isIdeationBlog ? "IDEA" : "ENTRY";
	      },
	      getAuthUserId : function() {
	         var authUser = this.blogEntry.authUser;
	         return authUser ? authUser.id : null;
	      },
	      getCommunityId : function() {
	         var communityId = this.blogEntry.communityid;
	         if (communityId)
	            return communityId.substring(communityId.length - 36);
	         return null;
	      },
	      getExtraMetrics : function() {
	         return {
	            contentTitle : this.blogEntry.title,
	            contentContainerId : this.blogEntry.containerid,
	            contentCreatorId : (lang.hitch(this, function(){
	                var id = this.blogEntry.actor.id;
	                return id.substring(id.length - 36);
	            }))(),
	            contentCreateTs : this.blogEntry.published,
	            contentLink : this.blogEntry.itemUrl
	         };
	      }
	   };
	   
	   try{
	      track.read(tracker.getContentId(), tracker.getItemType(), {
			 context : "ee",
			 network : network,
			 oauth: oauth,
	         source : tracker.getSource(),
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
	   topic.subscribe("social/ee/blogentry/load", function(entry, network, oauth) {
	      if (entry) { 
	         com.ibm.social.ee.track.blogEntry.read(entry, network, oauth, false);
	      }
	   });
	   
	   topic.subscribe("social/ee/ideationblogidea/load", function(idea, network, oauth) {
	      if (idea) { 
	         com.ibm.social.ee.track.blogEntry.read(idea, network, oauth, true);
	      }
	   });
	})();
	return com.ibm.social.ee.track.blogEntry;
});
