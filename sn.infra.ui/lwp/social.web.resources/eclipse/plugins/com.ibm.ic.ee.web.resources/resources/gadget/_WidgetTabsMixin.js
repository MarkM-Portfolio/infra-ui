define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/on",
	"ic-ee/gadget/_AbstractTabsMixin"
], function (dojo, declare, lang, domAttr, domClass, domStyle, on, _AbstractTabsMixin) {

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
	
	var _WidgetTabsMixin = declare("com.ibm.social.ee.gadget._WidgetTabsMixin", 
	            _AbstractTabsMixin, {
	                     
	      // Must be set by subclass                 
	      widgetTabs: { },   
	      initialTab: null,
	        
	      // Lifecycle       
	      initTabContainer: function () {
	         this.inherited(arguments);
	         var tabs = this.widgetTabs;
	         for (name in tabs) {
	            var tab = this[tabs[name].tab];
	            var tabLink = this[tabs[name].tabLink];
	            var tabBody = this[tabs[name].tabBody];
	            if (tabLink)
	               this.own(on(tabLink, "click", lang.hitch(this, this.switchTab, name, tab, tabLink, tabBody, false)));
	         }
	         if (this.initialTab) {
	            var t = this.initialTab;
	            this.selectedTab = this[tabs[t].tab];
	            this.selectedTabLink = this[tabs[t].tabLink];
	            this.selectedTabBody = this[tabs[t].tabBody];         
	         }
	      },     
	      switchTab: function (tabName, newTab, newTabLink, newTabBody, skipInit) {
	         var hideLoadingFunc = null;
	         if(!skipInit) {
	            if (newTab === this.selectedTab) // Tab is already selected
	               return;
	            this._showTabLoading(this.selectedTab);
	            hideLoadingFunc = lang.hitch(this, this._hideTabLoading);
	         }
	         var changeTab = lang.hitch(this, function(loadingHideFunc) {
	        	if(loadingHideFunc)
	        		loadingHideFunc();
	            
	            // Remove selected styles from currently selected
	        	if(this.selectedTab)
	               domClass.remove(this.selectedTab, "lotusSelected");
	        	if(this.selectedTabLink)
	               domAttr.set(this.selectedTabLink, "aria-selected", "false");
	   
	            // Set selected styles on new tab
	            domClass.add(newTab, "lotusSelected");
	            domAttr.set(newTabLink, "aria-selected", "true");  
	   
	            // Now switch tab panel
	            if(this.selectedTabBody)
	               domStyle.set(this.selectedTabBody, {"display":"none"});
	            domStyle.set(newTabBody, {"display": ""});
	   
	            this.selectedTab = newTab;
	            this.selectedTabLink = newTabLink;
	            this.selectedTabBody = newTabBody;
	            this.onSizeChange();
	         }, hideLoadingFunc);
	         
	         var dfd = null;
	         var initializer = skipInit ? null : this._getTabInitializer(tabName);
	         if (initializer)  {
	            dfd = initializer();
	         }
	         if (dfd) {
	            dfd.addCallback(changeTab);
	         }
	         else {
	            changeTab();
	         }
	      }   
	});
	return _WidgetTabsMixin;
});