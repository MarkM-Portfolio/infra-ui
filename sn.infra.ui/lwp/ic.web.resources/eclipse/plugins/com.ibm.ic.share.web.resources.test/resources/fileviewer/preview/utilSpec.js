/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/preview/util"
], function (util) {
  "use strict";

  describe("util.Clamp()", function () {
    it("Should return the ceiling if input exceeds it the ceiling", function () {
      var save = util.clamp(10, -5, 5);
      expect(save).toEqual(5);
    });
    it("Should return the floor if floor exceeds the input", function () {
      var save = util.clamp(-8, -5, 5);
      expect(save).toEqual(-5);
    });
    it("Should return the input if input is between the floor and ceiling", function () {
      var save = util.clamp(3, -5, 5);
      expect(save).toEqual(3);
    });
  });

  describe("util.formatFileSize()", function () {
    it("should correctly format the file size", function () {
      function test(input, expected) {
        it("should format " + input + " as " + expected, function () {
          expect(util.formatFileSize(input)).toEqual(expected);
        });
      }

      // Simple cases
      test(301, "301 B");
      test(377687, "369 KB"); //I don't think it's necessary to show decimals for KB.
      test(3779874, "3.6 MB");
      test(3779873443, "3.5 GB");
      test(3779873443000, "3.4 TB");
      test(10000, "10 KB");

      // Edge cases
      test(0, "0 B");
      test(3779873443000000, "3437.8 TB");
      test(999, "999 B");
      test(9999, "10 KB");
      test(999900, "976 KB"); //since we are not showing decimals for B/KB, this should be 1MB because we round up
      test(999999, "977 KB");
      test(999900000, "953.6 MB");
      test(999999999, "953.7 MB");
      test(999900000000, "931.2 GB");
      test(999999999999, "931.3 GB");

      test(500, "500 B");
      test(999990, "977 KB");
      test(999990000, "953.7 MB");
      test(999990000000, "931.3 GB");
    });
  });

  describe("util.getIconClass()", function () {
    it("should return a 32px Graphic icon for png/32", function () {
      expect(util.getIconClass({type: "png"}, 32)).toEqual("iconsFileTypes32 iconsFileTypes32-ftGraphic32");
    });

    it("should return a 64px document icon for odt/64", function () {
      expect(util.getIconClass({type: "odt"}, 64)).toEqual("iconsFileTypes64 iconsFileTypes64-ftWordProcessing64");
    });

    it("should return a 64px Docs document icon for odt/64", function () {
      var fileArgs = {
        type: "odt",
        objectTypeId: "00000000-0000-0000-0001-000000000000"
      };
      expect(util.getIconClass(fileArgs, 64)).toEqual("iconsFileTypes64 iconsFileTypes64-ftWordProcessingDocs64");
    });

    it("should return a 32px default icon for abc/32", function () {
      expect(util.getIconClass({type: "abc"}, 32)).toEqual("iconsFileTypes32 iconsFileTypes32-ftDefault32");
    });

    it("should return a default icon if the type is undefined", function () {
      expect(util.getIconClass({})).toEqual("iconsFileTypes128 iconsFileTypes128-ftDefault128");
    });

    it("should return a default icon if the type is empty", function () {
      expect(util.getIconClass({type: ""})).toEqual("iconsFileTypes128 iconsFileTypes128-ftDefault128");
    });
  });

  describe("util.isFileSizeFormatted()", function () {
    it ("should correctly report if the file size is formatted", function () {
      function testFormatted(input, expected) {
        it(input + " should be an already formatted string", function () {
          expect(util.isFileSizeFormatted(input)).toBe(expected);
        });
      }

      function testUnformatted(input, expected) {
        it(input + " should be an unformatted string or number", function () {
          expect(util.isFileSizeFormatted(input)).toBe(expected);
        });
      }

      testFormatted("112k", true);
      testFormatted("112 k", true);
      testFormatted("118b", true);
      testFormatted("14134 m", true);
      testFormatted("1.2b", true);
      testFormatted("1.4m", true);
      testFormatted("123.553 g", true);
      testUnformatted("112", false);
      testUnformatted(112, false);
      testUnformatted("103084", false);
      testUnformatted(1283.43, false);
      testUnformatted("98.73", false);
      testUnformatted("09125", false);
    });
  });

  describe("util.isFileViewable", function () {
    it("should correctly return if the file is viewable", function () {
      function test(repository, extension, expected) {
        var file = {
          type: repository,
          args: {
            type: extension
          }
        };

        expect(util.isFileViewable(file)).toBe(expected);
      }

      test("verse", "odt", true);
      test("verse", "pdf", true);
      test("verse", "xls", true);
      test("verse", "pptx", true);
      test("verse", "png", false);

      test("connections", "odt", true);
      test("connections", "pdf", true);
      test("connections", "xls", true);
      test("connections", "pptx", true);
      test("connections", "png", false);
    });
  });
});
