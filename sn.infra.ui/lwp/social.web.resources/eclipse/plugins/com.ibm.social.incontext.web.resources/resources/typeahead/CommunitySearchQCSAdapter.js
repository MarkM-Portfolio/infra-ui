/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.typeahead.CommunitySearchQCSAdapter");
dojo.require("com.ibm.social.incontext.typeahead.data.CommunityDataStore");
dojo.require("com.ibm.social.incontext.typeahead.AbstractSearchAdapter");
dojo.require("com.ibm.social.incontext.typeahead.widget.TypeAhead");
dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.html");

dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");


dojo.declare('com.ibm.social.incontext.typeahead.CommunitySearchQCSAdapter', com.ibm.social.incontext.typeahead.AbstractSearchAdapter, {
   maxNameLength: 50,
   store: {},
   strings: dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").COMMUNITYSEARCH, 
   
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
      return new com.ibm.social.incontext.typeahead.widget.TypeAhead(opt, input);
   },
   
   canCreate: function() {
      return !!this.app && dojo.getObject("com.ibm.social.incontext.typeahead.widget.TypeAhead");
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
         orient: dojo._isBodyLtr() ? {'BL':'TL'} : {'BR':'TR'},
         nameAttr: "title",
         decorateItem: function(el, item) {
            var name = this.formatItem(item);
            if (name.length > maxNameLength) {
               el.title = name;
               name = com.ibm.social.incontext.util.text.trimToLength(name, maxNameLength);
               com.ibm.social.incontext.util.html.removeChildren(el);
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
         var url = cBaseUrl + com.ibm.social.incontext.util.uri.writeParameters(p);
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
         var cfg = dojo.getObject("lconn.share.config.services.communitySearch") || {};
         s = this.communityStore = new com.ibm.social.incontext.typeahead.data.CommunityDataStore({
            net: this.net,
            getUrl: dojo.hitch(this, "getCommunitiesListServiceUrl"),
            queryParam: "name",
            maxResults: cfg.maxResults,
            pageSize: cfg.pageSize
         });
      }
      return s;
   }   
});
