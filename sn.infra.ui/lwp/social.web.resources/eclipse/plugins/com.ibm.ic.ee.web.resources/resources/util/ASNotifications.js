define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date/stamp",
	"dojo/topic",
	"ic-ee/data/WebResourcesRoutes",
	"ic-incontext/util/url"
], function (dojo, declare, lang, stamp, topic, WebResourcesRoutes, url) {

	/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */
	
	var ASNotifications = declare("com.ibm.social.ee.util.ASNotifications", null, {
	   /** Expects the following when constructed:
	    *  - network - A network object to make requests
	    *  - rollupUrl - The rollup URL for this item
	    *  - inGadget - true if we are in a gadget
	    **/
	   constructor: function (opts) {
	      lang.mixin(this, opts);
	      this.init();
	   },
	   init: function () {
	      // Get the right object id from the rollup URL
	      var urlObj = url.parse(this.rollupUrl);
	      this.objectId = lang.getObject("queryParameters.filterValue", false, urlObj);
	
	      // Initialize web resources routes
	      this.wrRoutes = new WebResourcesRoutes();
	
	      // Subscribe to events
	      topic.subscribe("com/ibm/social/ee/comment/beforeCreate", lang.hitch(this, this.beforeCommentCreate));
	      topic.subscribe("com/ibm/social/ee/comment/created", lang.hitch(this, this.commentCreated));
	      topic.subscribe("com/ibm/social/ee/comment/beforeUpdate", lang.hitch(this, this.beforeCommentUpdate));
	      topic.subscribe("com/ibm/social/ee/comment/updated", lang.hitch(this, this.commentUpdated));
	      topic.subscribe("com/ibm/social/ee/comment/beforeDelete", lang.hitch(this, this.beforeCommentDelete));
	      topic.subscribe("com/ibm/social/ee/comment/deleted", lang.hitch(this, this.commentDeleted));
	      topic.subscribe("com/ibm/social/ee/like/beforeLike", lang.hitch(this, this.beforeLike));
	      topic.subscribe("com/ibm/social/ee/like/liked", lang.hitch(this, this.liked));
	      topic.subscribe("com/ibm/social/ee/like/beforeUnlike", lang.hitch(this, this.beforeUnlike));
	      topic.subscribe("com/ibm/social/ee/like/unliked", lang.hitch(this, this.unliked));
	      topic.subscribe("com/ibm/social/ee/file/beforeShare", lang.hitch(this, this.beforeShare));
	      topic.subscribe("com/ibm/social/ee/file/shared", lang.hitch(this, this.shared));
	      topic.subscribe("com/ibm/social/ee/networkInvite/beforeAccept", lang.hitch(this, this.beforeAccept));
	      topic.subscribe("com/ibm/social/ee/networkInvite/accepted", lang.hitch(this, this.inviteAccepted));
	      topic.subscribe("com/ibm/social/ee/networkInvite/beforeIgnore", lang.hitch(this, this.beforeIgnore));
	      topic.subscribe("com/ibm/social/ee/networkInvite/ignored", lang.hitch(this, this.inviteIgnored));
	      topic.subscribe("com/ibm/social/ee/review/accepted", lang.hitch(this, this.reviewAccepted));
	      topic.subscribe("com/ibm/social/ee/review/rejected", lang.hitch(this, this.reviewRejected));
	   },
	   beforeCommentCreate: function () {
	      this.startedTime = new Date();
	   },
	   commentCreated: function (datetime) {
	      this.notify(datetime);
	   },
	   beforeCommentUpdate: function () {
	      this.startedTime = new Date();
	   },
	   commentUpdated: function (datetime) {
	      this.notify(datetime)
	   },
	   beforeCommentDelete: function () {
	      this.startedTime = new Date();
	   },
	   commentDeleted: function (datetime) {
	      this.notify(datetime, true);
	   },
	   beforeLike: function () {
	      this.startedTime = new Date();
	   },
	   liked: function (datetime) {
	      this.notify(datetime);
	   },
	   beforeUnlike: function () {
	      this.startedTime = new Date();
	   },
	   unliked: function (datetime) {
	      this.notify(datetime, true);
	   },
	   beforeShare: function () {
	      this.startedTime = new Date();
	   },
	   shared: function (datetime) {
	      this.notify(datetime);
	   },
	   beforeAccept: function () {
	      this.startedTime = new Date();
	   },
	   inviteAccepted: function (datetime) {
	      this.notify(datetime);
	   },
	   beforeIgnore: function () {
	      this.startedTime = new Date();
	   },
	   inviteIgnored: function (datetime) {
	      this.notify(datetime);
	   },
	   reviewAccepted: function() {
	      this.notify(null, true);   
	   },
	   reviewRejected: function() {
		  this.notify(null, true);   
	   },
	   notify: function (datetime, dontSendTime) {
	      if (!datetime && !dontSendTime) {
	         var self = this;
	         this.getSystemTime(function (datetime) {
	            self.sendNotification(datetime);
	         });
	      }
	      else
	         this.sendNotification(dontSendTime ? null : datetime);
	   },
	   getSystemTime: function (func) {
	      var self = this;
	      this.network.getJson({
	         url: this.wrRoutes.getSystemTimeUrl(),
	         handle: function (response) {
	            if (!response || response instanceof Error) {
	               // We cannot send this notification, since we don't have a timestamp
	            }
	            else {
	               // Adjust system time by the time difference between the time the operation started and now.
	               var systemTimeMillis = response.time;
	               var timeDiff = self.startedTime ? (new Date()).getTime() - self.startedTime.getTime() : 1000 /* best guess */;
	               if (func) {
	                  var timestamp = new Date();
	                  timestamp.setTime(systemTimeMillis - timeDiff);
	                  func.call(self, timestamp);
	               }
	            }
	         }
	      });
	   },
	   sendNotification: function(datetime) {
	      var params = [this.objectId];
	      if (datetime)
	         params.push(stamp.toISOString(datetime, { zulu: true }));
	      topic.publish("com/ibm/social/ee/event/addentry", params);
	   }
	});
	return ASNotifications;
});
