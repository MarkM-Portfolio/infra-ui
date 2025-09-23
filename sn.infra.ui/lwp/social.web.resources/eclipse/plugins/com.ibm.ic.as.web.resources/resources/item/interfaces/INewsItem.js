/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"dojo/text!ic-as/item/interfaces/templates/iNewsItem.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/item/interfaces/IItem"
	], function (declare, template, _Templated, _Widget, IItem) {
	
		/**
		 * News item interface that should be overridden by classes wishing to
		 * be a news item. Do not use this interface on its own.
		 */
		
		var INewsItem = declare(
		"com.ibm.social.as.item.interfaces.INewsItem", 
		[_Widget, _Templated,
		 IItem],
		{
			// Maps generator ids to application name (which is then used as a CSS sprite class name)
			appMap: {
				"activities": "Activities",
				"blogs": "Blogs",
				"bookmarks": "Bookmarks",
				"dogear": "Bookmarks",
				"communities": "Communities",
				"files": "Files",
				"forums": "Forums",
				"ecm_files": "Library",
				"homepage": "Home",
				"profiles": "Profiles",
				"wikis": "Wikis"
			},
			
			templateString: template
			
			/**
			 * Called before the news item is rendered in the UI.
			 * Edit all the news properties here if you want to 
			 * show them differently in the UI.
			 
			postMixInProperties: function(){
			},
			
			 */
			
			/**
			 * Called after the news item is rendered in the UI.
			 
			postCreate: function(){
			}
			
			 */
		});
		
		return INewsItem;
	});
