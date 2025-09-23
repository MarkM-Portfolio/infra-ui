/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.trending.SelectedTag");

dojo.require("com.ibm.social.as.util.Localizer");
dojo.require("com.ibm.social.as.trending.Tag");

dojo.declare("com.ibm.social.as.trending.SelectedTag", 
		[dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer,
		 com.ibm.social.as.trending.Tag],
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "trending/templates/selectedTag.html"),

    blankGif: djConfig.blankGif,
    
	delTitle: "",
	
	deleteLink: null,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.title = "";
		this.delTitle = this.getLocalizedString("removeTrend", {0:this.label});
	}
});
