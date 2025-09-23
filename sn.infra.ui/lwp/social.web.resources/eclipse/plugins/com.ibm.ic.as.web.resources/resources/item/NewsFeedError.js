/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-class",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/item/templates/newsFeedError.html",
		"ic-as/item/interfaces/INewsItem"
	], function (dojo, declare, domClass, i18nactivitystream, template, INewsItem) {
	
		var NewsFeedError = declare("com.ibm.social.as.item.NewsFeedError", 
		INewsItem,
		{
			// Resource bundle
			strings: null,
			
			// Default to feed error
			errorType: "feedError",
			
			errorMessage: "",
			
			showMoreMessage: "",
			
			showMoreClass: "lotusHidden",
		
			templateString: template,
			
			postMixInProperties: function(){
				this.strings = i18nactivitystream;
				
				if (!this.errorMessage){
					this.errorMessage = this.strings[this.errorType + "Text"];
				} 
				
				if(this.showMoreMessage){
					this.showMoreClass = "";
				} else {
					this.showMoreMessage = " ";
				}
			},
			
			showMoreLessClicked: function(){
				domClass.toggle(this.showMoreMessageNode, "lotusHidden");
				domClass.toggle(this.showMoreNode, "lotusHidden");
				domClass.toggle(this.showLessNode, "lotusHidden");
			}
		});
		return NewsFeedError;
	});
