/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"dojo/_base/declare",
	"ic-as/item/FileNewsItem",
	"ic-as/item/data/NewsDataAccessor",
	"ic-as/util/AbstractHelper",
	"../../..//test/testfeeds/StandardConnectionsFeed"
], function(Declare, FileNewsItem, NewsDataAccessor, AbstractHelper, StandardConnectionsFeed) {
		// Feeds needed
		window.activityStreamAbstractHelper = new AbstractHelper({
			isGadget: false
		});
		
		var testObj;		
		describe("the ic-as/item/FileNewsItem class", function() {
			beforeEach(function() {
				var standardFeed = new StandardConnectionsFeed();
				var newsData = Declare.safeMixin(standardFeed.content.entry[0], 
												new NewsDataAccessor());
				
				testObj = new FileNewsItem({
					newsData: newsData
				});				
			});
			
			it("implements the expected methods", function() {
				expect(testObj.isFileOverlayEnabled).toEqual(jasmine.any(Function));
			});									
		});		

});
