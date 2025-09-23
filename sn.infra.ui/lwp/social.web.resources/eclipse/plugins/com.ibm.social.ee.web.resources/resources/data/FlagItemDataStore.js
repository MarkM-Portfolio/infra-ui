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

dojo.provide("com.ibm.social.ee.data.FlagItemDataStore");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.ee.bean.FlagItem");

dojo.declare("com.ibm.social.ee.data.FlagItemDataStore", [com.ibm.social.ee.data.FeedDataStore], {

   _createNewItem: function (keywordArgs, parentInfo) {
   	return new com.ibm.social.ee.bean.FlagItem(null);
	},
   _getPostBody: function(attrs) {
      if(!this.domBuilder)
         this.domBuilder = new com.ibm.social.ee.data.DomBuilder();
   	return this.domBuilder.getFlagItemPostBody(attrs);
   },
   _newItem: function(item, keywordArgs) {
      this.net.postXml({
		   noStatus: true,
		   handleAs: "text",
		   url: this._getNewItemUrl(item),
		   postData: this._getPostBody(item.ds.attributes),
		   requireData: true,
		   headers: {"Content-Type":"application/atom+xml;charset=\"UTF-8\""},
		   handle: dojo.hitch(this, this._saveItemComplete, item, keywordArgs)
		}); 
   }
});

