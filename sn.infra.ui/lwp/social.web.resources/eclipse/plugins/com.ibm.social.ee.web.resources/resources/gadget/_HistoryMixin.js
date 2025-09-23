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

dojo.provide("com.ibm.social.ee.gadget._HistoryMixin");

dojo.require("com.ibm.social.ee.widget.History");
dojo.require("com.ibm.social.ee.util.misc");

dojo.declare("com.ibm.social.ee.gadget._HistoryMixin", null, {
   // Must be implemented by subclass
   getHistoryTab: function() {},
   getHistoryContainer: function() {},
   
   // May be implemented by subclass
   getId: function () {
      return null;
   },
   
   // Lifecycle
   destroyUI: function () {
      this.inherited(arguments);
      if (this.historyWidget) {
         this.historyWidget.destroy();
         delete this.historyWidget;
      }
   },
   
   initializeHistoryTab: function () {
      if (!this.context.rollupUrl || com.ibm.social.ee.util.misc.getItemIdFromRollupUrl(this.context.rollupUrl) == "null") {
         var historyTab = this.getHistoryTab();
         if (historyTab) {
            historyTab.style.display = "none";
         }
         this.historyDisabled = true;
      }      
   },
   getRollupUrl: function() {
      return this.context.rollupUrl;	   
   },
   initializeHistory: function() {
      var dfd = new dojo.Deferred();
      if (this.historyDisabled) {
         dfd.callback();
         return dfd;
      }
      if(!this.historyWidget) {
         var container = this.getHistoryContainer();
         var historyDiv = dojo.create("div", { }, container);
         var rollupUrl = this.getRollupUrl();
         if (this.authUser && this.authUser.id && this.routes.oauth && rollupUrl) {
            // fixup the rollupUrl for oauth
         	if (rollupUrl.indexOf("/oauth/rest/activitystreams") == -1)
               rollupUrl = rollupUrl.replace("/rest/activitystreams", "/oauth/rest/activitystreams");
         }
         var self = this;
         this.historyWidget = new com.ibm.social.ee.widget.History({
            net: self.network,
            uuid: self.getId(),
            routeOptions: self.getRouteOptions(),
            rollupUrl: rollupUrl,
            _blankGif: dojo.config.blankGif,
            generateUserImage: dojo.hitch(self, self.generateUserImage), 
            generateLinkToPerson: dojo.hitch(self, self.generateLinkToPerson),
            onLoaded: function() { dfd.callback(); }
         }, historyDiv);
         dojo.connect(this.historyWidget, "onDisplayChange", this, "onSizeChange");
      }
      else {
         dfd.callback();
      }
      return dfd;
   }
   
});