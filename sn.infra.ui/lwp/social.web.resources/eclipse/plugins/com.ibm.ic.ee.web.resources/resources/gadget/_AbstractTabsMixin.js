define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"ic-ui/util/aria/TabPanel"
], function (declare, lang, domConstruct, TabPanel) {

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
	
	var _AbstractTabsMixin = declare("com.ibm.social.ee.gadget._AbstractTabsMixin", null, {
	   // Must be implemented by subclass
	   getTabContainerId: function() {},
	   getTabInitializers: function() {},
	
	   // Tab initializer functions
	   initTabContainer: function() {
	      this.tabPanel = new TabPanel(this.getTabContainerId());
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
	         return lang.hitch(this, this[initFuncName]);
	      }
	      return null;
	   },
	   
	   _showTabLoading: function (aTab) {
	      var container = aTab.parentNode;
	      var li = this._tabLoading = domConstruct.create("li", { className: "tabLoading" }, container);
	         var a = domConstruct.create("a", { href: "javascript:;"}, li);
	            domConstruct.create("div", { className: "lotusLoading" }, a);
	   },
	   _hideTabLoading: function () {
	      if (this._tabLoading) {
	         domConstruct.destroy (this._tabLoading);
	         this._tabLoading = null;
	      }
	   }
	   
	});
	return _AbstractTabsMixin;
});