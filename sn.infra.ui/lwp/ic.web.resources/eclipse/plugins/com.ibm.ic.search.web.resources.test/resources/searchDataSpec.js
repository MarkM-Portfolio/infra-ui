/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-core/xslt",
	"ic-core/config/features",
	"ic-search/searchData"
], function(xsltModule, has, searchData) {

	describe("the widget ic-search/searchData", function() {
		var data;
		beforeEach(function() {
			data = new searchData();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(data.performQuery).toEqual(jasmine.any(Function));
				expect(data.getError).toEqual(jasmine.any(Function));
				expect(data.resultsTransform).toEqual(jasmine.any(Function));
				expect(data.getQueryCategoryConstraints).toEqual(jasmine.any(Function));
				expect(data.getQueryConstraintsAsObjects).toEqual(jasmine.any(Function));
				expect(data.getFilter).toEqual(jasmine.any(Function));
				expect(data.getFacetValuesFragment).toEqual(jasmine.any(Function));
				expect(data.dateTransform).toEqual(jasmine.any(Function));
				expect(data.peopleTransform).toEqual(jasmine.any(Function));
				expect(data.didYouMeanTransform).toEqual(jasmine.any(Function));
				expect(data.setFilter).toEqual(jasmine.any(Function));
			});
		});
		describe("the searchData module ", function() {
			it("the method resultsTransform() pass the correct newStyle property to XSL", function() {
				var xmlString = '<?xml version="1.0" encoding="UTF-8"?><rootElem></rootElem>';
				var xsltTemplate = "fakeStringTemplate";
				xsltModule.transform = function(xml, xslt, NotRelevant, propertyArray, NotRelevantBoolean) {
					var runned = false;
					for(var i=0; i < propertyArray.length; i++) {
						var entry = propertyArray[i];
						if(entry && entry[0] == "newStyle") {
							expect(entry[1]).not.toBeTruthy();
							runned = true;
						}
					}
					expect(runned).toBeTruthy();
				};
				data.resultsTransform("domId", xmlString, xsltTemplate);
				
				ibmConfig = { serviceName: "search" };
				has.add("search-global-search-restyle", function() {
					return true;
				}, true);
				xsltModule.transform = function(xml, xslt, NotRelevant, propertyArray, NotRelevantBoolean) {
					var runned = false;
					for(var i=0; i < propertyArray.length; i++) {
						var entry = propertyArray[i];
						if(entry && entry[0] == "newStyle") {
							expect(entry[1]).toBeTruthy();
							runned = true;
						}
					}
					expect(runned).toBeTruthy();
				};
				data.resultsTransform("domId", xmlString, xsltTemplate);
			});
		});
	});
});