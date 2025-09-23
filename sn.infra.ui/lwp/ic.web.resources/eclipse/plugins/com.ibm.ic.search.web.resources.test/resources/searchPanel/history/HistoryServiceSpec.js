/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/history/HistoryService"
], function(HistoryService) {

	describe("the widget ic-search/searchPanel/history/HistoryService", function() {
		var service;
		beforeEach(function() {
			service = new HistoryService();
			service.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(service.initResults).toEqual(jasmine.any(Function));
				expect(service.focusCallback).toEqual(jasmine.any(Function));
				
				//inherited methods
				expect(service.executeQuery).toEqual(jasmine.any(Function));
				expect(service.initAriaNodes).toEqual(jasmine.any(Function));
				expect(service.setTimeout).toEqual(jasmine.any(Function));
				expect(service.setPageSize).toEqual(jasmine.any(Function));
			});
		});
	});
});