/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/action/EditDocAction",
   "ic-share/fileviewer/FileViewer",
   "dojo/_base/lang",
   "../MockFile"
], function (EditDocAction, FileViewer, lang, MockFile) {
   "use strict";

   describe("EditDocAction.isValid()", function () {
      var file, args, ownerUser, nonOwnerUser;

      beforeEach(function () {
         file = FileViewer.createConnectionsFile(MockFile);
         ownerUser = lang.clone(MockFile.getAuthor());
         nonOwnerUser = { id: "z8a42d71-bdb9-46bg-a71c-1fe1236897b4" };
         args = {};
      });

      it("should return true for a Docs file that the user is an owner", function () {
         file.args.type = "docx";
         file.args._isDocsFile = true;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(true);
      });

      it("should return true for a Docs file that the user is an non-owner", function () {
         file.args.type = "docx";
         file.args._isDocsFile = true;
         args.currentUser = nonOwnerUser;
         expect(EditDocAction.isValid(file, args)).toBe(true);
      });

      it("should return true for a non-Docs file that the user is an owner", function () {
         file.args.type = "docx";
         file.args._isDocsFile = false;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(true);
      });

      it("should return false for a non-Docs file that the user is a non-owner", function () {
         file.args.type = "docx";
         file.args._isDocsFile = false;
         args.currentUser = nonOwnerUser;
         expect(EditDocAction.isValid(file, args)).toBe(false);
      });

      it("should return false for a filetype that cannot be opened in the Docs editor", function () {
         file.args.type = "bat";
         file.args._isDocsFile = true;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(false);
      });

      it("should return false if the file is encrypted", function () {
         file.args.type = "docx";
         file.args._isDocsFile = true;
         file.args.isEncrypted = true;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(false);
      });

      it("should return true for a docx file of size 0", function () {
         file.args.type = "docx";
         file.args._isDocsFile = true;
         file.args.size = 0;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(true);
      });

      it("should return false for a csv file of size 0", function () {
         file.args.type = "csv";
         file.args._isDocsFile = true;
         file.args.size = 0;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(false);
      });

      it("should return false for a txt file of size 0", function () {
         file.args.type = "csv";
         file.args._isDocsFile = true;
         file.args.size = 0;
         args.currentUser = ownerUser;
         expect(EditDocAction.isValid(file, args)).toBe(false);
      });
   });
});
