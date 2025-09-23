/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/has",
	"ic-ee/bean/BlogComment",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/uri"
], function (dojo, declare, has, BlogComment, DomBuilder, FeedDataStore, uri) {

	var BlogCommentFeedDataStore = declare("com.ibm.social.ee.data.BlogCommentFeedDataStore", FeedDataStore, {
		_domBuilder: new DomBuilder(),
	
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
			return new BlogComment(el, base);
		},
	
		_fetch: function (request) {
			var params = this.getStdParams(request);
			params.category = ["comment"];
			var feedUrl = uri.rewriteUri(this.url, params);
			request.url = feedUrl;
			request.params = params;
			this.inherited(arguments, [request]);
		},
	
		/* 
		 * Loading the comments can be done in stages. Based on your requests for more comments. Comments are loaded based on starts and count parameters. 
		 * Since the API for comments allows only page and count, we might need to skip some of the comments we get back (this.skipCount)
		 */
		dataLoaded: function (request, doc, ioArgs, opts) {  
			var util = com.ibm.social.incontext.util; 
			var opts = opts ? opts : {};
			var error = util.atom.getError(doc, ioArgs);
			if (error && error.type) {
				this.dataError(request, error);
				return;
			}      
			var el = doc.documentElement;
			var base = util.dom.getAttributeNS(el,"base",util.dom.XML_NAMESPACE);   
			this.preInitializeItems(request, el, base);
			var entries = this.getDataLoadedEntries(el);   
			var items = request.items ? request.items : [];
			for( var i=this.skipCount; i < entries.length; i++ ) {
				var item = this.itemFromDocEl(entries[i], base);
				item.isFullyLoaded = true;
				item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
				this.initializeItem(item);
				items.push(item);
			}
			this.totalItems = this.getTotalItems(el);
			if (this.totalItems < 0) {
				var next = util.dom.getChildElementAttributeMatchingNS(el, util.dom.ATOM_NAMESPACE, "link", null, "rel", null, "next", "href");
				if (next)
					request.nextFlag = true;
			}              
	
			var target = (request.scope) ? request.scope : window;
	
			if (request.onBegin) {
				request.onBegin.call(target, entries.length, request);
			}
			if (request.onItem) {
				for (i = this.skipCount; i < Math.min(items.length, request.count); i++) {
					request.onItem.call(target, items[i], request);
				}
			}
			if (request.onComplete) {
				var itemsParam = (request.onItem) ? null : items;
				request.onComplete.call(target, itemsParam, request);
			}
	
			this.postInitializeItems(request);
		},   
		_createNewItem: function (keywordArgs, parentInfo) {
			return new BlogComment(null);
		},
	
		_getSaveItemUrl: function(item) {
			var url = this.url;
			return this.rewriteUri(url, { acls: true });
		},
		getStdParams: function(request) {
			//Getting the requested comments. We need to divide all comments into pages, get the right page and ignore the few unwanted comments in the beginning.
			var start, count;
			if("count" in request && request.count !== 0){
				if ("start" in request && "count" in request) {
					start = request.start;
					count = request.count;
					var endIndex = start+count;
					var pageSize = count;
					while (Math.floor(start / pageSize) * pageSize + pageSize != endIndex) {
						pageSize++;
					}	        
					this.skipCount =  pageSize - count;
					count = pageSize;
					start = Math.floor(start / pageSize) + 1;
				} 
			}
			var params = {};
			if(has("ie"))
				params["format"] = "xml";
			if (start) {
				params["page"] = Math.max(0, this.anonymous ? start-1 : start); // Anonymous feed is 0-based
			}
			if (request.count) {
				params["ps"] = count;
			}
			if (request.sort && request.sort.length > 0) {
				params["sortBy"] = request.sort[0].attribute;
				params["sortOrder"] = (request.sort[0].descending) ? "desc" : "asc";
			}
			params["status"] = "published";
			return params;
		},
		getTotalItems: function(el) {      
			return this.totalItems;
		}
	
	});
	return BlogCommentFeedDataStore;
});
