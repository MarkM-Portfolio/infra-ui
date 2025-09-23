/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare"
	], function (declare) {
	
		/**
		 * Interface class for Activity Stream extensions. All extensions must extend
		 * this class.
		 * 
		 * @author Robert Campion
		 */
		
		var IExtension = declare("com.ibm.social.as.extension.interfaces.IExtension", null,
		{
			/** All events that this extension should listen to (e.g. from the sharebox) */
			events: [],
			
			/** Concept for now. Plugin points for dijits you want to add. */
			dijitExtensions: null,
			
			/** 
			 * Called on extension load (e.g. when a view with this extension is called).
			 */
			onLoad: function(){
				
			},
			
			/**
			 * Called when the extension is unloaded (e.g. when a view is moved away from). 
			 */
			onUnload: function(){
				
			}
		});
		return IExtension;
	});
