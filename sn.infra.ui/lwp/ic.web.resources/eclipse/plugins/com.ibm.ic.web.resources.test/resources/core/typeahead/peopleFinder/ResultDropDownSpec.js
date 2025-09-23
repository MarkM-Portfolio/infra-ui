/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-core/peopleFinder/ResultDropDown"
], function(ResultDropDown) {

	describe("the widget ic-core/peopleFinder/ResultDropDown", function() {
		var dropDown;
		beforeEach(function() {
			dropDown = new ResultDropDown();
			dropDown.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(dropDown.showResults).toEqual(jasmine.any(Function));
				expect(dropDown.closeResults).toEqual(jasmine.any(Function));
				expect(dropDown.setResults).toEqual(jasmine.any(Function));
				expect(dropDown.selectNextElement).toEqual(jasmine.any(Function));
				expect(dropDown.selectPreviousElement).toEqual(jasmine.any(Function));
				expect(dropDown.executeSelectedAction).toEqual(jasmine.any(Function));
				expect(dropDown.onMouseOver).toEqual(jasmine.any(Function));
				expect(dropDown.entrySelected).toEqual(jasmine.any(Function));
				expect(dropDown.onPersonSelected).toEqual(jasmine.any(Function));
				expect(dropDown.onActiveDescendantChanged).toEqual(jasmine.any(Function));
			});
		});
	});
});
