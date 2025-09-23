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

dojo.provide("com.ibm.social.ee.gadget._RecommendationsMixin");
dojo.require("com.ibm.social.ee.widget.Recommendation");

dojo.declare("com.ibm.social.ee.gadget._RecommendationsMixin", null, {
   // Must be implemented by subclass 
   getRecommendElement: function () { },
   // May be implemented by subclass   
   getRecommendInlineDSClass: function() { return "com.ibm.social.ee.data.RecommendationsDataStore"; },
   getRecommendPopupDSClass: function () { return "com.ibm.social.ee.data.RecommendationsDataStore"; }, 
   getRecommendOptions: function() { return { }; },
//   onErrorMessage: function () { },
   
   recommendationWidgetClass: "com.ibm.social.ee.widget.Recommendation",

   destroyUI: function () {
      this.inherited(arguments);
      if (this.recommendWidget) {
         this.recommendWidget.destroy();
         delete this.recommendWidget;
      }
   },   
   
   _createDs: function (className, opts) {
      var clz = dojo.getObject(className);
      return new clz(opts);
   },
   
   initializeRecommendations: function () {
      var inlineDs = this._createDs(this.getRecommendInlineDSClass(), this.getRecommendInlineDSOptions());
      var popupDs = this._createDs(this.getRecommendPopupDSClass(), this.getRecommendPopupDSOptions());
      var profilesRoutes = this.getProfilesRoutes();
      var self = this;
      var recommend404 = (this.recommendation404) ? this.recommendation404 : self.nls.common.like_error;
      var recommendOpts = {
         currentUserId: self.authUser.id,
         dataStore: inlineDs,
         popupDataStore: popupDs,
         displayNameAttr: "name",
         userIdAttr: "id",
         mailAttr: "email",
         strings: {error_404: recommend404},
         getUserProfileUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserProfileUrl),
         getUserPhotoUrl: dojo.hitch(profilesRoutes, profilesRoutes.getUserPhotoUrl),
         _blankGif: dojo.config.blankGif,
         onSizeChange: dojo.hitch(self, self.onSizeChange),
         onErrorMessage: dojo.hitch(self, self.onErrorMessage)
      };
      var additionalOpts = this.getRecommendOptions();
      if (additionalOpts) {
         dojo.mixin(recommendOpts, additionalOpts);
      }
      var cannotLike = recommendOpts.currentUserId ? false : true;
      var likeCount;
      var dfd = new dojo.Deferred();
      inlineDs.fetch({ onBegin: function(count) { likeCount = count; dfd.callback(); }  })
      dfd.addCallback(function() {
         if (likeCount > 0 || !cannotLike) {
            var widgetConst = dojo.getObject(self.recommendationWidgetClass);
            dojo.addOnLoad(function() {
               self.recommendWidget = new widgetConst(recommendOpts, self.getRecommendElement());
               self.onSizeChange();
            });
         }
      });
   },
   getRecommendInlineDSOptions: function () {
      var self = this;
      var opts = { 
         net: self.network,
         authUser: dojo.clone(self.authUser),
         countOnly: true         
      };
      var specificOpts = this.getRecommendDSOptions();
      if (specificOpts) {
         dojo.mixin(opts, specificOpts);
      }
      return opts;
   },
   getRecommendPopupDSOptions: function () {
      var self = this;
      var opts = {
         net: self.network,
         authUser: dojo.clone(self.authUser)         
      };
      var specificOpts = this.getRecommendDSOptions();
      if (specificOpts) {
         dojo.mixin(opts, specificOpts);
      }
      return opts;      
   }
   
});