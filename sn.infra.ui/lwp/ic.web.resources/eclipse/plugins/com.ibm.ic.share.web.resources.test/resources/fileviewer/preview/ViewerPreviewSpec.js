/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/preview/ViewerPreview",
  "dojo/_base/array",
  "dojo/Deferred",
  "ic-share/fileviewer/FileViewer",
  "../MockFile",
  "dojo/_base/lang"
], function (ViewerPreview, array, Deferred, FileViewer, fileData, lang) {
  "use strict";

  describe("ViewerPreview", function () {
    beforeEach(function () {
      var deferred = new Deferred();
      this.spy = jasmine.createSpy("getViewerLink");

      if (lang.isFunction(this.spy.andReturn)) {
        this.spy.andReturn("");       // Jasmine 1.3
      } else if (lang.isFunction(this.spy.and.returnValue)) {
        this.spy.and.returnValue(""); // Jasmine 2.0
      } else {
        this.spy.and.callReturn("");  // Jasmine 2.0 RC
      }

      ViewerPreview.create({
        file: FileViewer.createConnectionsFile(fileData),
        getViewerLink: this.spy,
        entitlements: {
          getViewerDfd: function () {
            return deferred;
          }
        }
      });

      this.deferred = deferred;
    });

    it("should show the viewer if the user has a docs viewer entitlement", function () {
      this.deferred.resolve(true);
      expect(this.spy).toHaveBeenCalled();
    });

    it("should not show the viewer if the user has a docs viewer entitlement", function () {
      this.deferred.resolve(false);
      expect(this.spy).not.toHaveBeenCalled();
    });
  });

  describe("ViewerPreview.isValid()", function () {
    beforeEach(function () {
      this.file = { args: {} };
    });

    array.forEach(["doc", "docx", "odt", "odp", "pdf"], function (type) {
      it("should return true if the file type is " + type, function () {
        this.file.args.type = type;
        expect(ViewerPreview.isValid(this.file)).toBeTruthy();
      });
    });

    it("Should return false if it is not a valid file type", function () {
      this.file.args.type = "png";
      expect(ViewerPreview.isValid(this.file)).toBeFalsy();
    });
  });
});
