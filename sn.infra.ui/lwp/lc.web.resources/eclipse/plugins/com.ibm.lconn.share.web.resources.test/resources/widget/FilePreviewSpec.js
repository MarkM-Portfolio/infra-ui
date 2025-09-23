/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function () {
   dojo.provide("lconn.share.test.widget.FilePreviewSpec");
   dojo.require("lconn.share.widget.FilePreview");

   describe("lconn.share.widget.FilePreview._getFolderIconClass", function () {
      var _getFolderIconClass = lconn.share.widget.FilePreview._getFolderIconClass;

      it("should return the default folder class if the folder is private", function () {
         expect(_getFolderIconClass({
            isFolder: true,
            folderType: "personal",
            visibility: "private"
         })).toBe("ic-thumb-folder");
      });

      it("should return the shared folder class if the folder is shared", function () {
         expect(_getFolderIconClass({
            isFolder: true,
            folderType: "personal",
            visibility: "shared"
         })).toBe("ic-thumb-folder ic-thumb-folder-shared");
      });

      it("should return the public folder class if the folder is public", function () {
         expect(_getFolderIconClass({
            isFolder: true,
            folderType: "personal",
            visibility: "public"
         })).toBe("ic-thumb-folder ic-thumb-folder-public");
      });

      it("should return the community folder class if the folder is owned by a community", function () {
         expect(_getFolderIconClass({
            isFolder: true,
            folderType: "community",
            visibility: "private"
         })).toBe("ic-thumb-folder ic-thumb-folder-community");
      });

      it("should return undefined if the item is not a folder", function () {
         expect(_getFolderIconClass({
            isFolder: false
         })).not.toBeDefined();
      });

      it("should return undefined if the folder type is not provided", function () {
         expect(_getFolderIconClass({
            isFolder: true
         })).not.toBeDefined();
      });

      it("should return undefined if the folder visibility is not provided", function () {
         expect(_getFolderIconClass({
            isFolder: true,
            folderType: "personal"
         })).not.toBeDefined();
      });

      it("should return undefined if the widget data is undefined", function () {
         expect(_getFolderIconClass()).not.toBeDefined();
      });
   });
}());
