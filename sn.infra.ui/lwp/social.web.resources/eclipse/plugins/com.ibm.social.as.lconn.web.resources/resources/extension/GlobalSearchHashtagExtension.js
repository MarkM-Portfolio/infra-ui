/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.lconn.extension.GlobalSearchHashtagExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

/**
 * Simple extension to allow a particular view to override the default
 * SearchHashtagUtil with the one that generates links to the global search
 * for non community items and to the Communities search page Community events.
 * @author scrawford
 */
dojo.declare("com.ibm.social.as.lconn.extension.GlobalSearchHashtagExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
{
	
	existingHashtagUtil: null,
	hashtagUtil: null,
	
	constructor: function(){
		this.hashtagUtil = new com.ibm.social.as.util.hashtag.HashtagUtil();
	},
	
	/**
	 * Called when the extension is loaded
	 * Override the default with the Global Search Util.
	 */
	onLoad: function(){
		this.existingHashtagUtil = com.ibm.social.as.configManager.getSearchHashtagUtil();
		com.ibm.social.as.configManager.searchHashtagUtil = this.hashtagUtil;
	},
	
	/**
	 * Called when the extension is unloaded
	 * Swap back in the default function.
	 */
	onUnload: function(){
		com.ibm.social.as.configManager.searchHashtagUtil = this.existingHashtagUtil;
	}
});
