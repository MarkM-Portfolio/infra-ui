/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.StatusStandaloneNewsItem");

dojo.require("com.ibm.social.as.item.StatusNewsItem");

dojo.require("dojo.string");

/**
 * @author scrawford
 */

dojo.declare(
"com.ibm.social.as.item.StatusStandaloneNewsItem", 
com.ibm.social.as.item.StatusNewsItem,
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
