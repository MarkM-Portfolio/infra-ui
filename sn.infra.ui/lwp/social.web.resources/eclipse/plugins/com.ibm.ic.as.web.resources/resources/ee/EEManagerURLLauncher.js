/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/ee/AbstractEEManager"
	], function (declare, AbstractEEManager) {
	
		/**
		 * Provide an EE manager for consumers that want to disable EE pop loading
		 * and open the Item URL externally instead
		 * @author Stephen Crawford
		 */
		
		var EEManagerURLLauncher = declare(
		"com.ibm.social.as.ee.EEManagerURLLauncher", 
		AbstractEEManager,
		{
			openPreviewDialog: function(domNode) {
				window.open(this.tempNewsItem.newsData.getActivityUrl(), "_blank");
			}
		});
		
		return EEManagerURLLauncher;
	});
