/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/config/Services",
  "dojo/_base/lang",
  "ic-share/fileviewer/config/globals"
], function (Services, lang, globals) {
  "use strict";

  describe("Services.getDocsUrl()", function () {
    var services;

    it("should return the full Docs url if within Verse", function () {
      globals.isVerse = true;
      services = new Services({});
      services._connectionsDomain = "http://example.com";
      expect(services.getDocsUrl()).toBe("http://example.com/docs");
    });

    it("should return the Docs path if within Connections", function () {
      globals.isVerse = false;
      services = new Services({});
      services._connectionsDomain = "http://example.com";
      expect(services.getDocsUrl()).toBe("/docs");
    });
  });

  describe("Services.getViewerUrl()", function () {
    var services;

    it("should return the full Viewer url if within Verse", function () {
      globals.isVerse = true;
      services = new Services({});
      services._connectionsDomain = "http://example.com";
      expect(services.getViewerUrl()).toBe("http://example.com/viewer");
    });

    it("should return the Viewer path if within Connections", function () {
      globals.isVerse = false;
      services = new Services({});
      services._connectionsDomain = "http://example.com";
      expect(services.getViewerUrl()).toBe("/viewer");
    });
  });
});
