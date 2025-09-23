/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ECMComment",
	"ic-ee/data/CommentFeedDataStore"
], function (declare, ECMComment, CommentFeedDataStore) {

	var ECMCommentsFeedDataStore = declare("com.ibm.social.ee.data.ECMCommentsFeedDataStore", CommentFeedDataStore, {
	   /**
	    * The number of comments to throw away.  This is necessary because the
	    * paging used by the ECM API prevents us from requesting only the comments
	    * we need. 
	    */
	   skipCount: 0,
	   forceDraftComments: false,
	   
	   /**
	    * Returns the URL parameters required by the ECM API.
	    * 
	    * This method overrides CommentFeedDataStore._getParams().
	    */
	   _getParams: function(request) {
	      var params = this.inherited(arguments);
	      params.sK = "created";
	      if (this.forceDraftComments)
	         params.category = ["draftcomment"];
	      this._startIndexToPage(request, params);
	      return params;
	   },
	   
	   /**
	    * Converts the start index parameter to a page parameter. The ECM API does
	    * not support the start index ("sI") parameter correctly, so it is best to
	    * avoid it.
	    * 
	    * The request parameter should contain the following fields:
	    *   - start (number) the first comment to load
	    *   - count (number) the number of comments to load
	    *   
	    * The following fields will be set in the params parameter:
	    *   - pageSize (number) the number of comments per page
	    *   - page (number) the page to load (indexed from 1)
	    * 
	    * TODO What checks need to be done on the parameters?
	    */
	   _startIndexToPage: function(request, params) {
	      var startIndex = request.start;
	      var pageSize = this.cmtCount = request.count;
	      var endIndex = startIndex + pageSize;
	      
	      // This shouldn't happen, but just in case
	      if (pageSize < 1) {
	        // console.warn("Expected request.count to be greater than 0");
	         pageSize = 1;
	      }
	      
	      while (!this._isGoodPageSize(startIndex, endIndex, pageSize)) {
	         pageSize++;
	      }
	      
	      params.pageSize = pageSize;
	      params.page = Math.floor(startIndex / pageSize) + 1; // Now indexed from 1
	      
	      this.skipCount = startIndex % pageSize;
	   },
	   
	   _isGoodPageSize: function(startIndex, endIndex, pageSize) {
	      var page = Math.floor(startIndex / pageSize); // Indexed from 0
	      var lastOnPage = page * pageSize + pageSize;
	      
	      // "Good" if the page also includes the last element
	      return lastOnPage >= endIndex;
	   },
	   
	   /**
	    * Returns an array containing the entry DOM elements for the comments that
	    * were actually requested.
	    * 
	    * This uses the skipCount instance variable to determine how many (if any)
	    * extra comments are returned.  These extra comments may be before or after the
	    * requested comments (i.e., if 5-9 are returned but comments 6, 7, and 8 are 
	    * requested, comment 5 and 9 will not be returned).
	    * 
	    * This method overrides FeedDataStore.getDataLoadedEntries().
	    */
	   getDataLoadedEntries: function(el) {
	      var util = com.ibm.social.incontext.util;
	      var entries = util.dom.getChildElementsNS(el, "entry", util.dom.ATOM_NAMESPACE);
	      return entries.slice(this.skipCount, this.skipCount + this.cmtCount);
	   },
	   itemFromDocEl: function(el, base) {
	      return new ECMComment(el, base);
	   },
	   _createNewItem: function (keywordArgs, parentInfo) {
	      return new ECMComment(null);
	   }
	});
	
	return ECMCommentsFeedDataStore;
});
