/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/i18n!ic-homepage/nls/activitystream",
		"dojo/i18n!ic-homepage/nls/hpuistrings",
		"dojo/text!ic-as/gadget/refresh/templates/refreshButton.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-core/config/services",
		"ic-core/url"
	], function (dojo, declare, i18nactivitystream, i18nhpuistrings, template, _Templated, _Widget, events, services, url) {
	
		var RefreshButton = declare("com.ibm.social.as.gadget.refresh.RefreshButton", 
		[_Widget, _Templated],
		{
			// strings from resource bundle
			strings_ui: null,
			strings_hpas: null,
		
			templateString: template,
			
			postMixInProperties: function(){
				this.strings_ui = i18nhpuistrings;
				this.strings_hpas = i18nactivitystream;
			},
		
			refreshStream: function(){
				topic.publish(events.UPDATESTATE, []);
			}
		});
		return RefreshButton;
	});
