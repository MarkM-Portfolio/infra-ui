/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/has",
	"ic-ee/bean/ForumReply",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/FeedDataStore",
	"ic-incontext/util/dom",
	"ic-incontext/util/text",
	"ic-incontext/util/uri"
], function (dojo, declare, kernel, has, ForumReply, DomBuilder, FeedDataStore, dom, text, uri) {

	(function() {
	var du = dom;
	var tu = text;   
	
	var ForumRepliesFeedDataStore = declare("com.ibm.social.ee.data.ForumRepliesFeedDataStore", FeedDataStore, {
		_domBuilder: new DomBuilder(),
	
		loadItem: function(keywordArgs) {
			var params = {};
			params.format = "xml";
			this.inherited(arguments, [keywordArgs, params]);
		},
	
		itemFromDocElAndCat: function(el, base, category, keywordArgs) {
			return this.itemFromDocEl(el, base);
		},
	
		itemFromDocEl: function(el, base) {
			return new ForumReply(el, base);
		},
	
		_fetch: function (request) {
			var params = this.getStdParams(request);
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
			var displayCount = entries.length;
			if(entries.length >= request.count) {
			   request.start = 1;
			   displayCount = request.count -1;
			}
			for( var i=this.skipCount; i < displayCount; i++ ) {
				var item = this.itemFromDocEl(entries[i], base);
				item.isFullyLoaded = true;
				item.ds = {isDirty: false, isDeleted: false, isNew: false, attributes: {}};
				this.initializeItem(item);
				items.push(item);
			}
	
			var target = (request.scope) ? request.scope : kernel.global;
	
			if (request.onBegin) {
				request.onBegin.call(target, displayCount, request);
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
			return new ForumReply(null);
		},
	
		_getSaveItemUrl: function(item) {
			var url = this.url;
			return this.rewriteUri(url, { acls: true });
		},
		getStdParams: function(request) {
			var params = {};
			this.skipCount = 0;
			if(has("ie"))
				params["format"] = "xml";
	
			if (request.count) {
			   //Request 1 more than what will be showed in order to determine if hasMore should be true for "show more" link
				params["ps"] = request.count = request.count + 1;
			}
			if (request.sort && request.sort.length > 0) {
			   var attr = request.sort[0].attribute;
			   if (attr == "published")
			      attr = "created";     
			   else if (attr === "modified")
			      attr = "lastmod";
				params["sortBy"] = attr;
				params["sortOrder"] = (request.sort[0].descending) ? "desc" : "asc";
			}
			return params;
		},
		getTotalItems: function(el) {
			return this.totalItems;
		},
		_getPostBody: function(args) {
	      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE,du.SNX_NAMESPACE, du.THREAD_ATOM_NAMESPACE]);
	      var entry = doc.documentElement;
	      if (args.atomId) {
	         var atomId = du.createElementNS(doc,"id",du.ATOM_NAMESPACE);
	            atomId.appendChild(doc.createTextNode(args.atomId));
	         entry.appendChild(atomId);
	      }
	      if(args.title) {
	         var titleElement = du.createElementNS(doc,"title",du.ATOM_NAMESPACE);
	            titleElement.appendChild(doc.createTextNode(args.title));
	         entry.appendChild(titleElement);
	      }     
	      var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
	         category.setAttribute("term", "forum-reply");
	         category.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/type");
	      entry.appendChild(category);
	      if (args.replyTo) {
	         var replyToElement = du.createElementNS(doc, "in-reply-to", du.THREAD_ATOM_NAMESPACE);
	         replyToElement.setAttribute("ref", args.replyTo);
	         entry.appendChild(replyToElement);
	      }
	      if (args.contents) {
	         var content = du.createElementNS(doc,"content",du.ATOM_NAMESPACE);
	            content.setAttribute("type","text/html");
	            content.appendChild(doc.createTextNode(args.contents));
	         entry.appendChild(content);
	      }
	      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
	      return tu.trim(postBody);      
		}
	});
	
	})();
	return ForumRepliesFeedDataStore;
});
