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

dojo.provide("com.ibm.social.ee.gadget._SimpleTabsMixin");

dojo.require("com.ibm.social.ee.gadget._AbstractTabsMixin");

dojo.declare("com.ibm.social.ee.gadget._SimpleTabsMixin", [com.ibm.social.ee.gadget._AbstractTabsMixin], {
   // Must be implemented by subclass
   getTabStylePrefix: function() {},
   
   // Switch tabs
   switchTab: function (tabName) {
      var tabContainer = dojo.byId(this.getTabContainerId());
      var tabStylePrefix = this.getTabStylePrefix();
      var selectedTab = dojo.query(".lotusSelected", tabContainer)[0];
      if (dojo.hasClass(selectedTab, tabStylePrefix + "-tab-" + tabName)) // Tab is already selected
         return;
      
      this._showTabLoading(selectedTab);
      var dfd = null;
      var initializer = this._getTabInitializer(tabName);
      if (initializer)  {
         dfd = initializer();
      }
      var changeTab = dojo.hitch(this, function() {
         this._hideTabLoading();
         // Remove selected styles from currently selected
         dojo.removeClass(selectedTab, "lotusSelected");
         
         // Set selected styles on new tab
         var newTab = dojo.byId(this.prefix + "_" + tabName + "Tab");
         dojo.addClass(newTab, "lotusSelected");
         
         // Now switch tab panel
         dojo.query(".eeTabBody." + tabStylePrefix + "-selected").style("display", "none").removeClass(tabStylePrefix + "-selected");
         dojo.query(".eeTabBody." + tabStylePrefix + "-tab-" + tabName + "-body").style("display", "").addClass(tabStylePrefix + "-selected");
         this.onSizeChange();
      });
      if (dfd)
         dfd.addCallback(changeTab);
      else
         changeTab();
      
   }   

});