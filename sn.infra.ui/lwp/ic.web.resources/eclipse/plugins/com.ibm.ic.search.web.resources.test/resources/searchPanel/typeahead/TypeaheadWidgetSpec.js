/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/searchPanel/typeahead/TypeaheadWidget"
], function(TypeaheadWidget) {

	describe("the widget ic-search/searchPanel/typeahead/TypeaheadWidget", function() {
		var typeaheadWidget;
		beforeEach(function() {
			typeaheadWidget = new TypeaheadWidget();
			typeaheadWidget.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(typeaheadWidget.addServiceResponse).toEqual(jasmine.any(Function));
				expect(typeaheadWidget.setResults).toEqual(jasmine.any(Function));
				expect(typeaheadWidget.showLogin).toEqual(jasmine.any(Function));
				expect(typeaheadWidget.hideWidget).toEqual(jasmine.any(Function));
				expect(typeaheadWidget.showWidget).toEqual(jasmine.any(Function));
			});
		});
		describe("the addServiceResponse method", function() {
			it("create a service entry in internal array", function() {
				typeaheadWidget.addServiceResponse("serviceID");
				expect(typeaheadWidget._serviceNodeIndex["serviceID"]).toBeDefined()
				expect(typeaheadWidget._serviceNodeIndex["serviceID"]).not.toBeNull();
			});
		});
		describe("the setResults method", function() {
			it("set the result data to the correct service", function() {
				var data = {results: []};
				typeaheadWidget.addServiceResponse("serviceID");
				typeaheadWidget.setResults("serviceID", data);
				expect(typeaheadWidget._serviceNodeIndex["serviceID"].response).toBe(data)
				expect(typeaheadWidget._serviceNodeIndex["serviceID"].results).toEqual([]);
			});
		});
	});
});