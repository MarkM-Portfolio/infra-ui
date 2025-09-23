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

dojo.provide("com.ibm.social.ee.gadget._AbstractTabsMixin");

dojo.require("com.ibm.oneui.util.aria.TabPanel");

dojo.declare("com.ibm.social.ee.gadget._AbstractTabsMixin", null, {
   // Must be implemented by subclass
   getTabContainerId: function() {},
   getTabInitializers: function() {},

   // Tab initializer functions
   initTabContainer: function() {
      this.tabPanel = new com.ibm.oneui.util.aria.TabPanel(this.getTabContainerId());
   },
   
   destroyUI: function () {
      this.inherited(arguments);
      if (this.tabPanel) {
         this.tabPanel.destroy();
         delete this.tabPanel;
      }
   },
   
   _getTabInitializer: function(tabName) {
      var tabInitializers = this.getTabInitializers();
      var initFuncName = tabInitializers[tabName];
      if (initFuncName) {
         return dojo.hitch(this, this[initFuncName]);
      }
      return null;
   },
   
   _showTabLoading: function (aTab) {
      var container = aTab.parentNode;
      var li = this._tabLoading = dojo.create("li", { className: "tabLoading" }, container);
         var a = dojo.create("a", { href: "javascript:;"}, li);
            dojo.create("div", { className: "lotusLoading" }, a);
   },
   _hideTabLoading: function () {
      if (this._tabLoading) {
         dojo.destroy (this._tabLoading);
         this._tabLoading = null;
      }
   }
   
});