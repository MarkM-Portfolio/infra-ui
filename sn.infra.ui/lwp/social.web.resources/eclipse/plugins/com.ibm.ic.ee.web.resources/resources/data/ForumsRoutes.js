/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/data/AbstractRoutes",
	"ic-incontext/util/url"
], function (declare, AbstractRoutes, url) {

	var ForumsRoutes = declare("com.ibm.social.ee.data.ForumsRoutes", AbstractRoutes, {
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
	      var uu = url;
	      return uu.rewrite(this.getServiceUrl() + (this.oauth ? "/oauth" : "") + "/atom/entrySum", { postUuid: postId });
	   }
	});
	return ForumsRoutes;
});
