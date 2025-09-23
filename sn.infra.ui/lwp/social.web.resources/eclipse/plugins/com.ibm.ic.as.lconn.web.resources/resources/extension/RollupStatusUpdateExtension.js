/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-as/extension/interfaces/IExtension",
	"ic-as/item/StatusNewsItem",
	"ic-as/item/type/RollupStatusType"
], function (declare, lang, IExtension, StatusNewsItem, RollupStatusType) {

	/**
	 * @author Robert Campion
	 */
	
	var RollupStatusUpdateExtension = declare("com.ibm.social.as.lconn.extension.RollupStatusUpdateExtension", 
	IExtension,
	{
		// Reference to the news item class function and prototype
		statusNewsItemClass: null,
		statusNewsItemPrototype: null,
		rollupStatusTypeClass: null,
		rollupStatusTypePrototype: null,
		
		// Save a reference to the old mixInData function
		oldStatusMixInDataFunction: null,
		oldIsRollupStatusFunction: null,
		
		constructor: function(){
			// Make local references to these objects
			this.statusNewsItemClass = StatusNewsItem;
			this.statusNewsItemPrototype = this.statusNewsItemClass.prototype;
			this.rollupStatusTypeClass = RollupStatusType;
			this.rollupStatusTypePrototype = this.rollupStatusTypeClass.prototype;
		},
		
		onLoad: function(){
			this.oldStatusMixInDataFunction = this.statusNewsItemPrototype.statusMixInData;
			this.oldIsRollupStatusFunction = this.rollupStatusTypePrototype.isRollupStatus;
			
			// Overwrite the StatusNewsItem's mixInData
			lang.extend(this.statusNewsItemClass, {
				statusMixInData: this.customStatusMixInData
			});
			
			// Overwrite the RollupStatusType's isRollupStatus
			lang.extend(this.rollupStatusTypeClass, {
				isRollupStatus: this.customIsRollupStatus
			});
		},
		
		onUnload: function(){
			// Revert back to the old mixInData function
			lang.extend(this.statusNewsItemClass, {
				statusMixInData: this.oldStatusMixInDataFunction
			});
			
			// Revert the RollupStatusType's isRollupStatus
			lang.extend(this.rollupStatusTypeClass, {
				isRollupStatus: this.oldIsRollupStatusFunction
			});
		},
		
		customStatusMixInData: function(){
			var objectSummary = this.newsData.getActivitySummary();
			var authorId = this.newsData.getActivityAuthorId();
			var authorName = this.newsData.getActivityAuthorName();
	
			// If it exists
			if(objectSummary && authorId && authorName){
				var tagsArray = this.getTagsArray(this.newsData.getActivityTags());
				
				// Reset the title so that it reads simple "<Name> <Status Update>" instead
				// of "<Name> posted on <Community>"
				this.newsData.title = this.createNewsUser(authorId, authorName) + 
										" " + this.parseHashTags(objectSummary, tagsArray);
				
			}
	
			this.inherited(arguments);
		},
		
		customIsRollupStatus: function(){
			// Override in subclasses
		}
	});
	
	return RollupStatusUpdateExtension;
});
