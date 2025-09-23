/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-core/typeahead/Service"
], function(Service) {

	describe("the widget ic-core/typeahead/Service", function() {
		var service;
		beforeEach(function() {
			service = new Service();
			service.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(service.executeQuery).toEqual(jasmine.any(Function));
				expect(service.initResults).toEqual(jasmine.any(Function));
				expect(service.initAriaNodes).toEqual(jasmine.any(Function));
				expect(service.setTimeout).toEqual(jasmine.any(Function));
				expect(service.setPageSize).toEqual(jasmine.any(Function));
			});
		});
		describe("the executeQuery method", function() {
			it("calls the _dataReader.executeQuery method", function() {
				spyOn(service._dataReader, "executeQuery").and.returnValue({
					then: function() { console.log("then set"); },
					otherwise: function() { console.log("otherwise set"); }
				});
				service.executeQuery("test");
				expect(service._dataReader.executeQuery).toHaveBeenCalledWith("test");
			});
			it("calls the _handleDisabled method", function() {
				spyOn(service, "_handleDisabled");
				service.isDisabled = true;
				service.executeQuery("test");
				expect(service._handleDisabled).toHaveBeenCalled();
			});
			it("calls the _handleLogin method", function() {
				spyOn(service, "_handleLogin");
				service.isLoginNeeded = true;
				service.executeQuery("test");
				expect(service._handleLogin).toHaveBeenCalled();
			});
		});
		describe("the setTimeout method", function() {
			it("set _dataReader.timeout property", function() {
				service.setTimeout(1);
				expect(service._dataReader.timeout).toBe(1);
			});
		});
		describe("the setPageSize method", function() {
			it("set the page size in _dataReader object", function() {
				spyOn(service._dataReader, "setPageSize");
				service.setPageSize(1);
				expect(service._dataReader.setPageSize).toHaveBeenCalledWith(1);
			});
		});
	});
});
