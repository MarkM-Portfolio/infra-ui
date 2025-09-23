/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.typeahead.peopleFinder.PersonDetectorSpec");

dojo.require("lconn.core.peopleFinder.PersonDetector");

(function(PersonDetector) {

	describe("the widget lconn.core.peopleFinder.PersonDetector", function() {
		var personDetector;
		beforeEach(function() {
			personDetector = new PersonDetector();
			personDetector.startup();
		});
		describe("the interface ", function() {
			it("implements the expected methods", function() {
				expect(personDetector.detect).toEqual(jasmine.any(Function));
				expect(personDetector.onPersonFound).toEqual(jasmine.any(Function));
				expect(personDetector.onNoPersonFound).toEqual(jasmine.any(Function));
			});
		});
	});
}(lconn.core.peopleFinder.PersonDetector));
