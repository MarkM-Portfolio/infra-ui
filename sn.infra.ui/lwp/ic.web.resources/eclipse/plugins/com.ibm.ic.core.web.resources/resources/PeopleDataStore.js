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

define([
      "dojo/_base/declare",
      "dojo/_base/lang"
], function(declare, lang) {

   /**
    * People data store
    * 
    * @author Ryan Silva <rsilva@us.ibm.com>
    */

   var PeopleDataStore = declare("lconn.core.PeopleDataStore", null, {
      constructor : function(/* Object */keywordParameters, node) {
         this.queryParam = (keywordParameters.queryParam ? keywordParameters.queryParam : node.getAttribute("queryParam"));

         this.url = (keywordParameters.url ? keywordParameters.url : node.getAttribute("url"));
         this.cache = [];
         this.dirCache = [];

         this.network = keywordParameters.network;

      },

      // queryParam: string
      // The search attribute for getting JSON
      // The store will be queried like this:
      // url?queryParam=query
      queryParam : '',

      // searchDirectory: bool
      // Whether or not we should search the directory
      searchDirectory : false,

      cache : null,
      dirCache : null,

      network : null,

      // {
      // query: query-string or query-object,
      // queryOptions: object,
      // onBegin: Function,
      // onItem: Function,
      // onComplete: Function,
      // onError: Function,
      // scope: object,
      // start: int
      // count: int
      // sort: array
      // searchDirectory: bool
      // }
      fetch : function(keywordArgs) {
         var params = {};
         var cache;

         this.searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);

         if (this.searchDirectory)
            cache = this.dirCache;
         else
            cache = this.cache;

         // If we don't test typeof here, then cache["sort"] will return true
         // because sort() is a function on arrays! #DJOS7S8PNY
         if (typeof cache[keywordArgs.query.toLowerCase()] == "object") {
            // This class doesn't use the count parameter - make count=the
            // number of items, to prevent "more choices" from showing
            keywordArgs.count = cache.length;
            keywordArgs.onComplete(cache[keywordArgs.query.toLowerCase()], keywordArgs);
            return keywordArgs;
         }

         if (this.queryParam)
            params[this.queryParam] = keywordArgs.query;
         if (this.searchDirectory)
            params.usedirectory = 'yes';

         this.networkGet({
            url : this.url,
            content : params,
            handleAs : "json-comment-optional",
            timeout : 60000,
            // contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            load : lang.hitch(this, function(data) {
               // TODO: Keep cache in check?
               var cache;
               if (this.searchDirectory)
                  cache = this.dirCache;
               else
                  cache = this.cache;

               // This class doesn't use the count parameter - make count=the
               // number of items, to prevent "more choices" from showing
               keywordArgs.count = data.items.length;
               cache[keywordArgs.query.toLowerCase()] = data.items;
               if (keywordArgs.onComplete)
                  keywordArgs.onComplete(data.items, keywordArgs);
            }),
            error : function(e, ioargs) {
               console.log("There was an error: " + e.message);
               // Make sure the failed xhr does not cause a redirect since we
               // are
               // within a widget on the page.
               ioargs.xhr.abort();
            }
         });

         return keywordArgs;
      },

      networkGet : function(opts) {
         if (this.network && this.network.get) {
            return this.network.get(opts);
         }
         return (this.network || dojo).xhrGet(opts);
      },

      getValue : function(item, attribute, defaultValue) {
         if (item[attribute])
            return item[attribute];
         else
            return defaultValue;
      }
   });

   return PeopleDataStore;
});
