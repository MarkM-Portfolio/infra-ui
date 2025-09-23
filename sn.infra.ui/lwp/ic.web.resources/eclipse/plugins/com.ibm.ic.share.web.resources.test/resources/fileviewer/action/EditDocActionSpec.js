/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/action/EditDocAction",
  "dojo/_base/array",
  "ic-share/fileviewer/FileViewer",
  "../MockFile",
  "dojo/Deferred",
  "dojo/_base/lang"
], function (EditDocAction, array, FileViewer, fileData, Deferred, lang) {
  "use strict";

  describe("EditDocAction", function () {
    beforeEach(function () {
      var deferred = new Deferred();
      this.spy = jasmine.createSpy("show");

      EditDocAction.create({
        file: FileViewer.createConnectionsFile(fileData),
        show: this.spy,
        hide: function () {
          return;
        },
        entitlements: {
          getDocsDfd: function () {
            return deferred;
          }
        }
      });

      this.deferred = deferred;
    });

    it("should be visible if the user has an editor entitlement", function () {
      this.deferred.resolve(true);
      expect(this.spy).toHaveBeenCalled();
    });

    it("should not be visible if the user has an editor entitlement", function () {
      this.deferred.resolve(false);
      expect(this.spy).not.toHaveBeenCalled();
    });
  });

  describe("EditDocAction.isValid()", function () {
    var valid = [ "doc", "docx", "odt" ],
      invalid = [ "jpg", "foo", "", null ], 
      file, args, ownerUser, nonOwnerUser;

    beforeEach(function () {
      file = FileViewer.createConnectionsFile(fileData);
      ownerUser = lang.clone(fileData.getAuthor());
      nonOwnerUser = { id: "z8a42d71-bdb9-46bg-a71c-1fe1236897b4" };
      args = {};
    });

    array.forEach(valid, function (type) {
      it("should return true for " + type, function () {
        expect(EditDocAction.isValid({ args: { type: type, _isDocsFile: true } })).toBeTruthy();
      });
    });

    array.forEach(invalid, function (type) {
      it("should return false for " + type, function () {
        expect(EditDocAction.isValid({ args: { type: type, _isDocsFile: true } })).toBeFalsy();
      });
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

    it("should return true for a Connections file", function () {
      file.args.type = "docx";
      file.type = "connections";
      args.currentUser = ownerUser;
      expect(EditDocAction.isValid(file, args)).toBe(true);
    });
    
    it("should return false for a Verse file", function () {
      file.args.type = "docx";
      file.type = "verse";
      args.currentUser = ownerUser;
      expect(EditDocAction.isValid(file, args)).toBe(false);
    });
  });
});
