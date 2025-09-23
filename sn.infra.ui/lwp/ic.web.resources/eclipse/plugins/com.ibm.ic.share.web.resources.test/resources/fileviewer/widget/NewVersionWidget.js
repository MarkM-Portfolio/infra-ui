/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "ic-share/fileviewer/widget/NewVersionWidget"
], function (NewVersionWidget) {
   "use strict";

   describe("NewVersionWidget._breakFilename", function () {
      it("should handle regular filenames", function () {
         var parts = NewVersionWidget._breakFilename("foo.png");
         expect(parts.base).toBe("foo");
         expect(parts.ext).toBe("png");
      });

      it("should handle filenames with multiple periods", function () {
         var parts = NewVersionWidget._breakFilename("foo.bar.png");
         expect(parts.base).toBe("foo.bar");
         expect(parts.ext).toBe("png");
      });

      it("should handle filenames with no periods", function () {
         var parts = NewVersionWidget._breakFilename("foo");
         expect(parts.base).toBe("foo");
         expect(parts.ext).toBe("");
      });

      it("should handle filenames with no base", function () {
         var parts = NewVersionWidget._breakFilename(".htaccess");
         expect(parts.base).toBe("");
         expect(parts.ext).toBe("htaccess");
      });
   });
});
