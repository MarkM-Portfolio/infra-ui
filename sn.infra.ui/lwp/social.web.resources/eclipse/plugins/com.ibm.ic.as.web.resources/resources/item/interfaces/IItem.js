/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/util/ItemUtil"
	], function (declare, ItemUtil) {
	
		/**
		 * Item interface for all event items displayed in the stream.
		 */
		
		var IItem = declare(
		"com.ibm.social.as.item.interfaces.IItem", ItemUtil,
		{
			// Class that should be applied to this item's X icon
			xClass: "", 
			
			// Hold onto a local reference to the config manager
			configManager: null,
			
			postMixInProperties: function(){
				this.configManager = com.ibm.social.as.configManager;
				
				this.inherited(arguments);
				
				// Set the CSS class name for the X
				this.xClass = (this.isXDisplayed()) ? "" : "lotusHidden";
			},
			
			postCreate: function(){
				this.inherited(arguments);
			},
			
			/**
			 * Called when the delete X icon is clicked
			 */
			onDeleteClicked: function(){
			},
			
			/**
			 * Is the X (delete) icon displayed for this item
			 * @returns {Boolean} true if it is, false otherwise
			 * @override to display the X icon
			 */
			isXDisplayed: function(){
				// By default, don't display the X
				return false;
			}
		});
		
		return IItem;
	});
