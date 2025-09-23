/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.RollupStatusNewsItem");

dojo.require("com.ibm.social.as.item.RollupNewsItem");
dojo.require("com.ibm.social.as.item.StatusNewsItem");

/**
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.item.RollupStatusNewsItem", 
[com.ibm.social.as.item.StatusNewsItem,
 com.ibm.social.as.item.RollupNewsItem],
{	
	
	/**
	 * Need to override for the CommunitiesStatusUpdateExtension. Otherwise,
	 * rolled up comment events won't show the top "X commented on Y" message.
	 */
	statusMixInData: function(){

	}
});
