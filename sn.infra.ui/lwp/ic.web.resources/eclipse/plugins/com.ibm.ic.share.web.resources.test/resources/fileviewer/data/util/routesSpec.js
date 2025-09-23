/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/data/util/routes",
  "ic-share/fileviewer/config/globals",
  "dojo/_base/array",
  "dojox/lang/functional"
], function (routes, globals, array, functional) {
  "use strict";

  describe("ic-share/fileviewer/data/util/routes", function () {
    describe("doesPageSupportFileHash", function () {
      globals.coreServices = {
        files: {url: "http://example.com/files" },
        communities: {url: "http://example.com/communities" }
      };
      
      var supportedUrls = {
        mainFilesPage1: "http://example.com/files/app",
        mainFilesPage2: "http://example.com/files/app#/",
        mainFilesPage3: "http://example.com/files/app#/communityfiles",
        mainFilesPage4: "http://example.com/files/app?debug=dojo#/communityfiles",
        mainFilesPage5: "http://example.com/files/app#/about",
        communitiesPage1: "http://example.com/communities/service/html/communitystart?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d",
        communitiesPage2: "http://example.com/communities/service/html/communitystart?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d#fullpageWidgetId=Wc4561355eda5_470e_8dc9_50221086d1ea",
        communitiesPage3: "http://example.com/communities/service/html/communitystart?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d#fullpageWidgetId=Members",
        communitiesPage4: "http://example.com/communities/service/html/community/updates?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d&filter=all",
        communitiesPage5: "http://example.com/communities/service/html/community/updates?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d&filter=all#fullpageWidgetId=Wc4561355eda5_470e_8dc9_50221086d1ea",
        communitiesPage6: "http://example.com/communities/service/html/communityoverview?communityUuid=b038506b-a92f-4b68-95bf-60e2cb5aab2d#fullpageWidgetId=Members"
      };
      
      var unsupportedUrls = {
        mainFilesPage1: "http://example.com/files/app/about",
        mainFilesPage2: "http://example.com/files/application/",
        forums: "http://example.com/forums/html/my",
        wikis: "http://example.com/wikis/home?lang=en-us",
        activities: "http://example.com/activities/service/html/mainpage",
        blogs: "http://example.com/blogs/roller-ui/allblogs?email=vhanley%40renovations.com&lang=en_us",
        bookmarks: "http://example.com/dogear/html?access=any&email=vhanley%40renovations.com&lang=en_us",
        homapge: "http://example.com/homepage/",
        profiles: "http://example.com/profiles/html/myProfileView.do",
        ownedCommunities: "http://example.com/communities/service/html/ownedcommunities"
      };
      
      beforeEach(function () {
        delete routes._pageSupportsFileHash;
      });
      
      it ("should return the cached result if available", function () {
        routes._pageSupportsFileHash = true;
        expect(routes.doesPageSupportFileHash()).toBe(true);
        
        routes._pageSupportsFileHash = false;
        expect(routes.doesPageSupportFileHash()).toBe(false);
      });
      
      array.forEach(functional.keys(supportedUrls), function (key) {
        it ("should return true for supported URL '" + key + "'", function () {
          routes._pageUrl = supportedUrls[key];
          expect(routes.doesPageSupportFileHash()).toBe(true);
        });
      });
      
      array.forEach(functional.keys(unsupportedUrls), function (key) {
        it ("should return false for unsupported URL '" + key + "'", function () {
          routes._pageUrl = unsupportedUrls[key];
          expect(routes.doesPageSupportFileHash()).toBe(false);
        });
      });
    });
  });
});
