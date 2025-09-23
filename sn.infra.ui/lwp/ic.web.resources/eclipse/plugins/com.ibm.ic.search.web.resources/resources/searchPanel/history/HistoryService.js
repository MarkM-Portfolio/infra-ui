/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n",
	"dojo/i18n!./nls/HistoryWidget",
	"dojo/date",
	"dojo/date/locale",
	"dojo/dom-class",
	"ic-core/config/properties",
	"ic-core/quickResults/DataReader",
	"ic-core/quickResults/QuickResultsService",
	"ic-core/quickResults/GenericEntry"
], function (declare, lang, i18n, i18nHistoryWidget, dateUtil, dateLocaleModule, domClass, properties, DataReader, QuickResultsService, GenericEntry) {

	/**
	 * lconn.core.typeahead.Service implementation for
	 * History Result service
	 * 
	 * @class ic-search/searchPanel/history/HistoryService
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var HistoryService = declare(
		"lconn.search.searchPanel.history.HistoryService",
		QuickResultsService, /** @lends ic-search.searchPanel.history.HistoryService.prototype */
	{
		minToDisplay: -1,
		resultPerPage: 5,
		_strings: i18nHistoryWidget,
		_toBeCleared: false,
		
		postCreate: function() {
			this._dataReader = new DataReader({
				disableSpellingCorrection: this.disableSpellingCorrection,
				canSendEmptyQueries: true,
				pageSize: this.resultPerPage
			});
			this._dataReader.startup();
			
			this.header = document.createElement("div");
			domClass.add(this.header, "pfTitle");
			this.header.innerHTML = this.QUICK_RESULTS;
			this.isDisabled = properties[this.SERVICE_NAME] !== "true";
		},
		
		destroy: function() {
			this._toBeCleared = true;
		},
		
		executeQuery: function(query) {
			this._dataReader.resetLastQuery();
			
			return this.inherited(arguments);
		},
		
		initResults: function(elements) {
			var results = { _index: [], _size: elements.length };
			
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
				entryWidget.connect(entryWidget.domNode, "onclick", lang.hitch(this, "entrySelected", entryWidget));
				entryWidget.connect(entryWidget, "linkClicked", lang.hitch(this, "entryClicked", entryWidget));
				if(this.isFocusable) {
					entryWidget.connect(entryWidget.hiddenLinkNode, "onfocus", lang.hitch(this, "focusCallback", entryWidget.domNode));
				}
				
				var resId = this._getGroupId(entryWidget.date);
				if(!results[resId]) {
					results[resId] = {
						header: this._createHeader(resId),
						elements: []
					}
					results._index.push(resId);
				}
				results[resId].elements.push(entryWidget.domNode);
			}
			
			return results;
		},
		
		_createHeader: function(label) {
			var header = document.createElement("div");
			domClass.add(header, "pfTitle");
			header.innerHTML = label.charAt(0).toUpperCase() + label.slice(1);
			return header;
		},
		
		_getGroupId: function(date) {
			var todayDate = new Date();
			var diff = dateUtil.difference(date, todayDate, "day");
			var diffY = dateUtil.difference(date, todayDate, "year");
			var stringId = date.getFullYear();
			
			if(diff == 0) {
				stringId = this._strings.TODAY;
			} else if(diff <= 7) {
				stringId = this._strings.PREV_7_DAYS;
			} else if(diff <= 30) {
				stringId = this._strings.PREV_30_DAYS;
			} else if(diffY == 0) {
				stringId = dateLocaleModule.format(date, {selector: "date", datePattern: "MMMM"});
			}
			
			return stringId.toString();
		},
		
		_cleanAll: function() {
			if(this._toBeCleared) {
				this.inherited(arguments);
			}
		},
		
		_handleError: function() {
			this._toBeCleared = true;
			this.inherited(arguments);
			this._toBeCleared = false;
		},
		
		_handleDisabled: function() {
			this._toBeCleared = true;
			this.inherited(arguments);
			this._toBeCleared = false;
		},
		
		focusCallback: function(element) {
			//Callback - nothing here
		}
	});
	
	return HistoryService;
});