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

dojo.provide("com.ibm.social.ee.data.CommentFeedDataStore");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.ee.data.QCSFeedDataStore");
dojo.require("com.ibm.social.ee.bean.Comment");

dojo.declare("com.ibm.social.ee.data.CommentFeedDataStore", [com.ibm.social.ee.data.QCSFeedDataStore], {

   loadItem: function(keywordArgs) {
      var params = {};
      if(dojo.isIE)
         params.format = "xml";
      params.includeTags = true;
      params.acls = true;
      this.inherited(arguments, [keywordArgs, params]);
   },

   itemFromDocElAndCat: function(el, base, category, keywordArgs) {
      return this.itemFromDocEl(el, base);
	},

   itemFromDocEl: function(el, base) {
      return new com.ibm.social.ee.bean.Comment(el, base);
   },

   _fetch: function (request) {
      var params = this._getParams(request);
      var feedUrl = com.ibm.social.incontext.util.uri.rewriteUri(this.url, params);
      request.url = feedUrl;
      request.params = params;
      this.inherited(arguments, [request]);
   },
   
   _getParams: function(request) {
      var params = this.getStdParams(request);
      params.category = ["comment"];
      return params;
   },

   dataLoaded: function(request, doc, ioArgs) {
      var opts = {
         checkForNext: true
      };
      this.inherited(arguments, [request, doc, ioArgs, opts]);
   },

   _createNewItem: function (keywordArgs, parentInfo) {
   	return new com.ibm.social.ee.bean.Comment(null);
   },
   
   _getSaveItemUrl: function(item) {
      var url = this.getValue(item,"urlEntry");
      return this.rewriteUri(url, { acls: true });
   }
});