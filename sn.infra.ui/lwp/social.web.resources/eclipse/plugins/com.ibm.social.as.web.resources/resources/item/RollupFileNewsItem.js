/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.RollupFileNewsItem");

dojo.require("com.ibm.social.as.item.RollupNewsItem");
dojo.require("com.ibm.social.as.item.FileNewsItem");

/**
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.item.RollupFileNewsItem", 
[com.ibm.social.as.item.FileNewsItem,
 com.ibm.social.as.item.RollupNewsItem],
{
	/**
	 * Mix news data into this object.
	 */
	mixInData: function(){
		
		//summary not to be shown for Files - content will be catered for in RollupNewsItem
		this.newsData.setActivitySummary("");
		
		this.inherited(arguments);
	}
	
});
