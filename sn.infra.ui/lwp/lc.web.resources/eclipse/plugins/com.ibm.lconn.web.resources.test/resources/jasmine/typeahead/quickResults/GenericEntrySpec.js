/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.typeahead.quickResults.GenericEntrySpec");

dojo.require("lconn.core.quickResults.GenericEntry");

(function(GenericEntry) {

	describe("the widget lconn.core.quickResults.GenericEntry", function() {
		var genericEntry;
		beforeEach(function() {
			genericEntry = new GenericEntry({
				author: "anAuthor",
				date: new Date(),
				source: "ACTIVITIES"
			});
			genericEntry.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(genericEntry._initStrings).toEqual(jasmine.any(Function));
				expect(genericEntry._initIcon).toEqual(jasmine.any(Function));
				expect(genericEntry._getEntryTypeString).toEqual(jasmine.any(Function));
				expect(genericEntry.entryClick).toEqual(jasmine.any(Function));
			});
		});
	});
}(lconn.core.quickResults.GenericEntry));
