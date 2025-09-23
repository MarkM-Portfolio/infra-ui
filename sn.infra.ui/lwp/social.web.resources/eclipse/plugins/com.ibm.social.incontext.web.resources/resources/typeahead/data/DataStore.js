/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.typeahead.data.DataStore");

dojo.declare("com.ibm.social.incontext.typeahead.data.DataStore", null, {
    constructor: function(/* Object */ keywordParameters, node){
        this.queryParam = (keywordParameters.queryParam ? 
                           keywordParameters.queryParam : node.getAttribute("queryParam"));
        
        this.url = keywordParameters.url;
        this.getUrl = keywordParameters.getUrl;
        this.net = keywordParameters.net;
        this.cache = {};
    },
    
    // queryParam: string
    //      The search attribute for getting JSON
    //      The store will be queried like this:
    //      url?queryParam=query
    queryParam: '',
    
    clear: function() {
       this.cache = {};
    },
    
        //      { 
        //          query: query-string or query-object,
        //          queryOptions: object,
        //          onBegin: Function,
        //          onItem: Function,
        //          onComplete: Function,
        //          onError: Function,
        //          start: int
        //          count: int
        //          sort: array
        //      }
    fetch: function(keywordArgs) {
        var params = {};
        var cache = this.cache;
        
        var libraryId = keywordArgs.queryOptions.libraryId;
        var userLibrary = keywordArgs.queryOptions.userLibrary;

        var cacheKey = this._getCacheKey(keywordArgs);
        
        if(cache[cacheKey]) {
            //Todo: In this case, we run onComplete before returning, unlike the other case.
            //      Is this a problem?
            keywordArgs.onComplete(cache[cacheKey], keywordArgs);
            return keywordArgs;
        }
        
        var params = this._getParams(keywordArgs);
        this.getJson(keywordArgs, params, cache, cacheKey);

        return keywordArgs;
    },

    getJson: function(keywordArgs, params, cache, cacheKey) {
       var url = this.getUrl(params);

       this.net.getJson({
          url: url,
          noStatus: true,
          background: true,
          auth: {preventLogin: true},
          handle: dojo.hitch(this, this.handleResponse, keywordArgs, cache, cacheKey, params)
       });
   },

   handleResponse: function(keywordArgs, cache, cacheKey, params, response, ioArgs) {
      if (response instanceof Error) {
         if (keywordArgs.onError)
            keywordArgs.onError();
         else
            console.log(response);
      }
      else {
         var items = this._getResponseItems(response, keywordArgs, params);
         cache[cacheKey] = items;
         if(keywordArgs.onComplete)
            keywordArgs.onComplete(items, keywordArgs);
      }
   },

    _getResponseItems: function(response, keywordArgs, params){
       return response.items;
    },
    
    _getCacheKey: function(keywordArgs) {
        // Take into account page size and starting index in cache
        return (keywordArgs.key || "") + "\n" + 
            (keywordArgs.order || "") + "\n" + 
            (keywordArgs.count || "") + "\n" + 
            (keywordArgs.start || "") + "\n" + 
            (keywordArgs.query || "").toLowerCase();
    },
    
    _getParams: function(keywordArgs) {
       var params = {};

        if(this.queryParam && keywordArgs.query)
            params[this.queryParam] = keywordArgs.query;

        // Dojo assumes 0-based, Files assumes 1-based
        if(keywordArgs.start)
            params.start = keywordArgs.start + 1;

        // Request one past the page size 
        if(keywordArgs.count && keywordArgs.count != Infinity)
            params.pageSize = keywordArgs.count + 1;
        
        return params;
    },

    getValue: function(item, attribute, defaultValue) {
        if (item[attribute])
            return item[attribute];
        else
            return defaultValue;
    },
    
    getUrl: function() {
      return this.url;
    }
});
