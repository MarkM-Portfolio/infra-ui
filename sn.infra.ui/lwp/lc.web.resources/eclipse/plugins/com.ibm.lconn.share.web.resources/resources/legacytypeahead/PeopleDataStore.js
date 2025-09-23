/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.deprecated("lconn.share.legacytypeahead.PeopleDataStore", "Replace with new typeahead.", "3.5");

dojo.provide("lconn.share.legacytypeahead.PeopleDataStore");

dojo.declare("lconn.share.legacytypeahead.PeopleDataStore", null, {
    constructor: function(/* Object */ keywordParameters, node){
        this.queryParam = (keywordParameters.queryParam ? 
                           keywordParameters.queryParam : node.getAttribute("queryParam"));
        
        this.url = keywordParameters.url;
        this.getUrl = keywordParameters.getUrl;
        this.net = keywordParameters.net;
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
        
        var searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);
        var searchBoth = (keywordArgs.queryOptions.autoselectSingleResult ? true : false);
        
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

        var cacheKey = keywordArgs.query.toLowerCase();
        
        if(cache[cacheKey]) {
            //Todo: In this case, we run onComplete before returning, unlike the other case.
            //      Is this a problem?
            keywordArgs.searchType = cache[cacheKey].searchType;
            keywordArgs.onComplete(cache[cacheKey].items.slice(start-1, start-1+pageSize), keywordArgs);
            return keywordArgs;
        }
        
        if(this.queryParam)
            params[this.queryParam] = keywordArgs.query;
            
        if (searchBoth)
            params.searchType = ['fastlist','directory'];
        else if (searchDirectory)
            params.searchType = 'directory';
        else
            params.searchType = 'fastlist';

		  params.pageSize = this.maxResults;

        this.net.getJson({
            url: this.url || this.getUrl(),
            content: params, 
            timeout: 5000,
            noStatus: true,
            auth: {secured: false},
            handle: dojo.hitch(this, function(data, ioArgs) {
               if(data instanceof Error) {
                  console.log("There was an error");
                  return;
               }
               
               cache[cacheKey] = data;

               keywordArgs.searchType = data.searchType;
               if(keywordArgs.onComplete)
                  keywordArgs.onComplete(data.items.slice(start-1, start-1+pageSize), keywordArgs);
            })
        });
        
        return keywordArgs;
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
