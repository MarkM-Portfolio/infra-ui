/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.NewsFeedError");

dojo.require("com.ibm.social.as.item.interfaces.INewsItem");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.item.NewsFeedError", 
[com.ibm.social.as.item.interfaces.INewsItem],
{
	// Resource bundle
	strings: null,
	
	// Default to feed error
	errorType: "feedError",
	
	errorMessage: "",
	
	showMoreMessage: "",
	
	showMoreClass: "lotusHidden",

	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/newsFeedError.html"),
	
	postMixInProperties: function(){
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
		
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
		dojo.toggleClass(this.showMoreMessageNode, "lotusHidden");
		dojo.toggleClass(this.showMoreNode, "lotusHidden");
		dojo.toggleClass(this.showLessNode, "lotusHidden");
	}
});
