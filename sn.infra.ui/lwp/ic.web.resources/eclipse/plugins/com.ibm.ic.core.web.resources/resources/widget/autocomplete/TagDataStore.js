/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/request",
      "ic-ui/AutocompleteDataStore"
], function(array, declare, request, AutocompleteDataStore) {

   var TagDataStore = declare("lconn.core.widget.autocomplete.TagDataStore", AutocompleteDataStore, {

      // handleAs: string
      // Passed to dojo.xhrGet.
      handleAs : "json-comment-optional",

      // url: string
      // A templated URL that can be substituted to retrieve the suggested tags
      // from the
      // server. Replaces the tokens:
      // 1) {query} - with the value of kwArgs.query
      // 2) {start} - with the value of kwArgs.start if data store supports a
      // start index
      // 3) {count} - with the value of kwArgs.count if data store supports an
      // end index
      url : null,

      // convert: function(response) (optional)
      // Convert the response object into an Array with child objects such that:
      // 1) The array represents the set of items for the current page
      // 2) If more results are available, the hasMore member of the array is
      // set to true
      // 3) If a total size of results is available, the total member of the
      // array is set to the number of items
      // 4) Each item is an object which obeys the following constraints:
      // a) getValue(item, "name") returns the name of the tag
      // b) getValue(item, "count") returns the number of results found for that
      // tag or "undefined"
      // This value may be set to null to imply that no transformation must be
      // done of the response.
      // The default implementation assumes the response is an array object.
      convert : function(response) {
         return (response.length > 0 && typeof response[0] == "string") ? array.map(response, function(name) {
            return {
               name : name
            }
         }) : response;
      },

      getQueryResults : function(kwArgs) {
         var deferred = request(this.getUrl(kwArgs), {
            method : "GET",
            handleAs : this.handleAs
         });
         if (this.convert)
            deferred.addCallback(this, "convert");
         return deferred;
      },

      getUrl : function(kwArgs) {
         var url = this.url.replace("{query}", encodeURIComponent(kwArgs.query));
         url = url.replace("{start}", encodeURIComponent(kwArgs.start || 0));
         url = url.replace("{count}", encodeURIComponent(kwArgs.count || 20));
         return url;
      }
   });

   return TagDataStore;
});
