/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/dom-class",
		"dojo/on",
		"dojo/text!ic-as/search/templates/activityStreamSearchBar.html",
		"dojo/topic",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/constants/events",
		"ic-as/search/ActivityStreamSearchHandler",
		"ic-as/util/Localizer",
	], function (declare, domClass, on, template, topic, _Templated, _Widget, events, ActivityStreamSearchHandler, Localizer) {
	
		var ActivityStreamSearchBar = declare("com.ibm.social.as.search.ActivityStreamSearchBar",
		[_Widget, _Templated, Localizer],
		{
			isStreamFiltered: false,
			templateString: template,
			widgetsInTemplate: true,
			
			postCreate: function(){
				this.inherited(arguments);	
				this.own(topic.subscribe(events.ENABLESEARCH, lang.hitch(this,"checkEnablement")));
				this.own(on(this.searchText, "KeyPress", lang.hitch(this,"keyHandler")));
			},
		
			checkEnablement: function(flag){
				if(!flag){
					this.isStreamFiltered = false; //stop a reset of view
					this.close();
				}
			},
			
			open: function(){
				domClass.add(this.asSearchBarContainer, "isOpen");
				this.searchText.focus();
				topic.publish(events.FILTERMENUHIDE, "true");
			},
			
			close: function(){
				domClass.remove(this.asSearchBarContainer, "isOpen");
				this.removeSearchText();
				if(this.isStreamFiltered){
					this.resetView();
				}
				topic.publish(events.FILTERMENUHIDE, "false");
			},
			
			resetView: function(){
				ActivityStreamSearchHandler.getInstance().removeSearch();
				this.removeSearchText();
				this.isStreamFiltered = false;
			},
			
			removeSearchText: function(){
				this.searchText.set("value", "");
			},
			
			toggle: function(){
				var isOpen;
				if(domClass.contains(this.asSearchBarContainer, "isOpen")){
					this.close()
					isOpen = false;
				} else {
					this.open();	
					isOpen = true
				}
				return isOpen
			},
			
			submit: function(){
				this.isStreamFiltered = true;
				ActivityStreamSearchHandler.getInstance().updateStream(this.searchText.get("value"), null, null, true);
			},
			
			keyHandler: function(e){
				if(e.keyCode == 13){
					e.preventDefault(), e.stopPropagation();
					this.submit();
				}
			}
		});
		return ActivityStreamSearchBar;
	});
