/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/array",
		"dojo/_base/declare",
		"ic-as/extension/ExtensionManager"
	], function (array, declare, ExtensionManager) {
	
		/**
		 * Extension helper class, responsible for switching extensions, by unloading
		 * old ones and loading new ones. Add extensions to the queue by calling the 
		 * 'queueExtensions' function. Switch queued extensions by calling 'switchExtensions'.
		 * 
		 * @author Robert Campion
		 */
		
		var ExtensionHelper = declare("com.ibm.social.as.extension.ExtensionHelper", null,
		{
			// Extension manager object
			extensionManager: null,
			
			// Arrays for handing outgoing and incoming extensions
			outgoingExtensions: null,
			incomingExtensions: null,
			
			constructor: function(){
				// Create the extension manager
				this.extensionManager = new ExtensionManager();
				
				this.outgoingExtensions = [];
				this.incomingExtensions = [];
			},
			
			/**
			 * Queue extensions for one/two config objects (e.g. a view or filter option).
			 * Essentially concatenate extensions passed in with existing ones.
			 * @param oldConfigObj {Config Object} Config View or FilterOption, will remove its extensions
			 * @param newConfigObj {Config Object} Config View or FilterOption, will add its extensions
			 */
			queueExtensions: function(oldConfigObj, newConfigObj){
				if(oldConfigObj && oldConfigObj.extensions){
					// Push onto the outgoing queue
					this.outgoingExtensions = oldConfigObj.extensions.concat(this.outgoingExtensions);
				}
				
				if(newConfigObj && newConfigObj.extensions){
					// Push onto the incoming queue
					this.incomingExtensions = newConfigObj.extensions.concat(this.incomingExtensions);
				}
			},
			
			/**
			 * Switch the extensions being used from old to new
			 * @param oldExtCls {String} old extension class to be removed
			 * @param newExtCls {String} new extension class to be added.
			 */
			switchExtensions: function(){
				// Remove duplicates in the outgoing and incoming extensions
				this.outgoingExtensions = this.removeExtensionDuplicates(this.outgoingExtensions);
				this.incomingExtensions = this.removeExtensionDuplicates(this.incomingExtensions);
						
				// Load/Unload the extensions
				this.processExtensions(this.outgoingExtensions, false);
				this.processExtensions(this.incomingExtensions, true);
				
				// Reset both array. Next sweep will repopulate.
				this.outgoingExtensions = [];
				this.incomingExtensions = [];
			},
		
			/**
			 * Iterate through the extensions and either load or unload.
			 * @param extensionsArray {String Array} array of extensions to want processed.
			 * @param load {Boolean} true to load extensions, false to unload extensions.
			 */
			processExtensions: function(extensionsArray, load){
				for(var e = extensionsArray.length-1; e >= 0 ; e--){
					var extClass = extensionsArray[e]; 
					
					if(load){
						this.loadExtension(this.extensionManager.getExtension(extClass));
					}else{
						this.unLoadExtension(this.extensionManager.getExtension(extClass));
					}
				}
			},
			
			/**
			 * Ensures there is only one instance of an extension in an array. If duplicates
			 * are found, they are deleted. 
			 * @param extensionsArray {String array} array of extensions
			 */
			removeExtensionDuplicates: function(extensionsArray){
				// Iterate through the extensions
				for(var e = extensionsArray.length-1; e >= 0 ; e--){
					// If the array already holds this class further up the index
					if(array.indexOf(extensionsArray, extensionsArray[e]) !== e){
						// This extension is a duplicate, remove it from the array
						extensionsArray.splice(e, 1);
					}
				}
				
				return extensionsArray;
			},
			
			/**
			 * Unload the extension passed.
			 * @param ext ${Extension}
			 */
			unLoadExtension: function(ext){
				ext.onUnload();
			},
			
			/**
			 * Load the extension passed.
			 * @param ext ${Extension}
			 */
			loadExtension: function(ext){
				if (ext) {
					ext.onLoad();
				}
			}
		});
		return ExtensionHelper;
	});
