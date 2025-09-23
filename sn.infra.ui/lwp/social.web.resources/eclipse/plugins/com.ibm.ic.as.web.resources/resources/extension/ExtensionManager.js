/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang"
	], function (dojo, declare, lang) {
	
		/**
		 * Manager for extensions. Ensures that you only have to create an extension
		 * once, because they are stateless.
		 * 
		 * @author Robert Campion
		 */
		
		var ExtensionManager = declare("com.ibm.social.as.extension.ExtensionManager", null,
		{
			// An object holding all extensions that have been initialized.
			// Saves us from having to re-init extension classes all the time.
			extensions: null,
			
			constructor: function(){
				this.extensions = {};
			},
		
			/**
			 * Get an extension based on an extension class.
			 * @param extClass {String} class location.
			 * @returns {Extension} a created extension.
			 */
			getExtension: function(extClass){
				// Return if the is no class
				if(typeof extClass !== "string"){
					return;
				}
				
				// If we don't already have a copy of this extension
				if(!this.extensions[extClass]){
					// Create the extension and save
					if(lang.exists(extClass)){
						this.extensions[extClass] = new (lang.getObject(extClass))();
					} else {
						as_console_debug("Cannot load extension class:" + extClass);
					}
				}
				
				// Return the extension object
				return this.extensions[extClass];
			}
		});
		return ExtensionManager;
	});
