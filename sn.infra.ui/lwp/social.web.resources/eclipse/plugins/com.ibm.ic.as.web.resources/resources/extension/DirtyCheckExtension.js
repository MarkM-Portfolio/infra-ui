/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/topic",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension"
	], function (dojo, declare, lang, i18nactivitystream, topic, events, IExtension) {
	
		/**
		 * @author Tao Shang (shtaosh@cn.ibm.com)
		 * This class is used to extend all the AS views to have the ability of page dirty check
		 */
		/*
		 * Extension for DirtyCheck
		 * @author Yi Ming
		 */
		var DirtyCheckExtension = declare("com.ibm.social.as.extension.DirtyCheckExtension", 
		IExtension,
		{
			strings: null,
			
			constructor: function() {
				this.strings = i18nactivitystream;
			},
			
			onLoad: function() {
				as_console_debug("com.ibm.social.as.extension.DirtyCheckExtension - onLoad");
				this.subscribes = [];
				
				// This event is used to set dirty for certain module
				this.subscribes.push(topic.subscribe(events.PAGEDIRTY, lang.hitch(this, "onDirty")));
				// This event is used to clean dirty for certain module
				this.subscribes.push(topic.subscribe(events.PAGECLEAN, lang.hitch(this, "onClean")));
				
				// Global for dirty check feature - supported in homepage
				com.ibm.social.as.DirtyChecker = {
					modules: {},
					isDirty: lang.hitch(this, "isDirty")
				};
				
		
			},
			
			onUnload: function() {
				window.onbeforeunload = undefined;
				com.ibm.social.as.DirtyChecker = undefined;
				for (var subscribe in this.subscribes) {
					subscribe.remove();
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
		return DirtyCheckExtension;
	});
