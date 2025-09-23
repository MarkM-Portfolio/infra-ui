/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"ic-core/typeahead/ResultDropDown"
], function (declare, lang, domClass, domConstruct, ResultDropDown) {

	/**
	 * 
	 * @class ic-search/searchPanel/SearchDropDown
	 * @author Andrea Paolucci <andreapa@ie.ibm.com>
	 */
	var SearchDropDown = declare(
		"lconn.search.searchPanel.SearchDropDown",
		ResultDropDown, /** @lends ic-search.searchPanel.SearchDropDown.prototype */
	{
		showCalloutArrow: false,
		historyWidget: null,
		isHistoryActive: false,
		
		addHistoryWidget: function(history) {
			this.historyWidget = history;
			this.connect(this.historyWidget, "entryClicked", "closeAndPreventReopen");
			domClass.add(this.historyWidget.domNode, "pfDirectoryResults");
			domConstruct.place(this.historyWidget.domNode, this.content, "first");
		},
		
		showHistory: function(parent, node) {
			this.isHistoryActive = true;
			
			this._selectionArray = this.historyWidget.getSelectionArray();
			for(var i=0; i < this._selectionArray.length; i++) {
				this.connect(this._selectionArray[i], "onmouseover", lang.hitch(this, "onMouseOver", this._selectionArray[i]));
			}
			this._prepareSelectionArray();
			this._selectElement(this._selectionArray[0]);
			
			domClass.add(this.normalScopeNode, "lotusHidden");
			domClass.add(this.resultsContainer, "lotusHidden");
			domClass.add(this.loginNode, "lotusHidden");
			this.historyWidget.showWidget();
			this.showResults(parent, node, true)
		},
		
		showResults: function(parent, node, skipPopulation) {
			if(!skipPopulation) {
				this.isHistoryActive = false;
				this.historyWidget.hideWidget();
				domClass.remove(this.normalScopeNode, "lotusHidden");
				domClass.remove(this.resultsContainer, "lotusHidden");
			}
			
			this.inherited(arguments);
		},
		
		_prepareResultsContent: function(skipPopulation) {
			if(this.isHistoryActive) {
				return;
			}
			this.inherited(arguments);
		}
	});
	return SearchDropDown;
});