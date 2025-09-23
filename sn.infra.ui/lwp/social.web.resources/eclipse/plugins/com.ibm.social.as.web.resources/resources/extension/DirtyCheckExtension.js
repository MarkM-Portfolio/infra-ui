/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

/**
 * @author Tao Shang (shtaosh@cn.ibm.com)
 * This class is used to extend all the AS views to have the ability of page dirty check
 */
dojo.provide("com.ibm.social.as.extension.DirtyCheckExtension");

dojo.requireLocalization("com.ibm.social.as", "activitystream");
dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.constants.events");

/*
 * Extension for DirtyCheck
 * @author Yi Ming
 */
dojo.declare("com.ibm.social.as.extension.DirtyCheckExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	strings: null,
	
	constructor: function() {
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},
	
	onLoad: function() {
		as_console_debug("com.ibm.social.as.extension.DirtyCheckExtension - onLoad");
		this.subscribes = [];
		
		// This event is used to set dirty for certain module
		this.subscribes.push(dojo.subscribe(com.ibm.social.as.constants.events.PAGEDIRTY, dojo.hitch(this, "onDirty")));
		// This event is used to clean dirty for certain module
		this.subscribes.push(dojo.subscribe(com.ibm.social.as.constants.events.PAGECLEAN, dojo.hitch(this, "onClean")));
		
		// Global for dirty check feature - supported in homepage
		com.ibm.social.as.DirtyChecker = {
			modules: {},
			isDirty: dojo.hitch(this, "isDirty")
		};
		

	},
	
	onUnload: function() {
		window.onbeforeunload = undefined;
		com.ibm.social.as.DirtyChecker = undefined;
		for (var subscribe in this.subscribes) {
			dojo.unsubscribe(subscribe);
		}
	},
	
	/**
	 * Iterate all the modules to see if the page is dirty
	 * @returns {Boolean} true: dirty, false: clean
	 */
	isDirty: function() {
		var dirty = false;
		for (var module in com.ibm.social.as.DirtyChecker.modules) {
			
			dirty = true;
			break;
			
		}
		return dirty;
	},
	
	
	onDirty: function(module) {
		com.ibm.social.as.DirtyChecker.modules[module] = true; 
	},
	
	onClean: function(module) {
		delete com.ibm.social.as.DirtyChecker.modules[module];
	}
});
