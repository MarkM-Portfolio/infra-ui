/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.interfaces.INewsItem");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("com.ibm.social.as.item.interfaces.IItem");

/**
 * News item interface that should be overridden by classes wishing to
 * be a news item. Do not use this interface on its own.
 */

dojo.declare(
"com.ibm.social.as.item.interfaces.INewsItem", 
[dijit._Widget, dijit._Templated,
 com.ibm.social.as.item.interfaces.IItem],
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
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/interfaces/templates/iNewsItem.html")
	
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
