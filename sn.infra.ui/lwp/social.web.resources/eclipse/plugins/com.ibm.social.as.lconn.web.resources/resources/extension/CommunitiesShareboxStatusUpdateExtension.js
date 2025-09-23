/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension");

dojo.require("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension");

/**
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.CommunitiesShareboxStatusUpdateExtension", 
[com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension],
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
