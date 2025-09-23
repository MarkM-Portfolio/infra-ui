/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.PeopleDataStore");
dojo.require("lconn.share.util.text");

dojo.declare("lconn.share.widget.PeopleDataStore", null, {
    constructor: function(/* Object */ keywordParameters, node){
        dojo.mixin(this, keywordParameters);
        this.queryParam = (keywordParameters.queryParam ? 
                           keywordParameters.queryParam : node.getAttribute("queryParam"));
        
        this.clear();
    },
    
    minChars: dojo.getObject("lconn.share.config.services.peopleSearch.minChars") || 2,
    searchDelay: dojo.getObject("lconn.share.config.services.peopleSearch.searchDelay") || 400,

    getSearchDelay: function(/*String*/ query) {
        query = query.toLowerCase();
        var delay = 0;
        if (this.fastCache[query])
           delay = 0;
        else if (this.networkUrl && query.length <= this.minChars)
           delay = 0;
        else
           delay = this.searchDelay;
        return delay;
    },
    shouldStartSearch: function(/*String*/ query){
        query = query.toLowerCase();
        if (this.fastCache[query] || this.networkUrl)
           return true;
        return undefined;
    },


    // queryParam: string
    //      The search attribute for getting JSON
    //      The store will be queried like this:
    //      url?queryParam=query
    queryParam: '',
    
    maxResults: 100,
    pageSize: 25,

    fastCache: [],
    dirCache: [],
    bothCache: [],
     
    clear: function() {
       this.fastCache = [];
       this.dirCache = [];
       this.bothCache = [];
       delete this.networkCache;
    },
    
        //      { 
        //          query: query-string or query-object,
        //          queryOptions: object,
        //             searchDirectory: bool
        //             searchBoth: bool
        //          onBegin: Function,
        //          onItem: Function,
        //          onComplete: Function,
        //          onError: Function,
        //          scope: object,
        //          start: int
        //          count: int
        //          sort: array
        //      }
    fetch: function(keywordArgs) {
        var params = {};
        var cache;
        
        var searchDirectory = ((keywordArgs.searchDirectory || keywordArgs.queryOptions.searchDirectory) ? true : false);
        var searchBoth = (keywordArgs.queryOptions.searchBoth ? true : false);
        
        if (searchBoth)
            cache = this.bothCache;
        else if (searchDirectory)
            cache = this.dirCache;
        else
            cache = this.fastCache;

		  var start = keywordArgs.start || 1;

		  var pageSize = this.pageSize;
        if(keywordArgs.count && keywordArgs.count != Infinity)
            if(searchBoth || searchDirectory)
                pageSize = (keywordArgs.count + 1);
            else
                pageSize = keywordArgs.count;

        var query = keywordArgs.query.toLowerCase();
        var isServerQuery = (lconn.share.util.text.lengthUtf8(keywordArgs.query) >= this.minChars); // If we are searching on 0 or 1 characters, we check the local people store
        keywordArgs.hideEmptyResults = !isServerQuery;
        
        var cacheKey = query;
        
        var cached = (isServerQuery) ? cache[cacheKey] : this.networkCache;
        if (cached) {
           keywordArgs.searchType = isServerQuery ? cached.searchType : "directory";

           if (keywordArgs.onComplete)
              keywordArgs.onComplete(this.mergeData(query, this.networkCache, cached, start, pageSize), keywordArgs);
           return keywordArgs;
        }
        
        if(this.queryParam)
            params[this.queryParam] = keywordArgs.query;
            
        if (this.orgId)
        	params.orgId = this.orgId;

        if (searchBoth)
            params.searchType = ['fastlist','directory'];
        else if (searchDirectory)
            params.searchType = 'directory';
        else
            params.searchType = 'fastlist';

        if (typeof this.anonymous == "undefined")
           this.anonymous = true;
        
        var url = isServerQuery ? (this.url || this.getUrl(null, {anonymous: this.anonymous})) : this.networkUrl;
		  if (url == null) {
           console.log("No URL available to call, complete immediately");
           if (keywordArgs.onError)
              keywordArgs.onError();
           return keywordArgs;
		  }

		  if (isServerQuery) {
           params.pageSize = this.maxResults;
           url = lconn.share.util.uri.rewriteUri(url, {pageSize: null, searchType: null, userState: "active"});
           if (this.internalOnly)
              url = lconn.share.util.uri.rewriteUri(url, {internalOnly: this.internalOnly, userState: "active"});
		  }
		  
		  var self = this;
        this.net.getJson({
            url: url,
            content: params, 
            timeout: 5000,
            noStatus: true,
            background: true,
            auth: {secured: false},
            handle: dojo.hitch(this, function(data, ioArgs) {
               if(data instanceof Error) {
                  console.log("There was an error");
                  return;
               }
               dojo.map(data.items, function(item){
                  item.userid = item.id;
                  item.type = item.userState == "active" ? "0" : "1";
               });
               if (isServerQuery) {
                  cache[cacheKey] = data;
                  data.isServerQuery = isServerQuery; // query data from the server comes filtered for matches
               }
               else {
                  if (self.activeOnly)
                     data.items = dojo.filter(data.items, function(i) {return !(i.userState == 'inactive');});
                  self.networkCache = data;
               }
               
               keywordArgs.searchType = isServerQuery ? data.searchType : "directory";
               if (keywordArgs.onComplete) {
                  var merged = self.mergeData(query, self.networkCache, data, start, pageSize);
                  keywordArgs.onComplete(merged, keywordArgs);
               }
            })
        });
        
        return keywordArgs;
    },
    
    mergeData: function(query, networkData, data, start, pageSize) {
       var items = [];
       var byId = {};
       this.filter(query, networkData, items, byId);
       if (data.isServerQuery) {
          // add to items if not already added by id
          dojo.forEach(data.items, function(item) {
             if (!byId[item.id]) {
                items.push(item);
                byId[item.id] = 1;
             }
          });
       }
       return items.slice(start-1, start-1+pageSize);
    },
    
    filter: function(query, networkData, items, byId) {
       var items = items || [];
       var byId = byId || {};
       if (networkData) {
          // Split the query into search tokens
          var tokens = query.split(/[\s\u3000",\(\[]+/i);

          dojo.forEach(networkData.items, function(item) {
             // Build the search text for this item
             // Result is a single string with search tokens separated by newlines
             if (!item.searchText) {
                item.searchText = " ";
                item.searchText += item.name  ? (item.name.toLowerCase()  + " ") : "";
                item.searchText += item.email ? (item.email.toLowerCase() + " ") : "";
                item.searchText += item.id    ? (item.id.toLowerCase()    + " ") : "";
                item.searchText = item.searchText.replace(/[\s\u3000",\(\[]+/g, "\n");
             }

             // Ensure that each token in the query begins a token in the item
             for (var i=0; i<tokens.length; i++)
                if (item.searchText.indexOf("\n" + tokens[i]) == -1)
                   return;
             byId[item.id] = 1;
             items.push(item);
          });
       }
       return items;
    },
    
    getValue: function(item, attribute, defaultValue) {
        if (item[attribute])
            return item[attribute];
        else
            return defaultValue;
    },
    
    getIdentity: function(item) {
       return item.id;
    }
});
