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

dojo.provide("com.ibm.social.incontext.typeahead.UserSearchQCSAdapter");
dojo.require("com.ibm.social.incontext.typeahead.AbstractSearchAdapter");
dojo.require("com.ibm.social.incontext.typeahead.widget.PeopleTypeAhead");
dojo.require("com.ibm.social.incontext.typeahead.data.PeopleDataStore");
dojo.require("com.ibm.social.incontext.typeahead.config");
dojo.require("com.ibm.social.incontext.util.uri");

dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");


dojo.declare('com.ibm.social.incontext.typeahead.UserSearchQCSAdapter', com.ibm.social.incontext.typeahead.AbstractSearchAdapter, {
   store:{},
   strings: dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").USERSEARCH,
   constructor: function(filesUrl, net, proxyFunc){
      this.net = net;
      this.filesUrl = filesUrl;
      if (proxyFunc) {
         this.getProxiedUrl = proxyFunc;
      }
   },
   
   canCreate: function() {
      return true;
   },
   
   _getStore: function(type){
      var opt = {
         net: this.net,
         queryParam: "searchString"
      };
      var cfg = dojo.getObject("com.ibm.social.incontext.typeahead.config") || {};
      if(cfg.maxResults) opt.maxResults = cfg.maxResults;
      if(cfg.pageSize) opt.pageSize = cfg.pageSize;
      
      var activeOnly = type.indexOf('_activeOnly') > 0;
      dojo.mixin(opt, {
         getUrl: dojo.hitch(this, activeOnly ? "getActiveTypeAheadUserServiceUrl" : "getTypeAheadUserServiceUrl"),
         activeOnly: activeOnly
      });
      var s = new com.ibm.social.incontext.typeahead.data.PeopleDataStore(opt);
      return s;
   },
   
   _createTypeAhead: function(input, opt){
      return new com.ibm.social.incontext.typeahead.widget.PeopleTypeAhead(opt, input); 
   },
   
   _getDefaultTypeAheadOpt: function(){
      if(this.defaultTypeAheadOpt) return this.defaultTypeAheadOpt;
      var opt = this.defaultTypeAheadOpt = { orient: dojo._isBodyLtr() ? {'BL':'TL'} : {'BR':'TR'} };
      var s = opt._strings = this.strings;
      opt.hintText = s.PERSON_HINT_TEXT;
      return opt;
   },
   
   createTypeAhead: function(input, typeAheadOpt, opt) {
      var typeAhead = this.inherited(arguments);
      if(typeAheadOpt.hintText && typeAhead.updateHintText)
         typeAhead.updateHintText(typeAheadOpt.hintText);
      return typeAhead;
   }, 
   
   getSelected: function(typeAhead, args) {
      // Try getting the item directly from the typeahead first
      var item = typeAhead.item;

      // If the typeahead doesn't have the item, get it from the selection event
      if (!item && args && args[0]) {
         var arg0 = args[0];

         // could be the domNode that was selected, get the item from it
         if (arg0.item)
            item = arg0.item;
            
         // could be the item itself
         if(!item && arg0.id && arg0.name)
            item = arg0;
      }

      if (item && !item.emptyMsg)
         return item;
      return null;
   },
   
   getTypeAheadUserServiceUrl: function(userText) {
      return this.getUserSearchServiceUrl(userText, {anonymous:true});
   },   
   getActiveTypeAheadUserServiceUrl: function(userText) {
      return this.getUserSearchServiceUrl(userText, {anonymous:true, activeOnly: true});
   },   
   getUserSearchServiceUrl: function(userText, opt) {
      var url = this.filesUrl;
      
      if(this.net && !this.net.anonymousNotAllowed)
		   url+="/form/anonymous/";
	   else if(this.net && this.net.oauth)
		   url += "/oauth/";
	   else
		   url += "/form/";
      
      url+="api/people/feed";

      var p = this._getListOptions(opt);
      p.searchString = userText;
      p.format = "json";
      p.sK = "relevanceByName";
      if (opt) {
         if (opt.directory)
            p.searchType = "directory";
         if (opt.includeExtendedAttributes)
            p.includeExtendedAttributes = true;
         if (opt.activeOnly)
            p.userState = "active";
      }
      return this.getProxiedUrl(url + this.getQueryString(p));
   },
   
   _getListOptions: function(opt) {      
      var apiParams = ((opt && opt.apiParams) ? opt.apiParams : this.apiParams) || {};
      var sortKeys = (opt && opt.apiSortKeys) ? opt.apiSortKeys : null;

      var p = {};
      if (opt) {
         if (opt.page && apiParams.page)
            p[apiParams.page] = opt.page;
         else if (opt.start && apiParams.sI)
            p[apiParams.sI] = opt.start;
         else if (opt.page && opt.page > 1 && opt.pageSize && apiParams.sI)
            p[apiParams.sI] = (opt.page - 1) * opt.pageSize + apiParams.zeroItem;

         if (opt.pageSize && apiParams.pageSize)
            p[apiParams.pageSize] = opt.pageSize;
         if (typeof opt.format != "undefined" && apiParams.format)
            p[apiParams.format] = opt.format;
         if (opt.sortKey && apiParams.sK) {
            // Optionally map the sort key to a different sort param for this API
            opt.sortKey = sortKeys ? sortKeys[opt.sortKey] : opt.sortKey;
            if(opt.sortKey) {
               if(apiParams.sO) {
                  p[apiParams.sK] = opt.sortKey;
                  p[apiParams.sO] = opt.sortDescending ? apiParams.dsc : apiParams.asc;
               }
               else {
                  // If we don't support a sort order param, append the sort direction
                  p[apiParams.sK] = opt.sortKey + " " + (opt.sortDescending ? apiParams.dsc : apiParams.asc);
               }
            
               if(apiParams.sC)
                  p[apiParams.sC] = opt.sortCategory;
            }
         }
         if (opt.includeCount === false)
            p.includeCount = false
         
         if (opt.preventCache)
            p.preventCache = new Date().valueOf();
      }

      if (dojo.isIE && apiParams.format)
         p[apiParams.format] = p.format || "xml";
      return p;
   },
   
   getProxiedUrl: function (url) {
      return url;
   }, 
   
   getQueryString: function(map) {
      var quu = com.ibm.social.incontext.util.uri;
      var global = this.globalParameters;
      if (map) {
         if (global) {
            var p = dojo.clone(global);
            for (var key in map)
               p[key] = map[key];
            return quu.writeParameters(p);
         }
         return quu.writeParameters(map);
      } 
      else if (global)
         return quu.writeParameters(global);
      return "";
   }   
});
