/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.ForumsRoutes");

dojo.require("com.ibm.social.ee.data.AbstractRoutes");
dojo.require("com.ibm.social.incontext.util.url");

dojo.declare("com.ibm.social.ee.data.ForumsRoutes", com.ibm.social.ee.data.AbstractRoutes, {
   service: "forums",
   getTopicEntryUrl: function (id) {
      return this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/atom/topic?topicUuid=" + id;
   },
   getTopicWebUrl: function (topicId) {
      return this.getServiceUrl() + "/html/topic?id=" + topicId;
   },
   getReplyWebUrl: function (topicId, replyId) {
      return this.getTopicWebUrl(topicId) + "#" + replyId;
   },
   getSummaryUrl: function (postId) {
      var uu = com.ibm.social.incontext.util.url;
      return uu.rewrite(this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/atom/entrySum", { postUuid: postId });
   }
});