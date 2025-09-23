/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"ic-incontext/util/html",
], function(html) {

		describe("the ic-context.html class", function() {
			it("implements the expected methods", function() {
				expect(html.isHighContrast).toEqual(jasmine.any(Function));
				expect(html.showLoading).toEqual(jasmine.any(Function));
				expect(html.getDirectionCode).toEqual(jasmine.any(Function));
				expect(html.destroyWidgets).toEqual(jasmine.any(Function));
				expect(html.removeChildren).toEqual(jasmine.any(Function));
				expect(html.isEvent).toEqual(jasmine.any(Function));
				expect(html.append).toEqual(jasmine.any(Function));
				expect(html.createTable).toEqual(jasmine.any(Function));
				expect(html.countCells).toEqual(jasmine.any(Function));				
				expect(html.formatFilename).toEqual(jasmine.any(Function));		
				expect(html.encodeHtmlAttribute).toEqual(jasmine.any(Function));		
				expect(html.encodeHtml).toEqual(jasmine.any(Function));		
				expect(html.decodeHtml).toEqual(jasmine.any(Function));		
				expect(html.getFrameDocument).toEqual(jasmine.any(Function));		
			});
		});

});
