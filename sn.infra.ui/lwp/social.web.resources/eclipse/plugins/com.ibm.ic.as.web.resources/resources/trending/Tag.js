/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/text!ic-as/trending/templates/tag.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/util/Localizer"
	], function (declare, template, _Templated, _Widget, Localizer) {
	
		var Tag = declare("com.ibm.social.as.trending.Tag", [_Widget, _Templated, Localizer],
		{
			
			templateString: template,
			
			label: "",
			
			title: "",
			
			tagLink: null,
			
			postMixInProperties: function(){
				this.label = this.label.replace(/-/g, ' ');
				this.title = this.getLocalizedString("relatedTrendTitle", {0:this.label});
			}
		});
		return Tag;
	});
