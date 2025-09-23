/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "ic-share/fileviewer/widget/FileTypeIcon",
   "ic-share/fileviewer/config/globals",
   "dojo/Stateful"
], function (FileTypeIcon, globals, Stateful) {
   "use strict";

   describe("lock state", function () {
      beforeEach(function () {
         this.file = new Stateful();

         this.icon = new FileTypeIcon({
            file: this.file,
            nls: {
               LOCKED_BY_YOU: {
                  TODAY: "Locked by you",
                  YESTERDAY: "Locked by you",
                  DAY: "Locked by you",
                  MONTH: "Locked by you",
                  YEAR: "Locked by you"
               },
               LOCKED_BY_OTHER: {
                  TODAY: "Locked by ${user}",
                  YESTERDAY: "Locked by ${user}",
                  DAY: "Locked by ${user}",
                  MONTH: "Locked by ${user}",
                  YEAR: "Locked by ${user}"
               }
            }
         });

         this.currentUser = globals.currentUser;
         globals.currentUser = { name: "Thomas Watson", id: "17" };
      });

      afterEach(function () {
         globals.currentUser = this.currentUser;
      });

      describe("when the file is not locked", function () {
         beforeEach(function () {
            this.file.set("isLocked", false);
         });

         it("should return the default class", function () {
            expect(this.icon._getLockClass()).toEqual("ics-viewer-unlocked");
         });

         it("should return an empty lock string", function () {
            expect(this.icon._getLockString()).toBe("");
         });
      });

      describe("when the file is locked by another user", function () {
         beforeEach(function () {
            this.file.set("lock", { user: { name: "Thomas Watson", id: "abc-123" }});
            this.file.set("isLocked", true);
         });

         it("should return the 'by other' class", function () {
            expect(this.icon._getLockClass()).toEqual("ics-viewer-locked-by-other");
         });

         it("should return the 'by other' lock string", function () {
            expect(this.icon._getLockString()).toBe("Locked by Thomas Watson");
         });
      });

      describe("when the file is locked by the current user", function () {
         beforeEach(function () {
            this.file.set("lock", { user: { name: "Thomas Watson", id: "17" }});
            this.file.set("isLocked", true);
         });

         it("should return the 'by you' class", function () {
            expect(this.icon._getLockClass()).toEqual("ics-viewer-locked-by-you");
         });

         it("should return the 'by you' lock string", function () {
            expect(this.icon._getLockString()).toBe("Locked by you");
         });
      });
   });
});
