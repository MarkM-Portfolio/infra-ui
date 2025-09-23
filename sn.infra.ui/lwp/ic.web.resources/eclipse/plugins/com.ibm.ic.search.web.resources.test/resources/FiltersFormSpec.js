/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/FiltersForm"
], function(FiltersForm) {

	describe("the widget ic-search/FiltersForm", function() {
		var filtersForm;
		beforeEach(function() {
			filtersForm = new FiltersForm({
				apiHandler: jasmine.createSpyObj("apiHandler", [
													"isPersonalizationEnabled",
													"getComponentFilter",
													"setPersonalization",
													"getPersonalOnly"
												])
			});
			filtersForm.startup();
		});
		describe("the interface ", function() {
			it("implements the expected private methods", function() {
				expect(filtersForm._isTypeDropDownVisible).toEqual(jasmine.any(Function));
				expect(filtersForm._isAllTypesDropDownVisible).toEqual(jasmine.any(Function));
				expect(filtersForm._isCommunitiesEntitled).toEqual(jasmine.any(Function));
				expect(filtersForm._isAclDropDownVisible).toEqual(jasmine.any(Function));
				expect(filtersForm._currentComponentCanBeStandalone).toEqual(jasmine.any(Function));
				expect(filtersForm._createLinkSubmit).toEqual(jasmine.any(Function));
				expect(filtersForm._checkBoxClicked).toEqual(jasmine.any(Function));
			});
		});
	});
});