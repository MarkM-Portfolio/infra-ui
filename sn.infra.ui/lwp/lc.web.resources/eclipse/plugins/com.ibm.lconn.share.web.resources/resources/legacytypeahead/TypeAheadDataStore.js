/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
author: Ryan Silva

*/

dojo.deprecated("lconn.share.legacytypeahead.TypeAheadDataStore", "Replace with new typeahead.", "3.5");

dojo.provide("lconn.share.legacytypeahead.TypeAheadDataStore");

dojo.declare("lconn.share.legacytypeahead.TypeAheadDataStore", null, {
    constructor: function(/* Object */ keywordParameters, node){
        this.queryParam = (keywordParameters.queryParam ? 
                           keywordParameters.queryParam : node.getAttribute("queryParam"));
        
        this.url = (keywordParameters.url ?
                    keywordParameters.url : node.getAttribute("url"));

    },
    
    // queryParam: string
    //      The search attribute for getting JSON
    //      The store will be queried like this:
    //      url?queryParam=query
    queryParam: '',
    
    cache: [],
     
    
    clear: function() {
       this.cache = [];
    },
    
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
        //      }
    fetch: function(keywordArgs) {
        var params = {};
        
        if(this.cache[keywordArgs.query.toLowerCase()]) {
            //Todo: In this case, we run onComplete before returning, unlike the other case.
            //      Is this a problem?
            keywordArgs.onComplete(this.cache[keywordArgs.query.toLowerCase()], keywordArgs);
            return keywordArgs;
        }
        
        if(this.queryParam)
            params[this.queryParam] = keywordArgs.query;
            
        dojo.xhrGet({
            url: this.url,
            content: params, 
            handleAs: "json",
            timeout: 5000,
            load: dojo.hitch(this, function(data) {
                //TODO: Keep cache in check?
                this.cache[keywordArgs.query.toLowerCase()] = data;
                if(keywordArgs.onComplete)
                    keywordArgs.onComplete(data, keywordArgs);
            }),
            error: function() {
                console.log("There was an error");
            }
        });
        
        return keywordArgs;
    },
    
    getValue: function(item, attribute, defaultValue) {
        return item;
    }
});
