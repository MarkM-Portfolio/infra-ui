/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/data/FilesAPI",
  "dojo/text!./sample/personal_file.xml"
], function (FilesAPI, personalFile) {
  "use strict";

  describe("FilesAPI", function () {
    describe("_getExtension", function () {
      function test(name, extension) {
        it("should return '" + extension + "' for '" + name + "'", function () {
          expect(FilesAPI._getTestInstance()._getExtension(name)).toEqual(extension);
        });
      }

      test("document.odt", "odt");
      test("image.png", "png");
      test("a.b.c.d", "d");
      test("Eclipse", "");
      test(".htaccess", "htaccess");
      test("foo.", "");
    });

    describe("from a good entry XML string", function () {
      beforeEach(function () {
        this.file = FilesAPI.fromEntryXML(personalFile);
      });

      it("should provide the file name", function () {
        expect(this.file.getName()).toBe("GatekeeperJS.odt");
      });

      it("should provide the file type extension", function () {
        expect(this.file.getExtension()).toBe("odt");
      });

      it("should provide the file size", function () {
        expect(this.file.getSize()).toBe("20736");
      });
      
      it("should provide the total file size", function () {
        expect(this.file.getTotalSize()).toBe("71996");
      });

      it("should provide the file ID", function () {
        expect(this.file.getId()).toBe("e20fb793-91a3-49b3-8c02-28612503b0a0");
      });

      it("should provide the date created", function () {
        expect(this.file.getDateCreated()).toEqual(new Date(1417789927910));
      });

      it("should provide the date modified", function () {
        expect(this.file.getDateModified()).toEqual(new Date(1417804809724));
      });

      it("should provide the creator", function () {
        var creator = this.file.getAuthor();

        expect(creator.name).toEqual("John Girata");
        expect(creator.id).toEqual("21123754");
        expect(creator.userState).toEqual("active");
      });

      it("should provide the modifier", function () {
        var user = this.file.getModifier();

        expect(user.name).toEqual("John Girata (modifier)");
        expect(user.id).toEqual("21123754m");
        expect(user.userState).toEqual("activem");
      });

      it("should provide encryption information", function () {
        expect(this.file.isEncrypted()).toBe(false);
      });

      it("should provide the type ID", function () {
        expect(this.file.getTypeId()).toEqual("00000000-0000-0000-0001-000000000000");
      });

      it("should provide the download URL", function () {
        expect(this.file.getDownloadUrl()).toEqual("https://apps.na.collabserv.com/files/form/api/library/" +
          "6ee9be0d-8996-4a93-a98f-4f47563d8511/document/e20fb793-91a3-49b3-8c02-28612503b0a0/media/GatekeeperJS.odt");
      });

      it("should provide the UI URL", function () {
        expect(this.file.getWebUrl()).toEqual("https://apps.na.collabserv.com/files/app/file/" +
          "e20fb793-91a3-49b3-8c02-28612503b0a0");
      });

      it("should provide the thumbnail URL", function () {
        expect(this.file.getThumbnailUrl()).toEqual("https://apps.na.collabserv.com/files/form/api/library/" +
          "6ee9be0d-8996-4a93-a98f-4f47563d8511/document/e20fb793-91a3-49b3-8c02-28612503b0a0/thumbnail?" +
          "renditionKind=mediumview");
      });
      it("should provide the version count", function () {
        expect(this.file.getVersionCount()).toEqual("3");
      });
      
      it("should provide the like count", function () {
        expect(this.file.getRatingCount()).toEqual("8");
      });
      
      it("should provide the times downloaded", function () {
        expect(this.file.getTimesDownloaded()).toEqual("13");
      });
      
      it("should provide the version count", function () {
        expect(this.file.getTimesDownloadedAnonymously()).toEqual("7");
      });
      
      it("should provide the description", function () {
        expect(this.file.getDescription()).toEqual("Test Desc.");
      });
      
      it("should provide the list of tags", function() {
        expect(this.file.getTags()[0]).toEqual("testtag1");
      });
      
    });
  });
});
