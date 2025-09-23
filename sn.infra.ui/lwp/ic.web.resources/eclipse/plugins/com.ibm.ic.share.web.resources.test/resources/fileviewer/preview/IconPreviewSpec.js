/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
  "ic-share/fileviewer/preview/IconPreview",
  "ic-share/fileviewer/FileViewer",
  "../MockFile"
], function (IconPreview, FileViewer, file) {
  "use strict";

  describe("IconPreview", function () {
    it("should always be valid", function () {
      expect(IconPreview.isValid()).toBeTruthy();
    });

    it("should show a message to the user", function () {
      expect(function () {
        var preview = IconPreview.create({
          file: FileViewer.createConnectionsFile(file)
        });

        expect(preview.domNode.innerHTML.indexOf("No preview available")).toBeGreaterThan(-1);
      }).not.toThrow();
    });
  });
});
