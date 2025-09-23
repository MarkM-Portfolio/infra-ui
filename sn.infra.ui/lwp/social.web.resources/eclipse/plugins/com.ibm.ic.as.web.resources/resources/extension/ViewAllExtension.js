/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-construct",
		"dojo/i18n!ic-as/nls/activitystream",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension"
	], function (dojo, declare, lang, domConstruct, i18nactivitystream, events, IExtension) {
	
		// This extension will display a link in the header of the AS, which will switch 
		// to a different view in the AS config.
		// It is intended to be used where you have a view that is scoped for a particular
		// purpose... e.g. Display a single statusupdate (for perma-link) or to filter
		// the AS for a particular user (based on gadget.selection action).
		// This default implementation uses link text: "View all udpates" and will
		// switch to view with id: "all". Can be inherited & overriden to customize
		var ViewAllExtension = declare("com.ibm.social.as.extension.ViewAllExtension", 
		IExtension,
		{
			// Title for the link
			linkText: null,
			
			// The "all" view to switch to
			targetViewId: null,
			
			// Placement for the link:
			linkPlacement: null,
			
			
			constructor: function(){
				// set the defaults... can be overridden by someone inheriting this class
				var strings = i18nactivitystream;
				this.linkText = strings.viewAllUpdates
				this.targetViewId = "all";
				this.linkPlacement = com.ibm.social.as.view.placeholder.location.headerCenter;
			},
		
			/**
			 * Called when the extension is loaded
			 */
			onLoad: function(){
				// build the manage tag link node
				var viewAllLink = domConstruct.create("a", 
						{innerHTML: this.linkText, href: "javascript:;"});
				viewAllLink.onclick = lang.hitch(this, this.viewAllUpdates);
				topic.publish(events.PLACEHOLDERADD, this.linkPlacement, viewAllLink);
				topic.publish(events.SHOWTOPBORDER);
			},
			
			/**
			 * Called when the extension is unloaded
			 */
			onUnload: function(){
				topic.publish(events.PLACEHOLDERREMOVE, this.linkPlacement);
				topic.publish(events.REMOVETOPBORDER);
			},
			
			/** 
			 * Called when user clicks the "View all updates" link.
			 * Switch to the first view in the config
			 */
			viewAllUpdates: function() {
				topic.publish(events.UPDATESTATE, this.targetViewId);
				topic.publish(events.REMOVETOPBORDER);
			}
		});
		
		return ViewAllExtension;
	});
