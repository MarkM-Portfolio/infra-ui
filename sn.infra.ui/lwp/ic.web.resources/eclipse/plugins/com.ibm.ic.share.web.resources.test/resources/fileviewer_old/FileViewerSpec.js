/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/FileViewer",
   "dojo/_base/array",
   "dojo/_base/lang",
   "./MockFile"
], function (FileViewer, array, lang, fileData) {
   "use strict";

   describe("FileViewer.createConnectionsFile()", function () {
      beforeEach(function () {
         this.file = FileViewer.createConnectionsFile(fileData);
      });

      it("should decorate the object with 'connections'", function () {
         expect(this.file.type).toEqual("connections");
      });

      it("should extract the file info from the bean", function () {
         expect(this.file.args).toEqual({
            name: "buzz.png",
            type: "png",
            id: "f2bfae48-1271-4d24-a552-102bef1dd57f",
            size: 61817,
            modifier: {
               id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4",
               name: "Vivian Hanley",
               email: "vhanley@renovations.com",
               hasEmail: true,
               userState: "active"
            },
            created: new Date(Date.UTC(2014, 9, 10, 4, 4, 32)),
            updated: new Date(Date.UTC(2014, 9, 10, 4, 4, 32)),
            isEncrypted: false,
            objectTypeId: null,
            permissions: {
               Edit: true
            },
            author: {
               id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"
            },
            links: {
               download: "http://example.com/files/form/anonymous/api/library/" +
                  "06a5ed2d-fa61-4201-b522-ba57ea45a28d/document/" +
                  "f2bfae48-1271-4d24-a552-102bef1dd57f/media/buzz.png",
               details: "http://example.com/files/app/file/f2bfae48-1271-4d24-a552-102bef1dd57f",
               thumbnail: "http://example.com/blah/thumbnail.png",
               entry: "http://example.com/files/form/api/library/f2bfae48-1271-4d24-a552-102bef1dd57f/entry"
            }
         });
      });
   });

   describe("FileViewer.addFile()", function () {
      beforeEach(function () {
         var data = [ fileData, fileData, fileData ];
         this.files = [];

         array.forEach(data, function (d) {
            this.files.push(FileViewer.createConnectionsFile(d));
         }, this);

         this.viewer = FileViewer.create();
      });

      it("should leave next and previous undefined when there is only one file", function () {
         this.viewer.addFile(this.files[0]);

         expect(this.files[0].paging.previous).not.toBeDefined();
         expect(this.files[0].paging.next).not.toBeDefined();
      });

      it("should set next and previous when there are multiple files", function () {
         array.forEach(this.files, lang.hitch(this.viewer, "addFile"));

         expect(this.files[0].paging.previous).not.toBeDefined();
         expect(this.files[0].paging.next.args).toBe(this.files[1].args);

         expect(this.files[1].paging.previous.args).toBe(this.files[0].args);
         expect(this.files[1].paging.next.args).toBe(this.files[2].args);

         expect(this.files[2].paging.previous.args).toBe(this.files[1].args);
         expect(this.files[2].paging.next).not.toBeDefined();
      });

      it("should set the ID of each file", function () {
         array.forEach(this.files, function (file, index) {
            this.viewer.addFile(file);
            expect(file.id).toBe(index);
         }, this);
      });
   });
});
