/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.extension.ViewAllExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

// This extension will display a link in the header of the AS, which will switch 
// to a different view in the AS config.
// It is intended to be used where you have a view that is scoped for a particular
// purpose... e.g. Display a single statusupdate (for perma-link) or to filter
// the AS for a particular user (based on gadget.selection action).
// This default implementation uses link text: "View all udpates" and will
// switch to view with id: "all". Can be inherited & overriden to customize
dojo.declare("com.ibm.social.as.extension.ViewAllExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	// Title for the link
	linkText: null,
	
	// The "all" view to switch to
	targetViewId: null,
	
	// Placement for the link:
	linkPlacement: null,
	
	
	constructor: function(){
		// set the defaults... can be overridden by someone inheriting this class
		var strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
		this.linkText = strings.viewAllUpdates
		this.targetViewId = "all";
		this.linkPlacement = com.ibm.social.as.view.placeholder.location.headerCenter;
	},

	/**
	 * Called when the extension is loaded
	 */
	onLoad: function(){
		// build the manage tag link node
		var viewAllLink = dojo.create("a", 
				{innerHTML: this.linkText, href: "javascript:;"});
		viewAllLink.onclick = dojo.hitch(this, this.viewAllUpdates);
		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERADD,
				[this.linkPlacement, viewAllLink]);
		dojo.publish(com.ibm.social.as.constants.events.SHOWTOPBORDER);
	},
	
	/**
	 * Called when the extension is unloaded
	 */
	onUnload: function(){
		dojo.publish(com.ibm.social.as.constants.events.PLACEHOLDERREMOVE,
				[this.linkPlacement]);
		dojo.publish(com.ibm.social.as.constants.events.REMOVETOPBORDER);
	},
	
	/** 
	 * Called when user clicks the "View all updates" link.
	 * Switch to the first view in the config
	 */
	viewAllUpdates: function() {
		dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, 
				[this.targetViewId]);
		dojo.publish(com.ibm.social.as.constants.events.REMOVETOPBORDER);
	}
});
