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

dojo.provide("com.ibm.social.ee.widget.ForumTopicLoader");

dojo.require("com.ibm.social.ee.gadget.ForumTopic");
dojo.require("com.ibm.social.ee.data.ForumsRoutes");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.ee.widget.AuthUserEELoader");
dojo.require("com.ibm.social.ee.util.misc");

dojo.declare("com.ibm.social.ee.widget.ForumTopicLoader", [com.ibm.social.ee.widget.AuthUserEELoader], {
	gadgetClass: "com.ibm.social.ee.gadget.ForumTopic",
	createRoutes: function () {
	   return new com.ibm.social.ee.data.ForumsRoutes(this.routesParams);
	},
	getIds: function() {
	   if (this.context.itemUrl) {
   		var urlObj = com.ibm.social.incontext.util.url.parse(this.context.itemUrl);
   		var topicId = dojo.getObject("queryParameters.id", false, urlObj);
   		var replyId = null;
   		if (topicId) {
   		   replyId = dojo.getObject("fragment", false, urlObj);
   		}
   		return { topicId: topicId, replyId: replyId };
	   }
	   else if (this.context.id) {
	      return { topicId: com.ibm.social.ee.util.misc.getItemId(this.context.id) };
	   }
	},
	getGadgetOpts: function () {
	   var opts = this.inherited(arguments);
	   dojo.mixin(opts, this.getIds());
	   return opts;
	},
	getGadgetErrorStrings: function () {
	   return this.nls.forum;
	}
});