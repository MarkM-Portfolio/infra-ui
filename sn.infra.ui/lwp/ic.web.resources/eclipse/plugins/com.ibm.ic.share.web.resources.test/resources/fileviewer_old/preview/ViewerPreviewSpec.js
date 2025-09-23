/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/preview/ViewerPreview",
   "dojo/_base/array"
], function (ViewerPreview, array) {
   "use strict";

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

      it("should return false if the file is encrypted", function () {
         this.file.args.isEncrypted = true;
         expect(ViewerPreview.isValid(this.file)).toBeFalsy();
      });

      it("Should return false if it is not a valid file type", function () {
         this.file.args.type = "png";
         expect(ViewerPreview.isValid(this.file)).toBeFalsy();
      });
   });
});
