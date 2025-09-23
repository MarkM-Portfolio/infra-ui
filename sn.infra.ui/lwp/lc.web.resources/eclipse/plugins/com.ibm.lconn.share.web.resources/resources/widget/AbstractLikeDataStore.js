/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.AbstractLikeDataStore");

dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("com.ibm.oneui._base");

dojo.declare("lconn.share.widget.AbstractLikeDataStore", [dojo.data.ItemFileWriteStore, com.ibm.oneui._base], {
   newItem : function(/* object */keywordArgs) {
      if (!keywordArgs["name"]) {
         keywordArgs["name"] = this.currentLogin.name;
      }
      this.recommendAction(true);
      this.hasRecommended = true;
      return this.inherited(arguments);
   },

   deleteItem : function(item, keywordArgs) {
      this.recommendAction(false);
      this.hasRecommended = false;
      return this.inherited(arguments);
   },

   _getItemByIdentity: function(identity){
      var item = this.inherited(arguments);
      if (this.hasRecommended)
         return item || this.currentLogin;
      this.hasRecommended = !!item;
      return item;
   },
   
   _getItemsFromLoadedData: function(data){
      this.recommendationsCount = data.totalRecommendations || data.totalSize || 0;
      if (typeof data.recommended != "undefined")
         this.hasRecommended = data.recommended;
      this.inherited(arguments);
   },
   
   handleRecommend: function(recommended, response, ioArgs){
      if (this._request) this._request = null;
      if (response instanceof Error) {
         this.hasRecommended = !recommended;
         this._updateCount(!recommended);
         this.onError(response.code);
      }else {
         this.hasRecommended = recommended;
      }
   },
   
   _updateCount: function(isRecommend){
      var count = this.recommendationsCount;
      if (isRecommend) 
         count ++;
      else 
         count --;
      this.recommendationsCount = count;
   },
   
   onError: function(code) {
      throw new Error("AbstractLikeDataStore: method 'onError'. Must use a subclass to override this method");
   },
   
   recommendAction : function(isRecommend) {
      throw new Error("AbstractLikeDataStore: method 'recommendAction'. Must use a subclass to override this method");
   },
   
   loadItem : function(/* object */keywordArgs)
   {
      // keywordArgs:
      // An anonymous object that defines the item to load and callbacks to
      // invoke when the
      // load has completed. The format of the object is as follows:
      // {
      // item: object,
      // onItem: Function,
      // onError: Function,
      // scope: object
      // }
      this.logEnter(arguments);
      this.inherited(arguments);
      var scope = keywordArgs.scope ? keywordArgs.scope : dojo.global;
      try
      {
         if (keywordArgs.onItem && keywordArgs.item)
         {
            keywordArgs.onItem.call(scope, keywordArgs.item);
         }
      }
      catch (error)
      {
         if (keywordArgs.onError)
         {
            keywordArgs.onError.call(scope, error);
         }
      }

      this.logExit(arguments);
   }
});
