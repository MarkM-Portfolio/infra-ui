/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/type/RollupType",
		"ic-as/item/type/StatusType"
	], function (declare, RollupType, StatusType) {
	
		/**
		 * Rollup status news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupStatusType = declare("com.ibm.social.as.item.type.RollupStatusType", 
		[RollupType,
		 StatusType],
		{
			// {String} the type of news item this represents
			type: "RollupStatus",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				return this.isRollupStatus(newsData);
			},
		
			isRollupStatus: function(newsData){
				// Get the object and author id
				var objectAuthorId = newsData.getObjectAuthorId();
				var targetPersonId = (newsData.getTargetObjectType() === "person") ?
												newsData.getTargetId() : undefined; 
				
				// If a like or notify(@mention), then use rollup functionality or if the target author 
				// isn't the same as the object author (as in the case of board posts)
				if(this.isStatus(newsData) && (newsData.getGeneratorId() === "communities" 
					|| newsData.getVerb() !== "post" || (this.isRollup(newsData) && newsData.isActivityTarget()) 
					|| (objectAuthorId && targetPersonId && objectAuthorId !== targetPersonId))){
					return true;
				}
				
				return false;
			}
		});
		
		return RollupStatusType;
	});
