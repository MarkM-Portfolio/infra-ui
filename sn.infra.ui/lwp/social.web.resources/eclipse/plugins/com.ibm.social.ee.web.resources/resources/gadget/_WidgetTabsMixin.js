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

dojo.provide("com.ibm.social.ee.gadget._WidgetTabsMixin");

dojo.require("com.ibm.social.ee.gadget._AbstractTabsMixin");

dojo.declare("com.ibm.social.ee.gadget._WidgetTabsMixin", 
            [com.ibm.social.ee.gadget._AbstractTabsMixin], {
                     
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
               this.connect(tabLink, "onclick", dojo.hitch(this, this.switchTab, name, tab, tabLink, tabBody, false));
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
            hideLoadingFunc = dojo.hitch(this, this._hideTabLoading);
         }
         var changeTab = dojo.hitch(this, function(loadingHideFunc) {
        	if(loadingHideFunc)
        		loadingHideFunc();
            
            // Remove selected styles from currently selected
        	if(this.selectedTab)
               dojo.removeClass(this.selectedTab, "lotusSelected");
        	if(this.selectedTabLink)
               dojo.attr(this.selectedTabLink,"aria-selected", "false");
   
            // Set selected styles on new tab
            dojo.addClass(newTab, "lotusSelected");
            dojo.attr(newTabLink, "aria-selected", "true");  
   
            // Now switch tab panel
            if(this.selectedTabBody)
               dojo.style(this.selectedTabBody,{"display":"none"});
            dojo.style(newTabBody,{"display": ""});
   
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