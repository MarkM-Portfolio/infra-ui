/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.           */


	define([
		"dojo/_base/declare",
		"ic-as/item/FileNewsItem"
	], function (declare, FileNewsItem) {
	
		/**
		 * Override the FileNewsItem to provide a Folder view
		 * Folder icon and main link go to Files app
		 * 
		 * @author Stephen Crawford
		 */
		
		var FolderFileNewsItem = declare(
		"com.ibm.social.as.item.FolderFileNewsItem", 
		FileNewsItem,
		{
		    iconClass: "lconnSprite-iconFolderClose32",
		    iconClassPublicShared: " lconnSprite-iconFolderPublic32",
		    iconClassPrivateShared: " lconnSprite-iconFolderShared32",
			
			mixInData: function(){
				as_console_debug("FolderNewsItem mixInData");		
				this.inherited(arguments);
			},
			
			/**
			 * Called after the widget is rendered in the UI.
			 */
			postCreate: function(){
				this.inherited(arguments);	
			},
			
			/**
			 * Override and do nothing.
			 */
			updateIconClass: function(){
		        if(this.newsData.connections.isPublic === 'true') {
		            this.iconClass += this.iconClassPublicShared;
		        } else {
		            this.iconClass += this.iconClassPrivateShared;
		        };
			},
			
			/**
			 * Handle a download click and make a head request to validate the link is 
			 * valid. Used in conjuction with linking to files.
			 */
			downloadLinkClicked: function(e){
				var downloadLink = this.directFileLink;
				downloadLink.href = this.filePageURL;
				downloadLink.target = "_blank";
				this.disconnect(this.downloadLinkConnect);		
			},
		   
		   isFileOverlayEnabled: function(){
		      return false;
		   }
		});
		
		return FolderFileNewsItem;
	});
