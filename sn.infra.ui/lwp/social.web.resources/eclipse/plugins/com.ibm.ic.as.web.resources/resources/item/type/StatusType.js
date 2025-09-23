/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * Status update news item type.
		 * 
		 * @author Robert Campion
		 */
		
		var StatusType = declare("com.ibm.social.as.item.type.StatusType", 
		IType,
		{
			// {String} the type of news item this represents
			type: "Status",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				if(this.isStatus(newsData)){
					// TODO: Move to StatusRollupType
					this.transform(newsData);
					return true;
				}
			},
			
			isStatus: function(newsData){
				return newsData.isStatusUpdate();
			}
		});
		
		return StatusType;
	});
