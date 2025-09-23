/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dijit/layout/TabContainer"
], function (dojo, array, declare, domClass, domGeometry, TabContainer) {

	var TabContainer = declare("com.ibm.social.sharebox.controls.TabContainer", TabContainer, {
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
		   if(!domGeometry._isBodyLtr()) {
		      domClass.add(tab.controlButton.titleNode, "dijitTabRtl");
		   }
	   },
	   startup: function() {
	      this.inherited(arguments);
	      this._clearAriaTabPress();
	   },
	   _clearAriaTabPress: function() {
	      array.forEach(this.tablist.getChildren(), function(tab) {
	         domAttr.remove(tab.tabContent, "aria-pressed");
	      });
	   },
	   getChildren: function() {
	      return this.containerNode ? this.inherited(arguments) : [];
	   }
	});
	return TabContainer;
});
