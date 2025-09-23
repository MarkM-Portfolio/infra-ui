/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/QueryForm"
], function(QueryForm) {

	describe("the widget ic-search/QueryForm", function() {
		var queryForm;
		beforeEach(function() {
			queryForm = new QueryForm();
			queryForm.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(queryForm.getDidYouMean).toEqual(jasmine.any(Function));
				expect(queryForm.getQueryTerm).toEqual(jasmine.any(Function));
				expect(queryForm.updateQuery).toEqual(jasmine.any(Function));
				expect(queryForm.update).toEqual(jasmine.any(Function));
			});
		});
		describe("the QueryForm module ", function() {
			it("the method update() doesn't throw", function() {
				expect(function() {queryForm.update();}).not.toThrow();
			});
		});
	});
});
