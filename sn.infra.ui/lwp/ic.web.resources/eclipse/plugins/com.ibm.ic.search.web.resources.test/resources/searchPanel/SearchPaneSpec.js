/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/SearchPane"
], function(SearchPane) {

	describe("the widget ic-search/searchPanel/SearchPane", function() {
		var searchPane;
		beforeEach(function() {
			searchPane = new SearchPane();
			searchPane.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(searchPane.show).toEqual(jasmine.any(Function));
				expect(searchPane.hide).toEqual(jasmine.any(Function));
				expect(searchPane.onScrollToUpdate).toEqual(jasmine.any(Function));
				expect(searchPane.onShowEnded).toEqual(jasmine.any(Function));
				expect(searchPane.onHideEnded).toEqual(jasmine.any(Function));
			});
		});
	});
});