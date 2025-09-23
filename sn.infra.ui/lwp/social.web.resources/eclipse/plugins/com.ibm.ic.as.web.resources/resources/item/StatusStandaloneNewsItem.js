/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/string",
		"ic-as/item/StatusNewsItem"
	], function (declare, string, StatusNewsItem) {
	
		/**
		 * @author scrawford
		 */
		
		var StatusStandaloneNewsItem = declare(
		"com.ibm.social.as.item.StatusStandaloneNewsItem", 
		StatusNewsItem,
		{
			/**
			 * Mix in data 
			 * Here we have a special case for standalone status updates
			 * build the news user and use the object summary
			 */
			mixInData: function(){
				this.inherited(arguments);
				var activityAuthor = this.createNewsUser(this.newsData.getActivityAuthorId(), 
						this.newsData.getActivityAuthorName());	
				this.content = activityAuthor +"<br />"+ this.newsData.getActivitySummary();
			}
		});
		
		return StatusStandaloneNewsItem;
	});
