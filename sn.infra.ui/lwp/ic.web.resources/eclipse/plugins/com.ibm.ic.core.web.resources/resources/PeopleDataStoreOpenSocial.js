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
   "ic-core/PeopleDataStore",
   "ic-core/PeopleTypeAheadOpenSocialConverter"
], function (declare, lang, PeopleDataStore, PeopleTypeAheadOpenSocialConverter) {

   /**
    * A subclass of the PeopleDataStore that can handle the OpenSocial People feed.
    *
    * The standard keyword parameters for the PeopleDataStore are accepted along with
    * the following additions:
    *
    * openSocialParams - Associative array of parameter values used for the OS feeds
    *
    * @class ic-core.PeopleDataStoreOpenSocial
    * @extends ic-core.PeopleDataStore
    * @author Jim Antill
    */

   var PeopleDataStoreOpenSocial = declare("lconn.core.PeopleDataStoreOpenSocial", PeopleDataStore, /** @lends ic-core.PeopleDataStoreOpenSocial.prototype */ {

      _openSocialDataConverter: null,
      _openSocialParameters: null,

      network: null,

      constructor: function(keywordParameters, node) {
         // Create the OpenSocial data converter instance.
         this._openSocialDataConverter = new PeopleTypeAheadOpenSocialConverter();

         this.network = keywordParameters.network;

         /* The standard datastore only allows one parameter to be supplied. The OpenSocial datastore
            allows other parameters to be specified that are particular to the OS feeds. */
         if (keywordParameters.openSocialParameters) {
            this._openSocialParameters = keywordParameters.openSocialParameters;
         }
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

           if(this.searchDirectory)
               cache = this.dirCache;
           else
               cache = this.cache;

           //If we don't test typeof here, then cache["sort"] will return true because sort() is a function on arrays! #DJOS7S8PNY
           if(typeof cache[keywordArgs.query.toLowerCase()] == "object") {
               //This class doesn't use the count parameter - make count=the number of items, to prevent "more choices" from showing
               keywordArgs.count = cache.length;
               keywordArgs.onComplete(cache[keywordArgs.query.toLowerCase()], keywordArgs);
               return keywordArgs;
           }

           /* If there are any openSocial feed parameters include these. */
           if (this._openSocialParameters) {
            for (p in this._openSocialParameters) {
               params[p] = this._openSocialParameters[p];
            }
           }

           if(this.queryParam)
               params[this.queryParam] = keywordArgs.query;

           // If doing a directory search use the 'searchType="directory"' parameter.
           if(this.searchDirectory)
               params.searchType = 'directory';

           this.networkGet({
               url: this.url,
               content: params,
               handleAs: "json-comment-optional",
               timeout: 60000,
               //contentType: "application/x-www-form-urlencoded;charset=UTF-8",
               load: lang.hitch(this, function(osData) {
                   //TODO: Keep cache in check?
                   var cache;
                   if(this.searchDirectory)
                       cache = this.dirCache;
                   else
                       cache = this.cache;

                   // Convert the feed from OpenSocial.
                   var data = this._openSocialDataConverter.convertOpenSocialPeopleTypeAheadFeed(osData);

                   //This class doesn't use the count parameter - make count=the number of items, to prevent "more choices" from showing
                   keywordArgs.count = data.items.length;
                   cache[keywordArgs.query.toLowerCase()] = data.items;
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
       }
   });

   return PeopleDataStoreOpenSocial;
});
