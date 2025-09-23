/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.widgetUtilsSpec");

dojo.require("lconn.core.widgetUtils");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config");
dojo.require("dojox.uuid");

(function(utils) {
   var VERSION = '20131215-1236',
      MOCK_ICONTEXT = {widgetId:dojox.uuid.generateRandomUuid()};
   beforeEach(function() {
      this._iContext = window.iContext;
      window.iContext = MOCK_ICONTEXT;
      this._prevVersion = lconn.core.config.versionStamp;
      lconn.core.config.versionStamp = VERSION;
   });
   afterEach(function() {
      window.iContext = this._iContext;
      lconn.core.config.versionStamp = this._prevVersion;
   });
   describe("the interface of lconn.core.widgetUtils", function() {
      it("implements the expected methods", function() {
         expect(dojo.isFunction(utils.handleRefresh)).toBeTruthy();
         expect(dojo.isFunction(utils.addVersionNumber)).toBeTruthy();
         expect(dojo.isFunction(utils.search)).toBeTruthy();
         expect(dojo.isFunction(utils.searchC)).toBeTruthy();
      });
   });
   
   describe("the method lconn.core.widgetUtils.handleRefresh()", function() {
      it("returns the URL as-is when refreshInfoHolder[iContext.widgetId] is false", function() {
         var url = "http://www.example.com/foo/bar";
         var url1 = lconn.core.widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
         expect(url1.indexOf('preventCache=')).toBe(-1);
      });
      it("adds a preventCache URL parameter when refreshInfoHolder[iContext.widgetId] is true", function() {
         window.refreshInfoHolder = (function(){var h={}; h[MOCK_ICONTEXT.widgetId]=true; return h; })();
         var url = "http://www.example.com/foo/bar";
         var url1 = lconn.core.widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
         // preventCache should be the only URL parameter when no URL parameters exist
         expect(url1.indexOf('?preventCache=')).not.toBe(-1);
         
         var url = "http://www.example.com?foo=bar";
         var url1 = lconn.core.widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
         // preventCache should be appended to existing URL parameters when they exist
         expect(url1.indexOf('&preventCache=')).not.toBe(-1);
      });
   });
   
   describe("the method lconn.core.widgetUtils.addVersionNumber()", function() {
      it("adds an etag URL parameter with the value of WidgetPlacementConfig.params.version", function() {
         var url = "http://www.example.com/foo/bar";
         var url1 = lconn.core.widgetUtils.addVersionNumber(url);
         // etag should be the only URL parameter when no URL parameters exist
         expect(url1.indexOf('?etag='+VERSION)).not.toBe(-1);
         
         var url = "http://www.example.com?foo=bar";
         var url1 = lconn.core.widgetUtils.addVersionNumber(url);
         // etag should be appended to existing URL parameters when they exist
         expect(url1.indexOf('&etag='+VERSION)).not.toBe(-1);
      });
      it("returns the URL as-is when WidgetPlacementConfig.params.version is undefined", function() {
         delete lconn.core.config.versionStamp;
         var url = "http://www.example.com/foo/bar";
         var url1 = lconn.core.widgetUtils.addVersionNumber(url);
         expect(url1.indexOf('etag=')).toBe(-1);
      });
   });
   
   // TODO:
   /*
   describe("the method lconn.core.widgetUtils.search()", function() {
      it("", function() {
      });
   });
   
   describe("the method lconn.core.widgetUtils.searchC()", function() {
      it("", function() {
      });
   });
   */
}(lconn.core.widgetUtils));
