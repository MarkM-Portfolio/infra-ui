/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Data store for groups
 * @class lconn.core.GroupsDataStore
 */

dojo.provide("lconn.core.GroupsDataStore");
dojo.require("dojo.data.util.sorter");

dojo.declare("lconn.core.GroupsDataStore", null, /** @lends lconn.core.GroupsDataStore.prototype */ {
   constructor: function( /* Object */ keywordParameters, node) {
      this.queryParam = (keywordParameters.queryParam ? keywordParameters.queryParam : node.getAttribute("queryParam"));

      this.url = (keywordParameters.url ? keywordParameters.url : node.getAttribute("url"));

      if (keywordParameters.orgId) {
         this.orgId = keywordParameters.orgId;
      }

      if (keywordParameters.searchLimit) {
         this.searchLimit = keywordParameters.searchLimit;
      }

      if (keywordParameters.showMaxTypeaheadResults) {
         this.showMaxTypeaheadResults = keywordParameters.showMaxTypeaheadResults;
      }

      if (keywordParameters.groupTypeahead) {
         this.groupTypeahead = keywordParameters.groupTypeahead;
      }

      if (keywordParameters.browsingChildGroups) {
         this.browsingChildGroups = keywordParameters.browsingChildGroups;
      }

      this.typeaheadCache = [];
      this.browseCache = [];

   },

   // queryParam: string
   //      The search attribute for getting JSON
   //      The store will be queried like this:
   //      url?queryParam=query
   queryParam: '',

   typeaheadCache: null,
   browseCache: null,

   // Groups parameters (these are in addition to the parameters used by PeopleDataStore
   // Organization Id: string
   orgId: null,

   // Move to servlet ...
   // Search limit setting for directory services API calls: int
   searchLimit: 100,

   // Move to servlet ...
   // Max results that can be shown for group typeahead results: int
   showMaxTypeaheadResults: 100,

   // Group typeahead: bool
   //   if false using group browse
   groupTypeahead: true,

   // browsing (find of) child groups for the current group selection: bool
   //   if false then perform initial group lookup
   browsingChildGroups: false,

   maxCharactersToDisplayInGroupTypeAhead: 100,

   debug: false,

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
      this.debugLog("Entered fetch");

      var params = {};
      var cache;

      //this.searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);
      if (this.groupTypeahead)
         cache = this.typeaheadCache;
      else
         cache = this.browseCache;

      var startIndex = keywordArgs.start ? keywordArgs.start : 0;
      this.debugLog("fetch: test cache first");

      //If we don't test typeof here, then cache["sort"] will return true because sort() is a function on arrays! #DJOS7S8PNY
      if (typeof cache[keywordArgs.query.toLowerCase()] == "object") {
         this.debugLog("fetch: using cache for query = " + keywordArgs.query);

         var items = cache[keywordArgs.query.toLowerCase()];
         keywordArgs.totalItemCount = items.length;
         //var endIndex = (keywordArgs.count && (keywordArgs.count !== Infinity)) ? (startIndex + keywordArgs.count) : items.length;
         //keywordArgs.onComplete(items.slice(startIndex, endIndex), keywordArgs);
         // this was needed to allow previous/next actions in addgroups.js to function right otherwise subsequent searches messed up
         keywordArgs.onComplete(items.slice(startIndex, items.length), keywordArgs);

         this.debugLog("Left fetch");
         return keywordArgs;
      }

      if (this.queryParam)
         params[this.queryParam] = keywordArgs.query;

      // Pass all of these group parameters to the group selection servlet
      params.orgId = this.orgId;
      params.searchLimit = this.searchLimit;
      params.showMaxTypeaheadResults = this.showMaxTypeaheadResults;
      params.groupTypeahead = this.groupTypeahead;
      params.browsingChildGroups = this.browsingChildGroups;

      dojo.xhrGet({
         url: this.url,
         content: params,
         handleAs: "json-comment-optional",
         timeout: 5000,
         //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
         load: dojo.hitch(this, function(data) {
            //TODO: Keep cache in check?
            var cache;
            if (this.groupTypeahead)
               cache = this.typeaheadCache;
            else
               cache = this.browseCache;

            var hasMoreResults = data.items.length > this.showMaxTypeaheadResults;
            var lastItem;
            if (hasMoreResults) {
               lastItem = data.items.pop();
            }

            cache[keywordArgs.query.toLowerCase()] = data.items;

            if (keywordArgs.sort) {
               data.items.sort(dojo.data.util.sorter.createSortFunction(keywordArgs.sort, this));
            } else {
               var defaultSort = [{
                  attribute: "name",
                  descending: false
               }];
               data.items.sort(dojo.data.util.sorter.createSortFunction(defaultSort, this));
            }

            if (hasMoreResults) {
               data.items.push(lastItem);
            }

            // we were asked to trim what we show for group name to 80 chars in type-ahead
            // so we need to setup a new fullName versus clipped name property
            for (var counter = 0; counter < data.items.length; counter++) {
               // we will reference full name later
               data.items[counter].fullName = data.items[counter].name;

               if (this.groupTypeahead) {
                  if (data.items[counter].name.length > this.maxCharactersToDisplayInGroupTypeAhead) {
                     data.items[counter].name = data.items[counter].name.substring(0, this.maxCharactersToDisplayInGroupTypeAhead) + "...";
                  }
               }
            }

            if (keywordArgs.onComplete) {
               if (this.groupTypeahead) {
                  keywordArgs.totalItemCount = data.items.length;
                  keywordArgs.onComplete(data.items, keywordArgs);

                  //var endIndex = (keywordArgs.count && (keywordArgs.count !== Infinity)) ? (startIndex + keywordArgs.count) : keywordArgs.totalItemCount;
                  //keywordArgs.onComplete(data.items.slice(startIndex, endIndex), keywordArgs);                  
               } else {
                  keywordArgs.totalItemCount = data.items.length;
                  var endIndex = (keywordArgs.count && (keywordArgs.count !== Infinity)) ? (startIndex + keywordArgs.count) : keywordArgs.totalItemCount;
                  keywordArgs.onComplete(data.items.slice(startIndex, endIndex), keywordArgs);
               }
            }

         }),
         error: function() {
            if (keywordArgs.onError) {
               keywordArgs.onError(arguments[0]);
            }
            console.log("There was an error fetching the group information");
         }
      });

      this.debugLog("Left fetch");

      return keywordArgs;
   },

   getValue: function(item, attribute, defaultValue) {
      if (item && item[attribute])
         return item[attribute];
      else
         return defaultValue;
   },

   setGroupTypeahead: function(value) {
      this.groupTypeahead = value;
   },

   setBrowsingChildGroups: function(value) {
      this.browsingChildGroups = value;
   },

   setOrgId: function(value) {
      this.orgId = value;
   },

   debugLog: function(message) {
      if (this.debug || (window.debugComm != null)) {
         if (window.console != null) {
            console.log("GroupsDataStore " + message);
         }
      }
   }

});
