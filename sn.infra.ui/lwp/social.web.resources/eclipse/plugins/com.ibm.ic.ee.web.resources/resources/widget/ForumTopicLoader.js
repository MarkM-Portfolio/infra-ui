/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ee/data/ForumsRoutes",
	"ic-ee/util/misc",
	"ic-ee/widget/AuthUserEELoader",
	"ic-incontext/util/url"
], function (declare, lang, ForumsRoutes, misc, AuthUserEELoader, url) {

	var ForumTopicLoader = declare("com.ibm.social.ee.widget.ForumTopicLoader", AuthUserEELoader, {
		gadgetClass: "com.ibm.social.ee.gadget.ForumTopic",
		createRoutes: function () {
		   return new ForumsRoutes(this.routesParams);
		},
		getIds: function() {
		   if (this.context.itemUrl) {
	   		var urlObj = url.parse(this.context.itemUrl);
	   		var topicId = lang.getObject("queryParameters.id", false, urlObj);
	   		var replyId = null;
	   		if (topicId) {
	   		   replyId = lang.getObject("fragment", false, urlObj);
	   		}
	   		return { topicId: topicId, replyId: replyId };
		   }
		   else if (this.context.id) {
		      return { topicId: misc.getItemId(this.context.id) };
		   }
		},
		getGadgetOpts: function () {
		   var opts = this.inherited(arguments);
		   lang.mixin(opts, this.getIds());
		   return opts;
		},
		getGadgetErrorStrings: function () {
		   return this.nls.forum;
		}
	});
	return ForumTopicLoader;
});
