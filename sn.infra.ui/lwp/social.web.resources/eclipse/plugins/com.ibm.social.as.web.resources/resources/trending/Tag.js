/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.trending.Tag");

dojo.require("com.ibm.social.as.util.Localizer");

dojo.declare("com.ibm.social.as.trending.Tag", [dijit._Widget, dijit._Templated, com.ibm.social.as.util.Localizer],
{
	
	templatePath: dojo.moduleUrl("com.ibm.social.as", "trending/templates/tag.html"),
	
	label: "",
	
	title: "",
	
	tagLink: null,
	
	postMixInProperties: function(){
		this.label = this.label.replace(/-/g, ' ');
		this.title = this.getLocalizedString("relatedTrendTitle", {0:this.label});
	}
});
