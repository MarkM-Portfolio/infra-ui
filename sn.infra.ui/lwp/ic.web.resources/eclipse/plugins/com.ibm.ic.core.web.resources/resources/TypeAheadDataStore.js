/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/request"
], function (declare, lang, request) {
   /**
    * @class ic-core.TypeAheadDataStore
    */
   var TypeAheadDataStore = declare("lconn.core.TypeAheadDataStore", null, /** @lends ic-core.TypeAheadDataStore.prototype */
   {
      constructor : function(/* Object */keywordParameters, node) {
         this.queryParam = (keywordParameters.queryParam || node.getAttribute("queryParam"));
         this.url = (keywordParameters.url || node.getAttribute("url"));
      },

      // queryParam: string
      // The search attribute for getting JSON
      // The store will be queried like this:
      // url?queryParam=query
      queryParam : '',
      maxQueryLength : 255,
      cache : [],
      timeout : 5000,
      clear : function() {
         this.cache = [];
      },

      // {
      //    query: query-string or query-object,
      //    queryOptions: object,
      //    onBegin: Function,
      //    onItem: Function,
      //    onComplete: Function,
      //    onError: Function,
      //    scope: object,
      //    start: int
      //    count: int
      //    sort: array
      // }
      fetch : function(keywordArgs) {
         var params = {};

         this.searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);

         // If we don't test typeof here, then cache["sort"] will return true
         // because sort() is a function on arrays! #DJOS7S8PNY
         if (typeof this.cache[keywordArgs.query.toLowerCase()] == "object") {
            // Todo: In this case, we run onComplete before returning, unlike
            // the other case. Is this a problem?
            keywordArgs.onComplete(this.cache[keywordArgs.query.toLowerCase()], keywordArgs);
            return keywordArgs;
         }

         if (this.queryParam) {
            if (this.getUTF8Length(keywordArgs.query) > this.maxQueryLength) {
               var queryKeyWord = this.getUTF8Substring(keywordArgs.query);
               params[this.queryParam] = queryKeyWord;
            }
            else {
               params[this.queryParam] = keywordArgs.query;
            }
         }

         request(this.url, {
            method : "GET",
            query : params,
            handleAs : "json-comment-optional",
            timeout : this.timeout
         }).then(lang.hitch(this, function(data) {
            // Remove {}&& prefix if it exists and parse
        	if(lang.isString(data)){
               if (data.indexOf('{}&&') >= 0) {
                 data = data.replace(/{}&&/, '');
               }
               data = JSON.parse(data);
            }
            // TODO: Keep cache in check?
            this.cache[keywordArgs.query.toLowerCase()] = data;
            if (keywordArgs.onComplete) {
               keywordArgs.onComplete(data, keywordArgs);
            }
         }), function(err) {
            console.log("There was an error: " + err);
         });

         return keywordArgs;
      },

      getUTF8Length : function(query) {
         var len = 0;
         if (query != null) {
            for ( var i = 0; i < query.length; i++) {
               var c = query.charCodeAt(i);
               if (c < 0x007F) {
                  len += 1;
               }
               else if ((0x0080 <= c) && (c <= 0x07FF)) {
                  len += 2;
               }
               else if ((0x0800 <= c) && (c <= 0xFFFF)) {
                  len += 3;
               }
            }
         }
         return len;
      },

      getUTF8Substring : function(query) {
         var substr = query;
         var i = 0;
         while (this.getUTF8Length(substr) > this.maxQueryLength) {
            substr = query.substring(0, query.length - i);
            i++;
         }
         return substr;
      },

      getValue : function(item, attribute, defaultValue) {
         return item;
      }
   });

   return TypeAheadDataStore;
});
