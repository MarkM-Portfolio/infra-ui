/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/i18n!ic-homepage/nls/activitystream",
		"dojo/text!ic-as/nav/templates/asHeader.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events"
	], function (dojo, declare, lang, i18nactivitystream, template, _Templated, _Widget, events) {
	
		var ASHeader = declare("com.ibm.social.as.nav.ASHeader", 
		[_Widget, _Templated],
		{
			templateString: template,
			
			postMixInProperties: function(){
				// Setup the strings
				this.strings = i18nactivitystream;
			},
			
			postCreate: function(){
				// Subscribe to state updates. 
				this.subscribe(events.STATEUPDATED, lang.hitch(this, function(stateObj){
					if(stateObj.view){
						this.showHeader(stateObj.view);
					}
				}));
			},
			
			showHeader: function(newViewId) {
				var cfg = com.ibm.social.as.configManager.getConfigObject();
				if ( !cfg ) return;
				
				var view = cfg.filters.options[newViewId];
				if ( !view ) return;
				
				this.asTitle.innerHTML = view.label;
				this.asDesc.innerHTML = "<p>"+view.description+"</p>";
			},
			
			/**
			 * Simply refresh the activity stream UI.
			 */
			refreshStream: function(){
				topic.publish(events.UPDATESTATE, {});
			}
		});
		return ASHeader;
	});
