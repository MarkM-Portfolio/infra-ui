/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/Paging"
], function(Paging) {

	describe("the widget ic-search/Paging", function() {
		var paging;
		beforeEach(function() {
			paging = new Paging();
			paging.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(paging.focus).toEqual(jasmine.any(Function));
				expect(paging.onPageSelected).toEqual(jasmine.any(Function));
			});
		});
	});
});