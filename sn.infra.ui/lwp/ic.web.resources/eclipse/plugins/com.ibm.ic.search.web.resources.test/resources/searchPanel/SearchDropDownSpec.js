/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/SearchDropDown"
], function(SearchDropDown) {

	describe("the widget ic-search/searchPanel/SearchDropDown", function() {
		var dropDown;
		beforeEach(function() {
			dropDown = new SearchDropDown();
			dropDown.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(dropDown.addHistoryWidget).toEqual(jasmine.any(Function));
				expect(dropDown.showHistory).toEqual(jasmine.any(Function));
				expect(dropDown.showResults).toEqual(jasmine.any(Function));
				
				//inherited methods
				expect(dropDown.showLogin).toEqual(jasmine.any(Function));
				expect(dropDown.closeResults).toEqual(jasmine.any(Function));
				expect(dropDown.setResults).toEqual(jasmine.any(Function));
				expect(dropDown.addServiceResponse).toEqual(jasmine.any(Function));
				expect(dropDown.selectNextElement).toEqual(jasmine.any(Function));
				expect(dropDown.selectPreviousElement).toEqual(jasmine.any(Function));
				expect(dropDown.executeSelectedAction).toEqual(jasmine.any(Function));
				expect(dropDown.setQueryString).toEqual(jasmine.any(Function));
				expect(dropDown.getString).toEqual(jasmine.any(Function));
				expect(dropDown.onMouseOver).toEqual(jasmine.any(Function));
				expect(dropDown.searchOnScope).toEqual(jasmine.any(Function));
				expect(dropDown.onActiveDescendantChanged).toEqual(jasmine.any(Function));
			});
		});
		describe("the addHistoryWidget method", function() {
			it("will append HistoryWidget domNode to the SearchDropDown domNode", function() {
				var historyWidget = {
					entryClicked: function(){},
					domNode: document.createElement("div")
				};
				dropDown.addHistoryWidget(historyWidget);
				expect(dropDown.domNode.contains(historyWidget.domNode)).toBeTruthy();
				expect(historyWidget.domNode.className.split(" ")).toContain("pfDirectoryResults");
			});
		});
	});
});