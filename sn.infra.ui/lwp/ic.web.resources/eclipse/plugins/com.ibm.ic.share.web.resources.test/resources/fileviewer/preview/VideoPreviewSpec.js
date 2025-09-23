/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/preview/VideoPreview",
  "dojo/_base/array",
  "dojo/Deferred",
  "ic-share/fileviewer/FileViewer",
  "../MockFile",
  "dojo/_base/lang"
], function (VideoPreview, array, Deferred, FileViewer, fileData, lang) {
  "use strict";

  describe("VideoPreview", function () {
    beforeEach(function () {
      this.html5Spy = jasmine.createSpy("createHTML5Video");
      this.flashSpy = jasmine.createSpy("createFlashVideo");

      this.args = {
        _createHTML5Video: this.html5Spy,
        _createFlashVideo: this.flashSpy
      };
    });

    it("should show the HTML5 player for mp4 files", function () {
      var file = lang.clone(fileData);

      file.getExtension = function () {
        return "mp4";
      };

      VideoPreview.create(lang.mixin({
        file: FileViewer.createConnectionsFile(file)
      }, this.args));

      expect(this.html5Spy).toHaveBeenCalled();
    });

    it("should show the Flash player for mov files", function () {
      var file = lang.clone(fileData);

      file.getExtension = function () {
        return "mov";
      };

      VideoPreview.create(lang.mixin({
        file: FileViewer.createConnectionsFile(file)
      }, this.args));

      expect(this.flashSpy).toHaveBeenCalled();
    });
  });
});
