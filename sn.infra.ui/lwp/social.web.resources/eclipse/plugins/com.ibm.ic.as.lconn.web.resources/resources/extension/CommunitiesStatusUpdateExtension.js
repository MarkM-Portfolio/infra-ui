/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-as/lconn/extension/RollupStatusUpdateExtension"
], function (declare, RollupStatusUpdateExtension) {

	/**
	 * @author Robert Campion
	 */
	
	var CommunitiesStatusUpdateExtension = declare("com.ibm.social.as.lconn.extension.CommunitiesStatusUpdateExtension", 
	RollupStatusUpdateExtension,
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
	
	return CommunitiesStatusUpdateExtension;
});
