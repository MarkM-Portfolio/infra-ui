/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojox/uuid",
      "dojox/uuid/generateRandomUuid",
      "ic-core/config",
      "ic-core/url",
      "ic-core/widgetUtils"
], function(lang, uuid, generateRandomUuid, config, urlModule, widgetUtils) {

   describe("the ic-core/widgetUtils module", function() {
      var VERSION = '20131215-1236', MOCK_ICONTEXT = {
         widgetId : generateRandomUuid()
      };
      beforeEach(function() {
         this._iContext = window.iContext;
         window.iContext = MOCK_ICONTEXT;
         this._prevVersion = config.versionStamp;
         config.versionStamp = VERSION;
      });
      afterEach(function() {
         window.iContext = this._iContext;
         config.versionStamp = this._prevVersion;
      });
      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(lang.isFunction(widgetUtils.handleRefresh)).toBeTruthy();
            expect(lang.isFunction(widgetUtils.addVersionNumber)).toBeTruthy();
            expect(lang.isFunction(widgetUtils.search)).toBeTruthy();
            // expect(lang.isFunction(widgetUtils.searchC)).toBeTruthy();
         });
      });

      describe("the method ic-core/widgetUtils.handleRefresh()", function() {
         it("returns the URL as-is when refreshInfoHolder[iContext.widgetId] is false", function() {
            var url = "http://www.example.com/foo/bar";
            var url1 = widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
            expect(url1.indexOf('preventCache=')).toBe(-1);
         });
         it("adds a preventCache URL parameter when refreshInfoHolder[iContext.widgetId] is true", function() {
            window.refreshInfoHolder = (function() {
               var h = {};
               h[MOCK_ICONTEXT.widgetId] = true;
               return h;
            }());
            var url = "http://www.example.com/foo/bar";
            var url1 = widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
            // preventCache should be the only URL parameter when no URL
            // parameters exist
            expect(url1.indexOf('?preventCache=')).not.toBe(-1);

            url = "http://www.example.com?foo=bar";
            url1 = widgetUtils.handleRefresh(url, MOCK_ICONTEXT);
            // preventCache should be appended to existing URL parameters when
            // they exist
            expect(url1.indexOf('&preventCache=')).not.toBe(-1);
         });
      });

      describe("the method ic-core/widgetUtils.addVersionNumber()", function() {
         it("adds an etag URL parameter with the value of WidgetPlacementConfig.params.version", function() {
            var url = "http://www.example.com/foo/bar";
            var url1 = widgetUtils.addVersionNumber(url);
            // etag should be the only URL parameter when no URL parameters
            // exist
            expect(url1.indexOf('?etag=' + VERSION)).not.toBe(-1);

            url = "http://www.example.com?foo=bar";
            url1 = widgetUtils.addVersionNumber(url);
            // etag should be appended to existing URL parameters when they
            // exist
            expect(url1.indexOf('&etag=' + VERSION)).not.toBe(-1);
         });
         it("returns the URL as-is when WidgetPlacementConfig.params.version is undefined", function() {
            delete config.versionStamp;
            var url = "http://www.example.com/foo/bar";
            var url1 = widgetUtils.addVersionNumber(url);
            expect(url1.indexOf('etag=')).toBe(-1);
         });
      });

      // TODO:
//      describe("the method ic-core/widgetUtils.search()", function() {
//         it("", function() {});
//      });
//
//      describe("the method ic-core/widgetUtils.searchC()", function() {
//         it("", function() {});
//      });
   });
});
