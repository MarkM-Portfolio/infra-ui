/* Copyright IBM Corp. 2008, 2017  All Rights Reserved.              */

/*

author: Ryan Silva

*/

dojo.provide("lconn.core.PeopleDataStore");

dojo.require("lconn.core.config.properties");

dojo.declare("lconn.core.PeopleDataStore", null, {
    constructor: function(/* Object */ keywordParameters, node){
        this.queryParam = (keywordParameters.queryParam ? 
                           keywordParameters.queryParam : node.getAttribute("queryParam"));
        
        this.url = (keywordParameters.url ?
                    keywordParameters.url : node.getAttribute("url"));
        this.cache = [];
        this.dirCache = [];
		
		this.network = keywordParameters.network;

    },
    
    // queryParam: string
    //      The search attribute for getting JSON
    //      The store will be queried like this:
    //      url?queryParam=query
    queryParam: '',
    
    maxResults: 100,
    pageSize: 25,
    
    // searchDirectory: bool
    //      Whether or not we should search the directory
    searchDirectory: false,
    
    cache: null,
    dirCache: null,
	
	network: null,
     
        //      { 
        //          query: query-string or query-object,
        //          queryOptions: object,
        //          onBegin: Function,
        //          onItem: Function,
        //          onComplete: Function,
        //          onError: Function,
        //          scope: object,
        //          start: int
        //          count: int
        //          sort: array
        //          searchDirectory: bool
        //      }
    fetch: function(keywordArgs) {
        var params = {};
        var cache;
        
        this.searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);
        if(lconn.core.config.properties['people.legacytypeahead.navigation'] == "true")
        	this.searchBoth = (keywordArgs.queryOptions.autoselectSingleResults ? true : false);
        
        if(this.searchDirectory)
            cache = this.dirCache;
        else
            cache = this.cache;
        
        if(lconn.core.config.properties['people.legacytypeahead.navigation'] == "true"){
        
	        var start = keywordArgs.start || 1;
	        
	        var pageSize = this.pageSize;
	        if(keywordArgs.count && keywordArgs.count != Infinity)
	        	if(this.searchBoth || this.searchDirectory)
	        		pageSize = (keywordArgs.count + 1);
	        	else
	        		pageSize = keywordArgs.count;
            
        }
        //If we don't test typeof here, then cache["sort"] will return true because sort() is a function on arrays! #DJOS7S8PNY
        if(typeof cache[keywordArgs.query.toLowerCase()] == "object") {
            
        	if(lconn.core.config.properties['people.legacytypeahead.navigation'] != "true")
        		keywordArgs.count = cache.length;
        	else
        		keywordArgs.searchType = cache[keywordArgs.query.toLowerCase()].searchType;
            keywordArgs.onComplete(cache[keywordArgs.query.toLowerCase()], keywordArgs);
            return keywordArgs;
        }
        
        if(this.queryParam)
            params[this.queryParam] = keywordArgs.query;
        if(this.searchDirectory)
            params.usedirectory = 'yes';
            
        this.networkGet({
            url: this.url,
            content: params, 
            handleAs: "json-comment-optional",
            timeout: 60000,
            //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            load: dojo.hitch(this, function(data) {
                //TODO: Keep cache in check?
                var cache;
                if(this.searchDirectory)
                    cache = this.dirCache;
                else
                    cache = this.cache;
                    
                //This class doesn't use the count parameter - make count=the number of items, to prevent "more choices" from showing
                if(lconn.core.config.properties['people.legacytypeahead.navigation'] != "true")
                	keywordArgs.count = data.items.length;
                cache[keywordArgs.query.toLowerCase()] = data.items;
                if (window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
                    // Add user icon for cnx8ui
                    dojo.map(data.items, function (user) {
                        if(user && user.userid) {
                            var photo =   window.location.origin + '/profiles/photo.do?userid=' + user.userid;
                            user.src = photo;
                            }
                        return user;
                    });
                }
                if(keywordArgs.onComplete)
                    keywordArgs.onComplete(data.items, keywordArgs);
            }),
            error: function(e, ioargs) {
                console.log("There was an error: " + e.message);
                // Make sure the failed xhr does not cause a redirect since we are
                // within a widget on the page.
                ioargs.xhr.abort();
            }
        });
        
        return keywordArgs;
    },
    
    networkGet: function (opts) {
    	if(this.network && this.network.get) {
    		return this.network.get(opts);
    	}
    	return (this.network || dojo).xhrGet(opts);
    },
    
    getValue: function(item, attribute, defaultValue) {
        if (item[attribute])
            return item[attribute];
        else
            return defaultValue;
    }
});
