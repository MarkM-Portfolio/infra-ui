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
dojo.provide("com.ibm.social.sharebox.controls.TabContainer");
dojo.require("dijit.layout.TabContainer");

dojo.declare("com.ibm.social.sharebox.controls.TabContainer", dijit.layout.TabContainer, {
   _tabSwitchAllowed: true,
   selectChild: function(page) {
      if(this._tabSwitchAllowed)
         this.inherited(arguments);
      this._clearAriaTabPress();
   },
   allowTabSwitching: function() {
      this._tabSwitchAllowed = true;
   },
   preventTabSwitching: function() {
      this._tabSwitchAllowed = false;
   },
   updateOrientation: function(tab) {
	   if(!dojo._isBodyLtr()) {
	      dojo.addClass(tab.controlButton.titleNode, "dijitTabRtl");
	   }
   },
   startup: function() {
      this.inherited(arguments);
      this._clearAriaTabPress();
   },
   _clearAriaTabPress: function() {
      dojo.forEach(this.tablist.getChildren(), function(tab) {
         dojo.removeAttr(tab.tabContent, "aria-pressed");
      });
   },
   getChildren: function() {
      return this.containerNode ? this.inherited(arguments) : [];
   }
});