/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/FileViewer",
  "ic-share/fileviewer/FileViewerImpl",
  "./MockFile",
  "dojo/_base/lang",
  "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings"
], function (FileViewer, FileViewerImpl, MockFile, lang, nls) {
  "use strict";

  describe("FileViewerImpl", function () {
    function test(file) {
      var spy = jasmine.createSpy("formatDateByAge");

      if (lang.isFunction(spy.andReturn)) {
        spy.andReturn("");       // Jasmine 1.3
      } else if (lang.isFunction(spy.and.returnValue)) {
        spy.and.returnValue(""); // Jasmine 2.0
      } else {
        spy.and.callReturn("");  // Jasmine 2.0 RC
      }

      return {
        spy: spy,
        viewer: new FileViewerImpl({
          file: FileViewer.createConnectionsFile(file),
          formatDateByAge: spy,
          htmlSubstitute: function () {
            return "";
          }
        })
      };
    }

    it("should show creation date for files that have not been updated", function () {
      var file = lang.clone(MockFile),
        result = test(file);

      expect(result.spy).toHaveBeenCalledWith(file.getPublished(), nls.DATE.CREATED);
    });

    it("should show updated date for files that have been updated", function () {
      var result, file = lang.clone(MockFile);

      file.getUpdated = function () {
        return new Date(Date.UTC(2014, 10, 10, 4, 4, 32));
      };

      result = test(file);
      expect(result.spy).toHaveBeenCalledWith(file.getUpdated(), nls.DATE.LAST_UPDATED);
    });
  });
});
