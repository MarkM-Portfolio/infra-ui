/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/SearchPaneManager"
], function(SearchPaneManager) {

	describe("the widget ic-search/searchPanel/SearchPaneManager", function() {
		var searchPaneManager;
		beforeEach(function() {
			searchPaneManager = new SearchPaneManager();
			searchPaneManager.startup();
			document.body.removeChild(searchPaneManager.searchPane.domNode);
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(searchPaneManager.focus).toEqual(jasmine.any(Function));
				expect(searchPaneManager.runSearch).toEqual(jasmine.any(Function));
				expect(searchPaneManager.runTypeaheadQuery).toEqual(jasmine.any(Function));
				expect(searchPaneManager.runHistoryQuery).toEqual(jasmine.any(Function));
				expect(searchPaneManager.setLocalOptions).toEqual(jasmine.any(Function));
				expect(searchPaneManager.openSearchPane).toEqual(jasmine.any(Function));
				expect(searchPaneManager.getSelectedOption).toEqual(jasmine.any(Function));
				expect(searchPaneManager.setSearchBarMode).toEqual(jasmine.any(Function));
				expect(searchPaneManager.onSubmit).toEqual(jasmine.any(Function));
				
			});
		});
		describe("the runHistoryQuery method", function() {
			it("doesn't throw", function() {
				expect(function() {
					searchPaneManager.runHistoryQuery();
				}).not.toThrow();
			});
		});
		describe("the openSearchPane method", function() {
			it("doesn't throw", function() {
				spyOn(searchPaneManager.searchPane, "show");
				expect(function() {
					searchPaneManager.openSearchPane();
				}).not.toThrow();
			});
		});
		describe("the runTypeaheadQuery method", function() {
			it("doesn't throw", function() {
				expect(function() {
					searchPaneManager.runTypeaheadQuery("query");
				}).not.toThrow();
			});
		});
		describe("the setLocalOptions method", function() {
			it("doesn't throw", function() {
				expect(function() {
					searchPaneManager.setLocalOptions();
				}).not.toThrow();
			});
			it("accepts both an object and an array of objects", function() {
				var localOption = {
					label: "label",
					scope: "scope",
					action: "action"
				};
				searchPaneManager.setLocalOptions(localOption);
				expect(searchPaneManager.localOptions).toEqual(localOption);
				
				searchPaneManager.setLocalOptions([localOption, {}, {}]);
				expect(searchPaneManager.localOptions).toEqual(localOption);
			});
		});
		describe("the setSearchBarMode method", function() {
			it("doesn't throw", function() {
				expect(function() {
					searchPaneManager.setSearchBarMode(true);
					searchPaneManager.setSearchBarMode(false);
				}).not.toThrow();
			});
		});
	});
});