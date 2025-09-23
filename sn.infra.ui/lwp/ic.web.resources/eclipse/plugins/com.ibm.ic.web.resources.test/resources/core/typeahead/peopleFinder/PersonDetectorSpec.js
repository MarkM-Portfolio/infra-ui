/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-core/peopleFinder/PersonDetector"
],function(PersonDetector) {

	describe("the widget ic-core/peopleFinder/PersonDetector", function() {
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
});
