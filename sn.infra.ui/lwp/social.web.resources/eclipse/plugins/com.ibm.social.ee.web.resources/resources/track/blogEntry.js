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
 *    Track read event in EE for blog entry and ideationblog idea
 *    
 **This file is obsolete, blog entry ee read is tracked in generic.js**
 */

dojo.provide("com.ibm.social.ee.track.blogEntry");

dojo.require("com.ibm.lconn.layout.track");

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
            contentCreatorId : (dojo.hitch(this, function(){
                var id = this.blogEntry.actor.id;
                return id.substring(id.length - 36);
            }))(),
            contentCreateTs : this.blogEntry.published,
            contentLink : this.blogEntry.itemUrl
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
   dojo.subscribe("social/ee/blogentry/load", function(entry, network, oauth) {
      if (entry) { 
         com.ibm.social.ee.track.blogEntry.read(entry, network, oauth, false);
      }
   });
   
   dojo.subscribe("social/ee/ideationblogidea/load", function(idea, network, oauth) {
      if (idea) { 
         com.ibm.social.ee.track.blogEntry.read(idea, network, oauth, true);
      }
   });
})();