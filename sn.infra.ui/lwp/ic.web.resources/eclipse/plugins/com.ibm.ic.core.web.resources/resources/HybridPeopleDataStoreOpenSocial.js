/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "ic-core/PeopleFinderDataStore",
   "ic-core/PeopleTypeAheadOpenSocialConverter"
], function (declare, lang, PeopleFinderDataStore, PeopleTypeAheadOpenSocialConverter) {

   /**
    * @class ic-core.HybridPeopleDataStoreOpenSocial
    * @extends ic-core.PeopleFinderDataStore
    */
   var HybridPeopleDataStoreOpenSocial = declare("lconn.core.HybridPeopleDataStoreOpenSocial", PeopleFinderDataStore, /** @lends ic-core.HybridPeopleDataStoreOpenSocial.prototype */ {

      _openSocialDataConverter: null,
      _openSocialParameters: null,
      _extendedCache: null,
      extendedTypeAheadUrl: null,
      extendedQueryParam: null,

      network: null,

      constructor: function(keywordParameters, node) {
         // Create the OpenSocial data converter instance.
         this._openSocialDataConverter = new PeopleTypeAheadOpenSocialConverter();

         /* The standard datastore only allows one parameter to be supplied. The OpenSocial datastore
            allows other parameters to be specified that are particular to the OS feeds. */
         if (keywordParameters.openSocialParameters) {
            this._openSocialParameters = keywordParameters.openSocialParameters;
         }

         this._extendedCache = [];
         this.extendedTypeAheadUrl = keywordParameters.extendedTypeAheadUrl;
         this.extendedQueryParam = keywordParameters.extendedQueryParam;
         this.network = keywordParameters.network;
      },

      /**
       * Allow the setting of the OpenSocial parameters after the datastore has been created.
       * @param p - Associative array containing parameters.
       */
      setOpenSocialParameters: function(p) {
         this._openSocialParameters = p;
      },

      /**
       * Override the fetch function so we can convert the OpenSocial feed into one that the
       * typeahead expects.
       */
       fetch: function(keywordArgs) {
           var params = {};
           var cache;

           this.searchDirectory = (keywordArgs.queryOptions.searchDirectory ? true : false);

           if(!this.searchDirectory){
            keywordArgs = this.inherited("fetch", arguments);
           } else {
               cache = this._extendedCache;

               //If we don't test typeof here, then cache["sort"] will return true because sort() is a function on arrays! #DJOS7S8PNY
               if(typeof cache[keywordArgs.query.toLowerCase()] == "object") {
                  //This class doesn't use the count parameter - make count=the number of items, to prevent "more choices" from showing
                  keywordArgs.count = cache.length;
                  keywordArgs.onComplete(cache[keywordArgs.query.toLowerCase()], keywordArgs);
                  return keywordArgs;
               }

               /* If there are any openSocial feed parameters include these. */
               if (this._openSocialParameters) {
                  lang.mixin(params, this._openSocialParameters);
               }

               if(this.extendedQueryParam)
                  params[this.extendedQueryParam] = keywordArgs.query;

               // If doing a directory search use the 'searchType="directory"' parameter.
               if(this.searchDirectory)
                  params.searchType = 'directory';

               if (keywordArgs.count) {
                  params.count = keywordArgs.count;
               }

               this.networkGet({
                  url: this.extendedTypeAheadUrl,
                  content: params,
                  handleAs: "json-comment-optional",
                  timeout: 60000,
                  //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                  load: lang.hitch(this, function(osData) {
                     //TODO: Keep cache in check?
                     var cache = this._extendedCache;

                     // Convert the feed from OpenSocial.
                     var data = this._openSocialDataConverter.convertOpenSocialPeopleTypeAheadFeed(osData);

                     //This class doesn't use the count parameter - make count=the number of items, to prevent "more choices" from showing
                     keywordArgs.count = data.items.length;
                     cache[keywordArgs.query.toLowerCase()] = data.items;
                     if(keywordArgs.onComplete)
                        keywordArgs.onComplete(data.items, keywordArgs);
                  }),

                  error: function() {
                     console.log("There was an error");
                  }
            });
           }

           return keywordArgs;
       }
   });

   return HybridPeopleDataStoreOpenSocial;
});
