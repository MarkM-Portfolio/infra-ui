/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LikeInfo");

dojo.require("com.ibm.oneui.controls.Like");
/**
 * 
 * Use this widget to render the like icon and the count in the UI when the ratingCount is already known 
 * and the it is impossible to send AJAX request to fetch the real data. Usually when you want to show up
 * the like widget in a list, you will need this widget.
 * 
 * This widget accepts the following JSON argument
 * {
 *    domNode: Required. The html element to hold the like widget
 *    nls: Required. The string bundle, must contain the following key: NOT_RECOMMENDED, LABEL_A_MANY, LABEL_A_ONE, ALT_TEXT
 *    count:Required. The number of person who like this
 *    popupArgs: Optional. JSON object. If not provided, the like widget will not popup the list of person.
 *               Here is a sample. <Deprecated> because this format may introduce bad client performance
 *               {
 *                   dataStore: Required. The data store object used by com.ibm.oneui.controls.LikePopup
 *                   getUserPhotoUrl: Required. A method to return the user photo url, must accept userId as the first parameter
 *                   getUserProfileUrl: Required. A method to return the user profile url, must accept userId as the first parameter
 *                   currentUserId: Required. The logged in user ID
 *                   displayNameAttr: Optional. The attribute name of the user name in JSON
 *                   userIdAttr: Optional. The attribute name of the user ID in JSON
 *                   mailAttr: Optional. The attribute name of the user email in JSON
 *                   handlerMethodName, Optional. The attribute is a method name of the datastore, where you handle the Like/Undo requests. Default value is 'handleRecommend'
 *               }
 *               another example<Recommended>:
 *               {
 *                   createPopup: Required. The function used to create the com.ibm.oneui.controls.LikePopup object
 *                   handlerMethodName, Optional. The attribute is a method name of the datastore, where you handle the Like/Undo requests. Default value is 'handleRecommend'
 *               }
 * }
 * Wiki: https://w3-connections.ibm.com/wikis/home?lang=en#/wiki/W0d8f31412d14_4f33_8531_f59d53eac6ff/page/Like%20widget
 * 
 */
dojo.declare("lconn.share.widget.LikeInfo", null, {
   popupArgs: null,
   count: null,
   domNode: null,
   nls: null,
   
   constructor: function(args){
      dojo.mixin(this, args);
      
      this.hasPopup = (this.popupArgs != null);
      var count = this.count;
      if (count == 0) 
         this.nls.LIKES = this.nls.NOT_RECOMMENDED;
      else
         this.nls.LIKES = count > 1 ? dojo.string.substitute(this.nls.LABEL_A_MANY, [count]) : this.nls.LABEL_A_ONE;
   },
   
   update: function() {
      var domNode = this.domNode;
      var d = document;
      var likeWidget = this.inlineLaunchPopup;
      
      var count = (this.hasPopup && this._popup) ? this._popup.dataStore.recommendationsCount : this.count;
      
      if (count == 0)
          this.nls.LIKES = this.nls.NOT_RECOMMENDED;
      else
          this.nls.LIKES = count > 1 ? dojo.string.substitute(this.nls.LABEL_A_MANY, [count]) : this.nls.LABEL_A_ONE;
      
      if (!likeWidget){
         dojo.empty(domNode);
         
         var div = domNode.appendChild(d.createElement("div"));
            dojo.addClass(div, "lotusLike");
         var likeWidget = this.hasPopup ? div.appendChild(d.createElement("a")) : div.appendChild(d.createElement("div"));
      }
      
      likeWidget.className = "lotusLikeCount lotusLikeSimple";
      likeWidget.title = this.nls.LIKES;
      likeWidget.href = "javascript:;";
      dojo.attr(likeWidget, "role", "button");
      dojo.attr(likeWidget, "aria-haspopup", "true");
      
    if (this.hasPopup){
       likeWidget.role = "button";
       dijit.setWaiState(likeWidget, "label", this.nls.LIKES);
    } else {
       dojo.addClass(likeWidget, "lotusDisabled");
    }
     this.inlineLaunchPopup = likeWidget;
     this._getPopup(this.inlineLaunchPopup);

      dojo.empty(likeWidget);
      var img = likeWidget.appendChild(d.createElement("img"));
         img.src = dojo.config.blankGif;
         img.className = "lotusIconLike";
         
         var useHeartLikeIcon = lconn.core.config.features("ui-heart-like-hikari");
         if(useHeartLikeIcon){
        	 img.className = "lotusIconLike ui-heart-like-hikari";
         }
         
         img.alt = this.nls.LIKES;
         
      var span = likeWidget.appendChild(d.createElement("span"));
         span.className = "lotusAltText";
         span.appendChild(d.createTextNode(this.nls.LIKES));
     
      var bodyElem = d.getElementsByTagName("body")[0];
      if (!dojo.hasClass(bodyElem, "dijit_a11y")) {
        likeWidget.appendChild(d.createTextNode(count));
     }
      return this.domNode;
   },
   
   openPopup: function() {
      this._getPopup(this.inlineLaunchPopup).open();
   },
   
   _getPopup: function(link) {
      if (!this._popup) {
         var popupArgs = this.popupArgs;
         var userId = popupArgs.currentUserId;
         var createPopup = popupArgs.createPopup;
         var handler = popupArgs.handlerMethodName || "handleRecommend";
         if (createPopup){
            this._popup = createPopup(link);
         }else {
            popupArgs = dojo.mixin( 
                  {
                     showActions: !!userId,
                     loadIndividualStyles: false,
                     recommendationsCount: this.count,
                     around: link
                  }, popupArgs);
            this._popup = new com.ibm.oneui.controls.LikePopup(popupArgs);
         }
         dojo.connect(this._popup.dataStore, handler, dojo.hitch(this, this.update));
      }
      return this._popup;
   }
});
