/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./LikePopup",
   "./recommend/Inline"
], function (declare, LikePopup, Inline) {

   /**
    * @class ic-ui.Like
    * @extends ic-ui.recommend.Inline
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   return declare("com.ibm.oneui.controls.Like", Inline, /** @lends ic-ui.Like.prototype */ {
      getPopup: function(popupArgs) {
         if (!this._popup) {
            popupArgs.dataStore = this.popupDataStore || this.dataStore;
            popupArgs.getUserProfileUrl = this.getUserProfileUrl;
            popupArgs.getUserPhotoUrl = this.getUserPhotoUrl;
            this._popup = new LikePopup(popupArgs);
         }
         return this._popup;
      },
      getUserProfileUrl: function(id){
         return "";
      },
      getUserPhotoUrl: function(id) {
         return "";
      }
   });
});
