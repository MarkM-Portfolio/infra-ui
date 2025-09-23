/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/text!ic-as/trending/templates/selectedTag.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/trending/Tag",
		"ic-as/util/Localizer"
	], function (declare, template, _Templated, _Widget, Tag, Localizer) {
	
		var SelectedTag = declare("com.ibm.social.as.trending.SelectedTag", 
				[_Widget, _Templated, Localizer,
				 Tag],
		{
			templateString: template,
		
		    blankGif: djConfig.blankGif,
		    
			delTitle: "",
			
			deleteLink: null,
			
			postMixInProperties: function(){
				this.inherited(arguments);
				this.title = "";
				this.delTitle = this.getLocalizedString("removeTrend", {0:this.label});
			}
		});
		return SelectedTag;
	});
