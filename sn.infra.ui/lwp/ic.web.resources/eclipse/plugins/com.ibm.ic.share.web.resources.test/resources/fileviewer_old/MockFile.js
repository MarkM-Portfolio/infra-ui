/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([], function () {
   "use strict";

   return {
      getTitle: function () {
         return "buzz.png";
      },

      getExtension: function () {
         return "png";
      },

      getSize: function () {
         return 61817;
      },

      getModifier: function () {
         return {
            id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4",
            name: "Vivian Hanley",
            email: "vhanley@renovations.com",
            hasEmail: true,
            userState: "active"
         };
      },

      getUrlVia: function () {
         return "http://example.com/files/app/file/f2bfae48-1271-4d24-a552-102bef1dd57f";
      },

      getId: function () {
         return "f2bfae48-1271-4d24-a552-102bef1dd57f";
      },

      getUrlDownload: function () {
         return "http://example.com/files/form/anonymous/api/library/" +
            "06a5ed2d-fa61-4201-b522-ba57ea45a28d/document/" +
            "f2bfae48-1271-4d24-a552-102bef1dd57f/media/buzz.png";
      },
      getUrlThumbnail: function () {
         return "http://example.com/blah/thumbnail.png";
      },

      getUpdated: function () {
         return new Date(Date.UTC(2014, 9, 10, 4, 4, 32));
      },

      getPublished: function () {
         return new Date(Date.UTC(2014, 9, 10, 4, 4, 32));
      },

      isEncrypted: function () {
         return false;
      },

      getObjectTypeId: function () {
         return null;
      },

      getPermissions: function () {
         return {
            Edit: true
         };
      },

      getAuthor: function () {
         return {
            id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"
         };
      },

      getUrlEntry: function () {
         return "http://example.com/files/form/api/library/f2bfae48-1271-4d24-a552-102bef1dd57f/entry";
      }
   };
});
