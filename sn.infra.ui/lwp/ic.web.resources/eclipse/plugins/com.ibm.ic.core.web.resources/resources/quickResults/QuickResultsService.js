/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/i18n",
	"dojo/i18n!./nls/QuickResultsService",
	"./DataReader",
	"./GenericEntry",
	"../typeahead/Service",
	"../config/properties"
], function (declare, lang, domClass, i18n, i18nQuickResultsService, DataReader, GenericEntry, Service, properties) {
	
	/**
	 * lconn.core.typeahead.Service implementation for
	 * Quick Result service
	 * 
	 * @class ic-core.quickResults.QuickResultsService
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var QuickResultsService = declare(
		"lconn.core.quickResults.QuickResultsService",
		Service, /** @lends ic-core.quickResults.QuickResultsService.prototype */
	{
		SERVICE_NAME: "quickResultsEnabled",
		
		//lconn.core.quickResults.DataReader vars
		/**
		 * To disable spelling correction system.
		 * 
		 * @default [false]
		 * @type {Boolean}
		 */
		disableSpellingCorrection: false,
		//End of lconn.core.quickResults.DataReader vars
		
		isLoginNeeded: true,
		minToDisplay: 4,
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this.strings = i18nQuickResultsService;
			lang.mixin(this, this.strings);
		},
		
		postCreate: function() {
			this._dataReader = new DataReader({
				disableSpellingCorrection: this.disableSpellingCorrection
			});
			this._dataReader.startup();
			
			this.header = document.createElement("div");
			domClass.add(this.header, "pfTitle");
			this.header.innerHTML = this.QUICK_RESULTS;
			this.isDisabled = properties[this.SERVICE_NAME] !== "true";
		},
		
		initResults: function(elements) {
			var results = [];
			
			for(var i=0; i<elements.length; i++) {
				var entryWidget = new GenericEntry({
					contentId: (elements[i].contentId ? elements[i].contentId : ""),
					entryTitle: (elements[i].title ? elements[i].title : ""),
					details: (elements[i].details ? elements[i].details : ""),
					author: (elements[i].author ? elements[i].author : ""),
					date: (elements[i].date ? new Date(elements[i].date) : null),
					source: (elements[i].source ? elements[i].source : ""),
					itemType: (elements[i].itemType ? elements[i].itemType : ""),
					resourceUrl: (elements[i].url ? elements[i].url : ""),
					isFocusable: this.isFocusable
				});
				entryWidget.startup();
				this._createdWidgets.push(entryWidget);
				if(this.useAriaNodes) {
					entryWidget.domNode.setAttribute("aria-describedby", this.id + "_entryAria");
				}
				entryWidget.connect(entryWidget.domNode, "onclick", lang.hitch(this, "entrySelected", entryWidget));
				entryWidget.connect(entryWidget, "linkClicked", lang.hitch(this, "entryClicked", entryWidget));
				if(this.isFocusable) {
					entryWidget.connect(entryWidget.hiddenLinkNode, "onfocus", lang.hitch(this, "focusCallback", entryWidget.domNode));
				}
				results.push(entryWidget.domNode);
			}
			
			return {medium: results};
		},
		
		initAriaNodes: function() {
			var ariaNode = document.createElement("div");
			domClass.add(ariaNode, "lotusHidden");
			ariaNode.innerHTML = this.ENTRY_ARIA_LABEL;
			ariaNode.id = this.id + "_entryAria";
			
			return [ariaNode];
		},
		
		_handleError: function(promise, error) {
			if(!(error && error.dojoType == "cancel")) {
				this.isDisabled = true;
			}
			this.inherited(arguments);
		},
		
		entrySelected: function(entry, evt) {
			entry.entryClick();
		},
		
		entryClicked: function(entry, evt) {
			//Callback - Nothing here
		}
	});
	return QuickResultsService;
});
