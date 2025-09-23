/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.ee.EEManagerURLLauncher");

dojo.require("com.ibm.social.as.ee.AbstractEEManager");

/**
 * Provide an EE manager for consumers that want to disable EE pop loading
 * and open the Item URL externally instead
 * @author Stephen Crawford
 */

dojo.declare(
"com.ibm.social.as.ee.EEManagerURLLauncher", 
[com.ibm.social.as.ee.AbstractEEManager],
{
	openPreviewDialog: function(domNode) {
		window.open(this.tempNewsItem.newsData.getActivityUrl(), "_blank");
	}
});
