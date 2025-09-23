/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/history/HistoryWidget"
], function(HistoryWidget) {

	describe("the widget ic-search/searchPanel/history/HistoryWidget", function() {
		var history;
		beforeEach(function() {
			history = new HistoryWidget();
			history.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(history.initHistoryContent).toEqual(jasmine.any(Function));
				expect(history.getMoreHistoryContent).toEqual(jasmine.any(Function));
				expect(history.getSelectionArray).toEqual(jasmine.any(Function));
				expect(history.checkMoreResultsNeeded).toEqual(jasmine.any(Function));
				expect(history.hideWidget).toEqual(jasmine.any(Function));
				expect(history.showWidget).toEqual(jasmine.any(Function));
				expect(history.handleNoResults).toEqual(jasmine.any(Function));
				expect(history.onEntryFocused).toEqual(jasmine.any(Function));
				expect(history.entryClicked).toEqual(jasmine.any(Function));
			});
		});
		describe("the initHistoryContent method", function() {
			it("will ask for history content", function() {
				spyOn(history.historyService, "executeQuery").and.callThrough();
				history.initHistoryContent();
				expect(history.historyService.executeQuery).toHaveBeenCalled();
			});
		});
		describe("the getMoreHistoryContent method", function() {
			it("will ask for next history page content", function() {
				spyOn(history.historyService, "getNextPage").and.callThrough();
				history.getMoreHistoryContent();
				expect(history.historyService.getNextPage).toHaveBeenCalled();
			});
		});
		describe("the getSelectionArray method", function() {
			it("will return an array", function() {
				expect(history.getSelectionArray()).toEqual(jasmine.any(Array));
			});
		});
	});
});