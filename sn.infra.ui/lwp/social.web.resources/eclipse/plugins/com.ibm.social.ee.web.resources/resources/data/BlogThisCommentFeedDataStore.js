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

dojo.provide("com.ibm.social.ee.data.BlogThisCommentFeedDataStore");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.ee.bean.BlogComment");
dojo.require("com.ibm.social.ee.data.DomBuilder");

dojo.declare("com.ibm.social.ee.data.BlogThisCommentFeedDataStore", [com.ibm.social.ee.data.FeedDataStore], {
	_domBuilder: new com.ibm.social.ee.data.DomBuilder(),

	loadItem: function(keywordArgs) {
		var params = {};
		params.format = "xml";
		params.includeTags = true;
		params.acls = true;
		this.inherited(arguments, [keywordArgs, params]);
	},

	itemFromDocElAndCat: function(el, base, category, keywordArgs) {
		return this.itemFromDocEl(el, base);
	},

	itemFromDocEl: function(el, base) {
		return new com.ibm.social.ee.bean.BlogComment(el, base);
	}
});