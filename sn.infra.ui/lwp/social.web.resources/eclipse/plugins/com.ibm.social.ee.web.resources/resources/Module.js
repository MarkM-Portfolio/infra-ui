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

dojo.provide("com.ibm.social.ee.Module");

dojo.require("com.ibm.social.ee.widget.EELoader");
dojo.require("com.ibm.social.ee.widget.AuthUserEELoader");
dojo.require("com.ibm.social.ee.widget.HtmlJsonEELoader");
/*
   the "com.ibm.social.ee.widget.FileLoader" require was removed as this class will be loaded at EE startup
   only if the Files component is enabled. Please check ConnectionsEE.jsp for further info.
*/
dojo.require("com.ibm.social.ee.widget.BlogEntryLoader");
dojo.require("com.ibm.social.ee.widget.IdeationBlogIdeaLoader");
dojo.require("com.ibm.social.ee.widget.ForumTopicLoader");
dojo.require("com.ibm.social.ee.widget.NetworkInviteLoader");
dojo.require("com.ibm.social.ee.widget.StatusUpdateLoader");
dojo.require("com.ibm.social.ee.widget.GenericLoader");

dojo.require("com.ibm.social.ee.EventRegistry");

(function () {
   var r = com.ibm.social.ee.EventRegistry;
   
   // Register event UIs here
   var blogsEvents = [
      "blog.entry.created", 
      "blog.entry.updated", 
      "blog.entry.recommended",
      "blog.comment.created", 
	  "blog.comment.updated",
      "blog.trackback.created", 
	  "blog.trackback.updated", 
      "blog.comment.recommended",
      "blogs.notification.notify",
	  "blogs.notification.notify-comment",
	  "blog.entry.notification.mention",
	  "blog.comment.notification.mention"];
      
   var ideationBlogsEvents = [
      "ideationblog.idea.created", 
      "ideationblog.idea.updated",
      "ideationblog.comment.recommended", 
      "ideationblog.comment.created",
	  "ideationblog.comment.updated",
      "ideationblog.trackback.created", 
	  "ideationblog.trackback.updated", 
      "ideationblog.idea.voted",
      "ideationblog.idea.graduated",
      "ideationblog.notification.notify-idea",
	  "ideationblog.notification.notify-comment",
      "ideationblog.idea.notification.mention",
	  "ideationblog.comment.notification.mention"];
                            
   var statusUpdateEvents = [
      // Community board
      "community.wallpost.created", 
      "community.wall.comment.added", 
      "community.wall.recommendation.added",
       
      "community.wall.comment.recommendation.added",
      "community.wall.comment.notification.mention",
      "community.wall.notification.mention",

      // Profile board
      "profiles.wallpost.created",
      "profiles.wall.comment.added",
      "profiles.wall.recommendation.added",
      
      "profiles.wall.comment.recommendation.added",
      "profiles.status.notification.mention",
      "profiles.wallpost.notification.mention",
      "profiles.status.comment.notification.mention",
      "profiles.wallpost.comment.notification.mention",  

      // Personal board
      "profiles.status.updated",
      
      // Notifications
      "profiles.notification.notifyboardownerforentry",
      "profiles.notification.notifyboardownerforcomment",
      "profiles.notification.notifyentryownerforcomment"
      ];
      
   var forumsEvents = [
      "forum.topic.created", 
      "forum.topic.updated",
      "forum.topic.recommended",
      "forum.topic.reply.created",
      "forum.topic.reply.updated",
      "forum.topic.recommended",
      "forum.topic.reply.recommended",
      "forum.topic.reply.unrecommended",
      "forum.topic.notification.mention",
      "forum.reply.notification.mention"
      ];
      
   var networkInviteEvent = [
      "profiles.colleague.created",
      "profiles.notification.notify"];  
      
   var filesEvents = [
      "files.file.created",
      "files.file.share.created",
      "files.file.updated",
      "files.file.tag.added",
      "files.file.tag.added.multiple",
      "files.file.recommended",
      "files.file.recommend.created",
      "files.file.comment.created",
      "files.file.comment.updated",
      "files.community.file.added",
      "files.community.file.added.edit.edit",
      "files.collection.file.added",
      "files.folder.file.added",
      
      //Notifications
      "files.file.comment.notification.mention",
      "files.notification.share",
      "files.notification.mediaedit",
      "files.notification.commentadd",
      "files.notification.communityvisibilityupdated",
      "files.notification.collectionmemberupdate",
      "files.notification.collectionmediaadded",
      "files.notification.singleDownload"];
   
   var ecmFilesEvents = [
      "ecm.file.added.to.teamspace",
      "ecm.file.checkin",
      "ecm.file.checkout",
      "ecm.comment.created",
      "ecm.comment.updated",
      "ecm.tag.created",
      "ecm.recommendation.created",
      "ecm.review.comment.created",
      "ecm.review.comment.updated",
      "ecm.review.document.approved",
      "ecm.review.document.cancelled",
      "ecm.review.document.rejection_accepted",
      "ecm.review.task.requested",
      "ecm.review.task.required",
      "ecm.review.document.submitted",
      "ecm.review.task.approved",
      "ecm.review.task.cancelled",
      "ecm.review.document.rejected",
      "ecm.review.task.unrejected",
      "ecm.review.task.unapproved"];

   r.setDefault("com.ibm.social.ee.widget.GenericLoader");                       
   r.register(blogsEvents, "com.ibm.social.ee.widget.BlogEntryLoader");
   r.register(ideationBlogsEvents, "com.ibm.social.ee.widget.IdeationBlogIdeaLoader");
   r.register(statusUpdateEvents, "com.ibm.social.ee.widget.StatusUpdateLoader");
   r.register(forumsEvents, "com.ibm.social.ee.widget.ForumTopicLoader");
   r.register(networkInviteEvent, "com.ibm.social.ee.widget.NetworkInviteLoader");
   r.register(filesEvents, "com.ibm.social.ee.widget.FileLoader");
   r.register(ecmFilesEvents, "com.ibm.social.ee.widget.ECMEntryLoader");
})();