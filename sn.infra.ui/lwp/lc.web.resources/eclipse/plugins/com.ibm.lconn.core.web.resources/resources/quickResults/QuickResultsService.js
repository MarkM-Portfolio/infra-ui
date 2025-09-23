/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.quickResults.QuickResultsService");

dojo.require("lconn.core.typeahead.Service");
dojo.require("lconn.core.quickResults.DataReader");
dojo.require("lconn.core.quickResults.GenericEntry");
dojo.require("lconn.core.config.properties");

dojo.requireLocalization("lconn.core.quickResults", "QuickResultsService");

/**
 * lconn.core.typeahead.Service implementation for
 * Quick Result service
 * 
 * @class lconn.core.quickResults.QuickResultsService
 * @author Andrea Paolucci <andreapa@ie.ibm.com>
 */
dojo.declare(
	"lconn.core.quickResults.QuickResultsService",
	[lconn.core.typeahead.Service], /** @lends lconn.core.quickResults.QuickResultsService.prototype */
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
		this.strings = dojo.i18n.getLocalization("lconn.core.quickResults", "QuickResultsService");
		dojo.mixin(this, this.strings);
	},
	
	postCreate: function() {
		this._dataReader = new lconn.core.quickResults.DataReader({
			disableSpellingCorrection: this.disableSpellingCorrection
		});
		this._dataReader.startup();
		
		this.header = document.createElement("div");
		dojo.addClass(this.header, "pfTitle");
		this.header.innerHTML = this.QUICK_RESULTS;
		this.isDisabled = lconn.core.config.properties[this.SERVICE_NAME] !== "true";
	},
	
	initResults: function(elements) {
		var results = [];
		
		for(var i=0; i<elements.length; i++) {
			var entryWidget = new lconn.core.quickResults.GenericEntry({
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
			entryWidget.connect(entryWidget.domNode, "onclick", dojo.hitch(this, "entrySelected", entryWidget));
			entryWidget.connect(entryWidget, "linkClicked", dojo.hitch(this, "entryClicked", entryWidget));
			if(this.isFocusable) {
				entryWidget.connect(entryWidget.hiddenLinkNode, "onfocus", dojo.hitch(this, "focusCallback", entryWidget.domNode));
			}
			results.push(entryWidget.domNode);
		}
		
		return {medium: results};
	},
	
	initAriaNodes: function() {
		var ariaNode = document.createElement("div");
		dojo.addClass(ariaNode, "lotusHidden");
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
