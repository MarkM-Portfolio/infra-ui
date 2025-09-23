/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/bean/File",
  "ic-share/fileviewer/data/CommentFeedDataStore",
  "ic-share/fileviewer/data/VersionFeedDataStore",
  "ic-share/fileviewer/data/FileEntryDataStore",
  "ic-share/fileviewer/data/SharingFeedDataStore",
  "ic-share/fileviewer/data/ShareLinksFeedDataStore",
  "ic-share/fileviewer/data/ShareHistoryFeedDataStore",
  "ic-share/fileviewer/data/RecommendationFeedDataStore",
  "ic-share/fileviewer/data/DownloadInfoFeedDataStore",
  "ic-share/fileviewer/data/TagDataStore",
  "dojox/xml/parser",
  "dojo/_base/array",
  "dojox/lang/functional",
  "dojo/text!../data/sample/personal_file.xml",
  "dojo/text!../data/sample/community_file.xml",
  "dojo/Deferred"
], function (File, CommentFeed, VersionFeed, FileEntryFeed, SharingFeed, ShareLinksFeed, ShareHistoryFeed,
  RecommendationFeed, DownloadInfoFeed, TagFeed, parser, array, functional, personalFileXml,
  communityFileXml, Deferred) {
  "use strict";

  describe("ic-share/fileviewer/bean/File", function () {
    var file;

    describe("a community file", function () {
      beforeEach(function () {
        file = new File({id: "12800c80-a159-4004-a0de-470a34cf56c9"});
        file.set("xml", parser.parse(communityFileXml));
      });
      
      it("should return the community id", function () {
        expect(file.get("communityId")).toBe("08297103-8e2f-49f1-a52d-b87636313b61");
      });

      it("should indicate that the file is locked", function () {
         expect(file.get("isLocked")).toBeTruthy();
      });
    });
    
    describe("a personal file", function () {
      beforeEach(function () {
        file = new File({id: "e20fb793-91a3-49b3-8c02-28612503b0a0"});
        file.set("xml", parser.parse(personalFileXml));
      });

      it("should provide the file name", function () {
        expect(file.get("name")).toBe("GatekeeperJS.odt");
      });

      it("should provide the file size", function () {
        expect(file.get("size")).toBe("20736");
      });

      it("should return an emptry string for the community id", function () {
        expect(file.get("communityId")).toBe("");
      });

      it("should provide the file ID", function () {
        expect(file.get("id")).toBe("e20fb793-91a3-49b3-8c02-28612503b0a0");
      });

      it("should provide the date created", function () {
        expect(file.get("dateCreated")).toEqual(new Date(1417789927910));
      });

      it("should provide the date modified", function () {
        expect(file.get("dateModified")).toEqual(new Date(1417804809724));
      });

      it("should provide the creator", function () {
        var creator = file.get("author");

        expect(creator.name).toEqual("John Girata");
        expect(creator.id).toEqual("21123754");
        expect(creator.userState).toEqual("active");
      });

      it("should provide the modifier", function () {
        var user = file.get("modifier");

        expect(user.name).toEqual("John Girata (modifier)");
        expect(user.id).toEqual("21123754m");
        expect(user.userState).toEqual("activem");
      });

      it("should provide encryption information", function () {
        expect(file.get("isEncrypted")).toBe(false);
      });

      it("should provide the download URL", function () {
        expect(file.get("downloadUrl")).toEqual("https://apps.na.collabserv.com/files/form/api/library/" +
        "6ee9be0d-8996-4a93-a98f-4f47563d8511/document/e20fb793-91a3-49b3-8c02-28612503b0a0/media/GatekeeperJS.odt");
      });

      it("should provide the thumbnail URL", function () {
        expect(file.get("thumbnailUrl")).toEqual("https://apps.na.collabserv.com/files/form/api/library/" +
            "6ee9be0d-8996-4a93-a98f-4f47563d8511/document/e20fb793-91a3-49b3-8c02-28612503b0a0/thumbnail?" +
        "renditionKind=mediumview");
      });

      it("should provide the list of tags", function () {
        expect(file.get("tags")[0]).toEqual("testtag1");
      });

      var feeds = {
        "commentFeed": CommentFeed,
        "versionFeed": VersionFeed,
        "fileEntryFeed": FileEntryFeed,
        "sharingFeed": SharingFeed,
        "collectionSharingFeed": SharingFeed,
        "shareLinksFeed": ShareLinksFeed,
        "shareHistoryFeed": ShareHistoryFeed,
        "recommendationFeed": RecommendationFeed,
        "downloadInfoFeed": DownloadInfoFeed,
        "tagFeed": TagFeed
      };
      array.forEach(functional.keys(feeds), function (feedName) {
        it("should properly return the " + feedName, function () {

          var feed, feed2;
          feed = file.get(feedName);
          expect(feed.isInstanceOf(feeds[feedName])).toBe(true);

          feed2 = file.get(feedName);
          expect(feed).toBe(feed2);
        });
      });
      
      it("should properly retrieve the entry", function () {
        var unloadedFile = new File({id: "12800c80-a159-4004-a0de-470a34cf56c9"});
        var fileEntryFeed = unloadedFile.get("fileEntryFeed");
        
        expect(unloadedFile.get("name")).toBeUndefined();
        
        var promise = new Deferred();
        spyOn(fileEntryFeed, "loadItem").andCallFake(function () {
          unloadedFile.set("xml", parser.parse(personalFileXml));
          var promise = new Deferred();
          promise.resolve();
          return promise;
        });
        
        unloadedFile.get("entry");
        
        expect(unloadedFile.hasEntry).toBe(true);
        expect(unloadedFile.get("name")).toBe("GatekeeperJS.odt");
      });

      it("should indicate that the file is not locked", function () {
         expect(file.get("isLocked")).toBeFalsy();
      });
    });
  });
});
