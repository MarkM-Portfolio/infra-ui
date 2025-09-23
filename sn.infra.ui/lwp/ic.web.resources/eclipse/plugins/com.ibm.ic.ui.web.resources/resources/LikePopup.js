/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/topic",
   "./recommend/Popup",
   "./LikePerson"
], function (declare, topic, Popup, LikePerson) {

   /**
    * @class ic-ui.LikePopup
    * @extends ic-ui.recommend.Popup
    * @author Bernadette Carter <bacarter@us.ibm.com>
    */
   return declare("com.ibm.oneui.LikePopup", Popup, /** @lends ic-ui.LikePopup */ {
      popupWidth : 300,
      fixedMaxHeight : true,
      /**
       * @fires ic-ui/likePopup/personAdded
       */
      createPersonNode : function(pObj) {
         pObj.profileURL = this.getUserProfileUrl(pObj.id);
         if (!pObj.photoURL || pObj.photoURL == "") {
            pObj.photoURL = this.getUserPhotoUrl(pObj.id);
         }
         var pWid = new LikePerson(pObj);
         this._getStateObject().widgets.push(pWid);
         topic.publish("ic-ui/likePopup/personAdded", pWid);
         return pWid.domNode;
      }
   });
});
