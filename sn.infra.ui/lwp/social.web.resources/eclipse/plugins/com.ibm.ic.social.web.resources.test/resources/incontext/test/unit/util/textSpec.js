/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"ic-incontext/util/text",
], function(text) {

		describe("the ic-context.text class", function() {
			it("implements the expected methods", function() {
				expect(text.possessive).toEqual(jasmine.any(Function));
				expect(text.getExtension).toEqual(jasmine.any(Function));
				expect(text.getFilename).toEqual(jasmine.any(Function));
				expect(text.trimExtension).toEqual(jasmine.any(Function));
				expect(text.trimToLength).toEqual(jasmine.any(Function));
				expect(text.trim).toEqual(jasmine.any(Function));
				expect(text.trimEnd).toEqual(jasmine.any(Function));
				expect(text.parseInt).toEqual(jasmine.any(Function));
				expect(text.parseFloat).toEqual(jasmine.any(Function));					
				expect(text.formatSize).toEqual(jasmine.any(Function));		
				expect(text.lengthUtf8).toEqual(jasmine.any(Function));		
				expect(text.getCharIndexForUtf8Index).toEqual(jasmine.any(Function));		
				expect(text.encodeHeaderUtf8).toEqual(jasmine.any(Function));	
				expect(text.base64Encode).toEqual(jasmine.any(Function));	
				expect(text.getUTF8ByteArray).toEqual(jasmine.any(Function));
				expect(text.breakString).toEqual(jasmine.any(Function));
				expect(text.breakStringHTML).toEqual(jasmine.any(Function));					
			});
		});

});
