/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/history/HistoryDataReader"
], function(HistoryDataReader) {

	describe("the widget ic-search/searchPanel/history/HistoryDataReader", function() {
		var dataReader;
		beforeEach(function() {
			dataReader = new HistoryDataReader();
			dataReader.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				//inherited methods
				expect(dataReader.resetLastQuery).toEqual(jasmine.any(Function));
				expect(dataReader.executeQuery).toEqual(jasmine.any(Function));
				expect(dataReader.getNextPage).toEqual(jasmine.any(Function));
				expect(dataReader.abortLastRequest).toEqual(jasmine.any(Function));
				expect(dataReader.setPageSize).toEqual(jasmine.any(Function));
			});
		});
	});
});