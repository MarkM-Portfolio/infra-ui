/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.util.ASNotifications");

dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.data.WebResourcesRoutes");

dojo.declare("com.ibm.social.ee.util.ASNotifications", null, {
   /** Expects the following when constructed:
    *  - network - A network object to make requests
    *  - rollupUrl - The rollup URL for this item
    *  - inGadget - true if we are in a gadget
    **/
   constructor: function (opts) {
      dojo.mixin(this, opts);
      this.init();
   },
   init: function () {
      // Get the right object id from the rollup URL
      var urlObj = com.ibm.social.incontext.util.url.parse(this.rollupUrl);
      this.objectId = dojo.getObject("queryParameters.filterValue", false, urlObj);

      // Initialize web resources routes
      this.wrRoutes = new com.ibm.social.ee.data.WebResourcesRoutes();

      // Subscribe to events
      dojo.subscribe("com/ibm/social/ee/comment/beforeCreate", dojo.hitch(this, this.beforeCommentCreate));
      dojo.subscribe("com/ibm/social/ee/comment/created", dojo.hitch(this, this.commentCreated));
      dojo.subscribe("com/ibm/social/ee/comment/beforeUpdate", dojo.hitch(this, this.beforeCommentUpdate));
      dojo.subscribe("com/ibm/social/ee/comment/updated", dojo.hitch(this, this.commentUpdated));
      dojo.subscribe("com/ibm/social/ee/comment/beforeDelete", dojo.hitch(this, this.beforeCommentDelete));
      dojo.subscribe("com/ibm/social/ee/comment/deleted", dojo.hitch(this, this.commentDeleted));
      dojo.subscribe("com/ibm/social/ee/like/beforeLike", dojo.hitch(this, this.beforeLike));
      dojo.subscribe("com/ibm/social/ee/like/liked", dojo.hitch(this, this.liked));
      dojo.subscribe("com/ibm/social/ee/like/beforeUnlike", dojo.hitch(this, this.beforeUnlike));
      dojo.subscribe("com/ibm/social/ee/like/unliked", dojo.hitch(this, this.unliked));
      dojo.subscribe("com/ibm/social/ee/file/beforeShare", dojo.hitch(this, this.beforeShare));
      dojo.subscribe("com/ibm/social/ee/file/shared", dojo.hitch(this, this.shared));
      dojo.subscribe("com/ibm/social/ee/networkInvite/beforeAccept", dojo.hitch(this, this.beforeAccept));
      dojo.subscribe("com/ibm/social/ee/networkInvite/accepted", dojo.hitch(this, this.inviteAccepted));
      dojo.subscribe("com/ibm/social/ee/networkInvite/beforeIgnore", dojo.hitch(this, this.beforeIgnore));
      dojo.subscribe("com/ibm/social/ee/networkInvite/ignored", dojo.hitch(this, this.inviteIgnored));
      dojo.subscribe("com/ibm/social/ee/review/accepted", dojo.hitch(this, this.reviewAccepted));
      dojo.subscribe("com/ibm/social/ee/review/rejected", dojo.hitch(this, this.reviewRejected));
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
         params.push(dojo.date.stamp.toISOString(datetime, { zulu: true }));
      dojo.publish("com/ibm/social/ee/event/addentry", params);
   }
});