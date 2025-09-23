/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension");

dojo.require("com.ibm.social.as.lconn.extension.RollupStatusUpdateExtension");

/**
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension", 
[com.ibm.social.as.lconn.extension.RollupStatusUpdateExtension],
{
	customIsRollupStatus: function(newsData){
		// If the item is a status update and a like, rollup or if the target of the status update
		// is the person whose board it is (this will give the message a context)
		if(this.isStatus(newsData) && (newsData.getVerb() === "like" || newsData.getVerb() === "bump"
			|| (this.isRollup(newsData)	&& newsData.isActivityTarget()))){
			return true;
		}
		
		return false;
	}
});
