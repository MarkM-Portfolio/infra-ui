/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/item/templates/sharedExternally.html",
		"dijit/_Templated",
		"dijit/_Widget"
	], function (dojo, declare, i18nactivitystream, template, _Templated, _Widget) {
	
		/**
		 * Widget to show the Shared Externally message block
		 * 
		 * @author Marco Vicente
		 */
		
		var SharedExternally = declare("com.ibm.social.as.item.SharedExternally", 
				[_Widget, _Templated], {
			
			// Resource bundle
			strings: null,
			
			// Path to the template HTML
			templateString: template,
			
			postMixInProperties: function(){
				this.inherited(arguments);
				
				// Get the strings bundle
				this.strings = i18nactivitystream;
			}
		});
		return SharedExternally;
	});
