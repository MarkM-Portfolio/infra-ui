/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/data/FeedDataStore",
  "dojo/Stateful",
  "dojo/_base/lang",
  "../MockFileBean",
  "ic-share/fileviewer/data/util/routes",
  "ic-share/fileviewer/bean/Bean",
  "dojox/xml/parser",
  "dojo/_base/declare"
], function (FeedDataStore, Stateful, lang, MockFileBean, routes, Bean, xmlParser, declare) {
  "use strict";

  describe("FeedDataStore::constructor()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;
      
      this.mockEntryClass = new Stateful({
        titleWithCount: "test title"
      });
      
      this.mockBean = new Bean();
    });

    it("should create an instance of the object", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: this.mockEntryClass});
      
      expect(feedDs).toBeDefined();
    });
  });
  
  describe("FeedDataStore::general functions", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;
      
      this.mockEntryClass = new Stateful({
        titleWithCount: "test title"
      });
      
      this.mockBean = new Bean();
    });
    
    it("should build the post body", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: this.mockEntryClass});
      
      spyOn(feedDs._domBuilder, 'getPostBody').andCallThrough();
      feedDs._getPostBody(this.mockBean);
      expect(feedDs._domBuilder.getPostBody).toHaveBeenCalledWith(this.mockBean);
    });
    
    it("should build the put body", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: this.mockEntryClass});
      
      spyOn(feedDs, '_getPostBody').andCallThrough();
      feedDs._getPutBody(this.mockBean);
      expect(feedDs._getPostBody).toHaveBeenCalledWith(this.mockBean);
    });
    
    it("should reset page number and call fetch", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: this.mockEntryClass});

      spyOn(feedDs, 'fetch').andCallThrough();
      spyOn(feedDs, '_loadPage').andCallFake(function () {
        return;
      });
      feedDs.refresh();
      expect(feedDs._page).toEqual(1);
      expect(feedDs.fetch).toHaveBeenCalled();
      expect(feedDs._loadPage).toHaveBeenCalled();
    });
    
    it("should load another page if there are more items", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: this.mockEntryClass});

      spyOn(feedDs, '_loadPage').andCallFake(function () {
        return;
      });
      feedDs._hasNext = true;
      feedDs.next();
      expect(feedDs._loadPage).toHaveBeenCalled();
    });
    
    it("should handle the response of items", function () {
      var feedDs = FeedDataStore({url: routes.getMySharesFeedUrl(), file: this.mockFile, EntryClass: Bean});

      spyOn(feedDs, '_loadPage').andCallFake(function () {
        return;
      });
      spyOn(feedDs, '_getItems').andCallThrough();
      
      var mockResponse = xmlParser.parse("<feed><entry><id>urn:lsid:ibm.com:td:f2bfae48-1271-4d24-a552-102bef1dd57f</id></entry></feed>");
      feedDs._handleFeedResponse(mockResponse);
      expect(feedDs._getItems).toHaveBeenCalled();
    });
    
  });
});
