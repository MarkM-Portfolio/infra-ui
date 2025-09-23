/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * Rollup news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var RollupType = declare("com.ibm.social.as.item.type.RollupType", 
		IType,
		{
			// {String} the type of news item this represents
			type: "Rollup",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				return this.isRollupNonStatus(newsData);
			},
			
			/**
			 * This is a special case for status update - we filter out status update
			 * as we know the object summary is the same author as target and would
			 * disply update twice. RollupStatusNewsItem should handle the valid
			 * rollup case for Status updates.
			 */
			isRollupNonStatus: function(newsData){
				return this.isRollup(newsData) && !newsData.isStatusUpdate();
			},
			
			/**
			 * The data accessor has already decided whether the activity should be 
			 * the target or the object based on rollupid
			 * so we need to check the rollupid against activity id and existance of 
			 * summary.
			 */
			isRollup: function(newsData){
				return ( ((newsData.isConnections() && newsData.getActivityId()) &&
						   (newsData.connections.rollupid == newsData.getActivityId()) && newsData.getActivitySummaryValidated()) );
			}
		});
		
		return RollupType;
	});
