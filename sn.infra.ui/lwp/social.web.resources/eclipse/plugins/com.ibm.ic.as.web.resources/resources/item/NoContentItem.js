/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/item/templates/noContentItem.html",
		"ic-as/item/interfaces/INewsItem"
	], function (dojo, declare, i18nactivitystream, template, INewsItem) {
	
		var NoContentItem = declare("com.ibm.social.as.item.NoContentItem", 
		INewsItem,
		{
			// Resource bundle
			strings: null,
			
			noContentInnerHtml: "",
		
			templateString: template,
			
			// TODO: May need a different message depending on the feed we wish to display
			// TODO: Talk to Karl and see if we can spice this up a little bit.
			
			postMixInProperties: function(){
				this.strings = i18nactivitystream;
				this.noContentInnerHtml = (this.noContentInnerHtml) ? this.noContentInnerHtml : this.strings.noContentText;
			}
		});
		return NoContentItem;
	});
