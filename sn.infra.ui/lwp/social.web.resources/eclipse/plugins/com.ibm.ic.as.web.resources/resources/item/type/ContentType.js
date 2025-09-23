/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * Type for NewsItem that has content in it's "content" attribute.
		 * 
		 * @author Jim Antill
		 */
		
		var ContentType = declare("com.ibm.social.as.item.type.ContentType", 
		IType,
		{
			// {String} the type of news item this represents
			type: "Content",
			
			/**
			 * Is the news data passed in eligible to be of type 'type'?
			 * @param newsData {Object} see NewsDataAccessor.
			 * @returns {Boolean} true if it is, false otherwise.
			 */
			isOfType: function(newsData){
				return this.isContent(newsData);
			},
		
			/**
			 * The newsData is a "content" type if it has a content attribute that
			 * is different to the title attribute.
			 * 
			 * TODO - Remove the condition on content != title once content has
			 *  	  been removed from the feeds.
			 */
			isContent: function(newsData){
				var content = newsData.getContent();
				return (content && content != "" && content != newsData.getTitle());
			}
		});
		
		return ContentType;
	});
