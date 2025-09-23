/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension");

dojo.require("com.ibm.social.as.lconn.extension.RollupStatusUpdateExtension");
dojo.require("com.ibm.social.as.item.type.RollupStatusType");

/**
 * Profiles status update extension that handles which status updates should be
 * shown in rollup and which shouldn't. Only status updates that aren't directed
 * at the current board user will be appear rolled up.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.ProfilesStatusUpdateExtension", 
[com.ibm.social.as.lconn.extension.RollupStatusUpdateExtension],
{
	customIsRollupStatus: function(newsData){
		// 'profilesData' here represents a var only available in Profiles
		var profilesUserId = profilesData && profilesData.displayedUser && profilesData.displayedUser.userid;
		var targetId = newsData.getTargetId();
		
		// If the item is a status update and a like, rollup or if the target of the status update
		// is the person whose board it is (this will give the message a context)
		if(this.isStatus(newsData) && (newsData.getVerb() === "like" || newsData.getVerb() === "bump" 
				|| (this.isRollup(newsData) && newsData.isActivityTarget())	
				|| (profilesUserId && targetId && targetId.indexOf(profilesUserId) < 0))){
			return true;
		}
		
		return false;
	}
});
