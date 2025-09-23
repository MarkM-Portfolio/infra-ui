/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/SearchBar"
], function(SearchBar) {

	describe("the widget ic-search/searchPanel/SearchBar", function() {
		var searchBar;
		beforeEach(function() {
			searchBar = new SearchBar();
			searchBar.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(searchBar.typeAheadCallback).toEqual(jasmine.any(Function));
				expect(searchBar.runQuery).toEqual(jasmine.any(Function));
				expect(searchBar.setLocalScopeOption).toEqual(jasmine.any(Function));
				expect(searchBar.selectScope).toEqual(jasmine.any(Function));
				expect(searchBar.showScopes).toEqual(jasmine.any(Function));
				expect(searchBar.hideScopes).toEqual(jasmine.any(Function));
				expect(searchBar.getTextField).toEqual(jasmine.any(Function));
				expect(searchBar.getTextValue).toEqual(jasmine.any(Function));
				expect(searchBar.setTextValue).toEqual(jasmine.any(Function));
				expect(searchBar.setAriaLiveString).toEqual(jasmine.any(Function));
				expect(searchBar.focus).toEqual(jasmine.any(Function));
				expect(searchBar.onTypeahead).toEqual(jasmine.any(Function));
				expect(searchBar.onEmptyQuery).toEqual(jasmine.any(Function));
				expect(searchBar.onSearchClicked).toEqual(jasmine.any(Function));
				expect(searchBar.onLocalOptionClicked).toEqual(jasmine.any(Function));
				expect(searchBar.onGlobalOptionClicked).toEqual(jasmine.any(Function));
				expect(searchBar.onBarFocused).toEqual(jasmine.any(Function));
				expect(searchBar.onBarBlurred).toEqual(jasmine.any(Function));
			});
		});
	});
});