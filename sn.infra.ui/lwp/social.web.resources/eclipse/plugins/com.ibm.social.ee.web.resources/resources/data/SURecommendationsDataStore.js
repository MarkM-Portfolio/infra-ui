/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.SURecommendationsDataStore");
dojo.require("com.ibm.social.ee.data._JsonRecommendationsMixin");
dojo.require("com.ibm.social.ee.data.DataStore");

(function () {
   var uu = com.ibm.social.incontext.util.uri;
   dojo.declare("com.ibm.social.ee.data.SURecommendationsDataStore", [com.ibm.social.ee.data.DataStore, com.ibm.social.ee.data._JsonRecommendationsMixin], {
    constructor: function () {
       this.baseCount = this.recommendCount - (this.hasRecommended ? 1 : 0);
    }, 
    _getIdentifierAttribute: function () {
       return "id";
    },
    isItem: function (item) {
       if ("id" in item) {
          return true;
       }
       return false;
    },
    getFetchHandleAs: function () {
       return "json";
    },
    fetchItemByIdentity: function ( request ) {
      var userId = request.identity;
      if (!this.retrievedRecommend) {
         var url = this._rewriteUrl(this.url, request.identity);
         this.net.get({
            url: url,
            handleAs: "json",
            failOk: true,
            preventCache: true,
            handle: dojo.hitch(this, function (response, ioArgs) {
               this.retrievedRecommend = true;
               var user = null;
               if (typeof response != "Error" || !(response instanceof Error)) {
                  var id = dojo.getObject("entry.author.id", false, response);
                  if (id) {                  
                     var name = dojo.getObject("entry.author.displayName", false, response);
                     user = { name: name, id: id, 
                              ds: {isDirty: false, isDeleted: false, isNew: false, 
                                   attributes: {}}, 
                              isFullyLoaded: true };
                  }
               }
               if (request.onItem) {
                  var scope = request.scope ? request.scope : dojo.global;
                  request.onItem.apply(scope, [user]);
               }
            })
         });
      }
      else {
         this._getRecommendation(request);
      }
   },
   _newItem: function(item, keywordArgs) {
      dojo.publish("com/ibm/social/ee/like/beforeLike");
      this.net.postJson({
         url: this.url,
         handleAs: "json",
         postData: "",
         headers: {"Content-Type":"application/json; charset=utf-8"},
         handle: dojo.hitch(this, this._recommended, item, keywordArgs)
      });
   },
   _recommended: function (item, keywordArgs, response, ioArgs) {
   	  var published = dojo.getObject("entry.published", false, response);
      dojo.publish("com/ibm/social/ee/like/liked", [published ? dojo.date.stamp.fromISOString(published) : null]);
      this.hasRecommended = true;
      this.recommendCount = this.baseCount + 1;
      this._saveItemComplete(item, keywordArgs, response, ioArgs);
   },
   
   _unRecommended: function (item, keywordArgs, response, ioArgs) {
      this.hasRecommended = false;
      this.recommendCount = this.baseCount;  
      dojo.publish("com/ibm/social/ee/like/unliked");    
      this._saveItemComplete(item, keywordArgs, response, ioArgs);
   },
   _deleteItem: function(item, keywordArgs) {
      dojo.publish("com/ibm/social/ee/like/beforeUnlike");
      this.net.deleteXml({
         url: this.url + "/" + item.id,
         handle: dojo.hitch(this, this._unRecommended, item, keywordArgs),
         headers: {"Content-Type": "application/json; charset=utf-8"},
         handleAs: "json"
      });
   },
   _saveItemComplete: function(item, keywordArgs, response, ioArgs) {
      item.isFullyLoaded = false;
      item.ds.isDirty = false;
      item.ds.isNew = false;
      //note: dont reset item.isDeleted, if its deleted its no longer a valid item      
      if (keywordArgs.requests)
         keywordArgs.requests--;
      var scope = keywordArgs.scope ? keywordArgs.scope : dojo.global;
      //if an error occurred call onError
      var error;
      if(typeof response == "Error" || response instanceof Error)
         error = response;
      if(error && error.code) {
         if (keywordArgs.onError) {
            keywordArgs.onError.call(scope, error);
         }
         return;
      }      
      //if we have no more requests to complete
      if ((!keywordArgs.requests || keywordArgs.requests === 0) && keywordArgs.onComplete)
         keywordArgs.onComplete.call(scope, response, ioArgs);
   },
   _rewriteUrl: function(url, identity) {
      return url + "/" + identity;
   },
   _getEmptyResult: function() {
      return { list: [ ], totalResults: this.recommendCount };
   },
   _getList: function(data) {
      return data.list;
   },
   _getAuthorName: function(item) {
      return item.author.displayName;
   },
   _getAuthorId: function(item) {
      return item.author.id;
   },
   _getTotalResults: function(data) {
      return data.totalResults;
   }
});

})();

