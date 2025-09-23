/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-core/peopleFinder/PeopleFinderSearchBox"
], function(PeopleFinderSearchBox) {

	describe("the widget ic-core/peopleFinder/PeopleFinderSearchBox", function() {
		var pfSearchBox;
		beforeEach(function() {
			var input = document.createElement("input");
			document.createElement("div").appendChild(input);
			pfSearchBox = new PeopleFinderSearchBox({
				PFtextField: input
			});
			pfSearchBox.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(pfSearchBox.typeAheadCallback).toEqual(jasmine.any(Function));
				expect(pfSearchBox.runQuery).toEqual(jasmine.any(Function));
				expect(pfSearchBox.showTypeaheadResults).toEqual(jasmine.any(Function));
				expect(pfSearchBox.onFieldBlur).toEqual(jasmine.any(Function));
				expect(pfSearchBox.onFieldFocus).toEqual(jasmine.any(Function));
				expect(pfSearchBox.PFisPlaceholderActive).toEqual(jasmine.any(Function));
				expect(pfSearchBox.onPersonSelected).toEqual(jasmine.any(Function));
			});
		});
	});
});
