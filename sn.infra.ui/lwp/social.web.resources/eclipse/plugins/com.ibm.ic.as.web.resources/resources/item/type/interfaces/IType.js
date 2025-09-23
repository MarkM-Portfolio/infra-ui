/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare"
	], function (declare) {
	
		/**
		 * Item interface for all event items displayed in the stream.
		 * 
		 * @author Robert Campion
		 */
		
		var IType = declare("com.ibm.social.as.item.type.interfaces.IType", null,
		{
			// {String} the type of news item this represents
			type: "",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				return false;
			},
			
			/**
			 * Get the type.
			 * @returns {String}
			 */
			getType: function(){
				return this.type;
			},
			
			/**
			 * Transform the news data passed so that it fits properties
			 * of this particular news item type (if it is of this type).
			 * @param newsData
			 */
			transform: function(newsData){ }
		});
		
		return IType;
	});
