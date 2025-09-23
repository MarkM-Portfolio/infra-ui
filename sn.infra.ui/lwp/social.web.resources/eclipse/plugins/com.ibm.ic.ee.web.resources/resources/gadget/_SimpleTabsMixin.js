define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/query",
	"ic-ee/gadget/_AbstractTabsMixin"
], function (declare, lang, dom, domClass, query, _AbstractTabsMixin) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2013                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _SimpleTabsMixin = declare("com.ibm.social.ee.gadget._SimpleTabsMixin", _AbstractTabsMixin, {
	   // Must be implemented by subclass
	   getTabStylePrefix: function() {},
	   
	   // Switch tabs
	   switchTab: function (tabName) {
	      var tabContainer = dom.byId(this.getTabContainerId());
	      var tabStylePrefix = this.getTabStylePrefix();
	      var selectedTab = query(".lotusSelected", tabContainer)[0];
	      if (domClass.contains(selectedTab, tabStylePrefix + "-tab-" + tabName)) // Tab is already selected
	         return;
	      
	      this._showTabLoading(selectedTab);
	      var dfd = null;
	      var initializer = this._getTabInitializer(tabName);
	      if (initializer)  {
	         dfd = initializer();
	      }
	      var changeTab = lang.hitch(this, function() {
	         this._hideTabLoading();
	         // Remove selected styles from currently selected
	         domClass.remove(selectedTab, "lotusSelected");
	         
	         // Set selected styles on new tab
	         var newTab = dom.byId(this.prefix + "_" + tabName + "Tab");
	         domClass.add(newTab, "lotusSelected");
	         
	         // Now switch tab panel
	         query(".eeTabBody." + tabStylePrefix + "-selected").style("display", "none").removeClass(tabStylePrefix + "-selected");
	         query(".eeTabBody." + tabStylePrefix + "-tab-" + tabName + "-body").style("display", "").addClass(tabStylePrefix + "-selected");
	         this.onSizeChange();
	      });
	      if (dfd)
	         dfd.addCallback(changeTab);
	      else
	         changeTab();
	      
	   }   
	
	});
	return _SimpleTabsMixin;
});