define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-geometry",
	"dojo/i18n!ic-incontext/nls/socialInContextCoreStrings",
	"ic-incontext/typeahead/AbstractSearchAdapter",
	"ic-incontext/typeahead/data/CommunityDataStore",
	"ic-incontext/typeahead/widget/TypeAhead",
	"ic-incontext/util/html",
	"ic-incontext/util/text",
	"ic-incontext/util/uri"
], function (dojo, declare, lang, domGeometry, i18nsocialInContextCoreStrings, AbstractSearchAdapter, CommunityDataStore, TypeAhead, html, text, uri) {

	/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */
	
	var CommunitySearchQCSAdapter = declare('com.ibm.social.incontext.typeahead.CommunitySearchQCSAdapter', AbstractSearchAdapter, {
	   maxNameLength: 50,
	   store: {},
	   strings: i18nsocialInContextCoreStrings.COMMUNITYSEARCH, 
	   
	   constructor: function(communitiesTypeAheadUrl, net, proxyFunc){
	      this.communitiesTypeAheadUrl = communitiesTypeAheadUrl;
	      this.net = net;
	      if (proxyFunc) {
	         this.getProxiedUrl = proxyFunc;
	      }
	   },
	   
	   _getStore: function(type){
	      return this.getCommunityTypeAheadStore();
	   },
	   
	   _createTypeAhead: function(input, opt){
	      if(opt.internalOnly)
	         delete opt.orgId;
	      return new TypeAhead(opt, input);
	   },
	   
	   canCreate: function() {
	      return !!this.app && lang.getObject("com.ibm.social.incontext.typeahead.widget.TypeAhead");
	   },
	   
	   changeTypeAheadOpts: function(typeahead, opt){
	       var searchOpts = typeahead.searchOpts || {};
	       if(opt.orgId != searchOpts.orgId && typeahead.store && typeahead.store.clear)
	          typeahead.store.clear();
	       if(opt.orgId)
	          searchOpts.orgId = opt.orgId;
	       else
	          delete searchOpts.orgId;
	       typeahead.searchOpts = searchOpts;
	   },
	   
	   isExternalItem: function(app, item){
	      return !(item.internalOnly === undefined || item.internalOnly);
	   }, 
	   
	   _getDefaultTypeAheadOpt: function(){
	      var maxNameLength = this.maxNameLength;
	      if(this.defaultTypeAheadOpt) return this.defaultTypeAheadOpt;
	      var hintText = this.strings? this.strings.HINT_TEXT: null;
	         
	      var opt = this.defaultTypeAheadOpt = {
	         _strings: this.strings,
	         orient: domGeometry._isBodyLtr() ? {'BL':'TL'} : {'BR':'TR'},
	         nameAttr: "title",
	         decorateItem: function(el, item) {
	            var name = this.formatItem(item);
	            if (name.length > maxNameLength) {
	               el.title = name;
	               name = text.trimToLength(name, maxNameLength);
	               html.removeChildren(el);
	               el.appendChild(document.createTextNode(name));
	            }
	         },
	         hintText: hintText
	      };
	      return opt;
	   },
	   
	   getCommunitiesListServiceUrl: function(opt){
	      var cBaseUrl = this.communitiesTypeAheadUrl;
	      if (cBaseUrl) {
	         var p = {};
	         if(opt.name){
	            p.filterValue = opt.name;
	         }
	         if(opt.pageSize){
	            p.count = opt.pageSize;
	         }
	         if(opt.start){
	            p.startIndex = opt.start;
	         }
	         if(opt.communityType){
	            p.communityType = opt.communityType;
	         }
	         if(opt.orgId)
	            p.orgId = encodeURIComponent(opt.orgId);
	         var url = cBaseUrl + uri.writeParameters(p);
	         url = this.getProxiedUrl(url);
	         return url;
	      }
	      else {
	         return null;
	      }
	   },   
	   getProxiedUrl: function (url) {
	      return url;
	   },   
	   getCommunityTypeAheadStore: function() {
	      var s = this.communityStore;
	      if (!s) {
	         var cfg = lang.getObject("lconn.share.config.services.communitySearch") || {};
	         s = this.communityStore = new CommunityDataStore({
	            net: this.net,
	            getUrl: lang.hitch(this, "getCommunitiesListServiceUrl"),
	            queryParam: "name",
	            maxResults: cfg.maxResults,
	            pageSize: cfg.pageSize
	         });
	      }
	      return s;
	   }   
	});
	
	return CommunitySearchQCSAdapter;
});
