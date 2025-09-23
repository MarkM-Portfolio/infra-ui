/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/resultsView"
], function(resultsView) {

	describe("the widget ic-search/resultsView", function() {
		var view;
		beforeEach(function() {
			view = new resultsView();
			view.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(view.clearSort).toEqual(jasmine.any(Function));
				expect(view.onTransformError).toEqual(jasmine.any(Function));
				expect(view.performPagination).toEqual(jasmine.any(Function));
				expect(view.sortBy).toEqual(jasmine.any(Function));
				expect(view.focus).toEqual(jasmine.any(Function));
			});
		});
	});
});