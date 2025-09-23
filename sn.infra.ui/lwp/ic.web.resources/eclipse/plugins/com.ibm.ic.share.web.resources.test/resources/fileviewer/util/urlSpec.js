/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/url",
  "ic-share/fileviewer/config/globals",
  "dojo/_base/array",
  "dojox/lang/functional"
], function (url, globals, array, functional) {
  "use strict";

  describe("ic-share/fileviewer/util/url.rewrite()", function () {
    it("should return the URL when no parameters are given", function () {
      expect(url.rewrite("http://foo.com/bar?a=b&c=d#frag")).toEqual("http://foo.com/bar?a=b&c=d#frag");
    });

    it("should add the URL parameters when parameters are given", function () {
      expect(url.rewrite("http://foo.com/bar?a=b#frag", {
        a: "c",
        c: "d"
      })).toEqual("http://foo.com/bar?a=b&c=d#frag");
    });
  });
  
  describe("ic-share/fileviewer/util/url.toFilesAnchorForm()", function () {
    setupServices();
    var urls = {
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff": "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all"
    };
    
    array.forEach(functional.keys(urls), function (key) {
      var input = key,
        expectedOutput = urls[key];
      
      it("should convert " + input + " to anchor form", function () {
        expect(url.toFilesAnchorForm(input) + "").toEqual(expectedOutput);
      });
    });
  });
  
  describe("ic-share/fileviewer/util/url.fromFilesAnchorForm()", function () {
    setupServices();
    var urls = {
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff": "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff"
    };
    
    array.forEach(functional.keys(urls), function (key) {
      var input = key,
        expectedOutput = urls[key];
      
      it("should convert " + input + " to anchor form", function () {
        expect(url.fromFilesAnchorForm(input) + "").toEqual(expectedOutput);
      });
    });
  });
  
  describe("ic-share/fileviewer/util/url.removeHost()", function () {
    setupServices();
    var urls = {
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "/files/app#/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989": "/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all": "/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all": "/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all&unsubscribe=all",
      "http://example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff": "/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff",
      "//example.com/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff": "/files/app/file/30feb6a2-ae66-419b-8b56-0ba5ee2e0989?subscribe=all#randomextrastuff",
      "http://www.ibm.com": "",
      "http://www.ibm.com/": "/"
    };
    
    array.forEach(functional.keys(urls), function (key) {
      var input = key,
        expectedOutput = urls[key];
      
      it("should remove the host from URL " + input, function () {
        expect(url.removeHost(input)).toEqual(expectedOutput);
      });
    });
  });
  
  function setupServices() {
    globals.coreServices = {
      files: {url: "http://example.com/files" }
    };
  }
});
