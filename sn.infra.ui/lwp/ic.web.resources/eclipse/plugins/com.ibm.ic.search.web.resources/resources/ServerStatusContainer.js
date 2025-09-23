/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/i18n!./nls/searchValidation",
	"dojo/text!./templates/ServerStatusContainer.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"./sandValidation",
	"./searchInitialIndexBuildValidation",
	"./searchSeedlistValidation",
	"./searchSystemOutValidation",
	"./searchValidation"
], function (declare, lang, domClass, i18nsearchValidation, template, _Templated, _Widget, sandValidation, searchInitialIndexBuildValidation, searchSeedlistValidation, searchSystemOutValidation, searchValidation) {

	var ServerStatusContainer = declare(
		"lconn.search.ServerStatusContainer",
		[_Widget, _Templated],
	{
		
		widgetsInTemplate: true,
		templateString: template,
		
		selectedTabContainer: null,
		selectedTab: null,
		
		postMixInProperties: function(){
			console.log("in postMixInProperties");
			var commonStrings = i18nsearchValidation;
	        lang.mixin(this, commonStrings);
	        console.log("before");
	        this.inherited(arguments);
	        console.log("after");
		},
		
		postCreate: function(){
			console.log("in postcreate");
			this.inherited(arguments);
			var element = this.domNode.getElementsByClassName("defaultSelection")[0];
			this.selectedTab = element;
			this.selectedTabContainer = this.serverStatus;
			this.selectTab({target: element});
			console.log("exiting postcreate");
		},
		
		selectTab: function(evt) {
			console.log("in selectTab");
	
			domClass.add(this.selectedTabContainer.domNode, "lotusHidden");
			domClass.remove(this.selectedTab.parentElement, "lotusSelected");
			domClass.add(evt.target.parentElement, "lotusSelected");
			
			switch(evt.target.id) {
				case "settingsTab": 
					domClass.remove(this.serverStatus.domNode, "lotusHidden"); 
					this.selectedTabContainer = this.serverStatus; 
					break;
				case "initialIndexBuildTab":
					domClass.remove(this.initialIndexBuild.domNode, "lotusHidden"); 
					this.selectedTabContainer = this.initialIndexBuild; 
					break;
				case "logsValidationTab":
					domClass.remove(this.logs.domNode, "lotusHidden"); 
					this.selectedTabContainer = this.logs;
					break;
				case "seedlistValidation":
					domClass.remove(this.seedlist.domNode, "lotusHidden"); 
					this.selectedTabContainer = this.seedlist;
					break;
				case "sandValidationTab":
					domClass.remove(this.sand.domNode, "lotusHidden"); 
					this.selectedTabContainer = this.sand;
					break;
			}
			this.selectedTab = evt.target;
			this.selectedTabContainer.runRequest();
		}
	});
	
	return ServerStatusContainer;
});
