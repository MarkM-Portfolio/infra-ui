/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-as/lconn/extension/ShareboxStatusUpdateExtension"
], function (declare, ShareboxStatusUpdateExtension) {

	/**
	 * @author Robert Campion
	 */
	
	var CommunitiesShareboxStatusUpdateExtension = declare("com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension", 
	ShareboxStatusUpdateExtension,
	{
		/**
		 * Return communities generator
		 */
		getGenerator: function(){
			var commUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri;
			
			return {
				id: "communities",
				url: commUrl
			};
		}
	});
	
	return CommunitiesShareboxStatusUpdateExtension;
});
