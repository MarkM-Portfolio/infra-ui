/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchResults"
], function(searchResults) {

	describe("the widget ic-search/searchResults", function() {
		var results;
		beforeEach(function() {
			results = new searchResults();
			results.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(results.getChildren).toEqual(jasmine.any(Function));
				expect(results.setup).toEqual(jasmine.any(Function));
				expect(results.updateQuery).toEqual(jasmine.any(Function));
				expect(results.performFilter).toEqual(jasmine.any(Function));
				expect(results.performTagFilter).toEqual(jasmine.any(Function));
				expect(results.performEcmDocumentTypeFilter).toEqual(jasmine.any(Function));
				expect(results.performTrendFilter).toEqual(jasmine.any(Function));
				expect(results.performPersonFilter).toEqual(jasmine.any(Function));
				expect(results.performDateFilter).toEqual(jasmine.any(Function));
				expect(results.performPagination).toEqual(jasmine.any(Function));
				expect(results.removeFilter).toEqual(jasmine.any(Function));
				expect(results.removeTagFilter).toEqual(jasmine.any(Function));
				expect(results.removeTagFilters).toEqual(jasmine.any(Function));
				expect(results.removeEcmDocumentTypeFilter).toEqual(jasmine.any(Function));
				expect(results.removeTrendFilter).toEqual(jasmine.any(Function));
				expect(results.removeTrendFilters).toEqual(jasmine.any(Function));
				expect(results.update).toEqual(jasmine.any(Function));
				expect(results.updatePage).toEqual(jasmine.any(Function));
				expect(results.updateResults).toEqual(jasmine.any(Function));
				expect(results.updateFilters).toEqual(jasmine.any(Function));
				expect(results.focus).toEqual(jasmine.any(Function));
				expect(results.setPVisible).toEqual(jasmine.any(Function));
				expect(results.dateHandler).toEqual(jasmine.any(Function));
				expect(results.toggleChildren).toEqual(jasmine.any(Function));
				expect(results.setPageSize).toEqual(jasmine.any(Function));
				expect(results.sortBy).toEqual(jasmine.any(Function));
				expect(results.toggleSort).toEqual(jasmine.any(Function));
				expect(results.sortDescending).toEqual(jasmine.any(Function));
				expect(results.sortAscending).toEqual(jasmine.any(Function));
				expect(results.clearSort).toEqual(jasmine.any(Function));
				expect(results.tagOnlySearch).toEqual(jasmine.any(Function));
				expect(results.navigate).toEqual(jasmine.any(Function));
				expect(results.getLastRequest).toEqual(jasmine.any(Function));
				expect(results.getStateHash).toEqual(jasmine.any(Function));
				expect(results.onChange).toEqual(jasmine.any(Function));
				expect(results.setStateHash).toEqual(jasmine.any(Function));
			});
		});
	});
});
