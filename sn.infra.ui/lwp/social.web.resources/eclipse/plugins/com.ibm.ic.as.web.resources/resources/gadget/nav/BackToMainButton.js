/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/text!ic-as/gadget/nav/templates/backToMainButton.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-core/config/services",
		"ic-core/url"
	], function (dojo, declare, i18nactivitystream, template, _Templated, _Widget, events, services, url) {
	
		var BackToMainButton = declare("com.ibm.social.as.gadget.nav.BackToMainButton", 
		[_Widget, _Templated],
		{
			// strings from resource bundle
			strings_ui: null,
			strings_hpas: null,
		
			// src url for image
			imgSrc: null,
			
			templateString: template,
			
			postMixInProperties: function(){
				this.strings_as = i18nactivitystream;
			},
		
			backToMain: function(){
				topic.publish(events.BACKTOMAIN, {});
			}
		});
		return BackToMainButton;
	});
