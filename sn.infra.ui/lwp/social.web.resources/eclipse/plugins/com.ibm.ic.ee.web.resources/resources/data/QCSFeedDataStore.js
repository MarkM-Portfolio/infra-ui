/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/has",
	"ic-ee/bean/File",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, has, File, DomBuilder, FeedDataStore, dom, text) {

	(function(){
	var tu =  text;
	var du =  dom;
	var QCSFeedDataStore = declare("com.ibm.social.ee.data.QCSFeedDataStore", FeedDataStore, {
	   _domBuilder: new DomBuilder(),
	   getTotalItems: function(el) {
	      return parseInt(du.getChildElementTextContentNS(el, "totalResults", du.OPENSEARCH_NAMESPACE));
	   },
	   getStdParams: function(request) {
	      var params = {};
	      if(has("ie"))
	         params.format = "xml";
	      var start = null;
	      if (request.start)
	         start = request.start + 1;
	      if (start) {
	         params.sI = start;
	      }
	      if (request.count) {
	         params.pageSize = request.count;
	      }
	      if (request.sort && request.sort.length > 0) {
	         params.sK = request.sort[0].attribute;
	         params.sO = (request.sort[0].descending) ? "dsc" : "asc";
	      }
	      return params;
	   },
	   getCategory: function(el) {
	      return du.getChildElementAttribute(el, "category", "term");
	   },
	   getDeleteHandleAs: function() {
	      return "text"; 
	   },
	   itemFromDocElAndCat: function (el, base, category, keywordArgs) {
	      return new File(el, base);
	   }   
	
	});
	
	})();
	return QCSFeedDataStore;
});
