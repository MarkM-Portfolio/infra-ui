/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([], function () {
   "use strict";

   return {
      getName: function () {
         return "buzz.png";
      },

      getExtension: function () {
         return "png";
      },

      getSize: function () {
         return 61817;
      },
      
      getTotalSize: function () {
        return 71996;
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
      },

      getUrlAlternate: function () {
        return "http://garner.rtp.raleigh.ibm.com/communities/service/html/communityview?" + 
        "communityUuid=82d87c43-0edb-44a5-bfe1-5a435f3f3e77#fullpageWidgetId=Wdf806667c474_44ee_9a98_4b11fafc847c" +
        "&file=c20a3a2b-fb9c-4734-ac12-ae5ee5727cdc";
      },

      getLibraryType: function () {
        return "communityFiles";
      },

      getVisibility: function () {
        return "public";
      },

      isViralShareAllowed: function () {
        return false;
      },
      
      getUrlRecommendation: function () {
        return "http://example.rtp.raleigh.ibm.com/files/basic/api/library/3ed14df6-c5b5-42f1-b964-de4ccc3f8663" + 
          "/document/c0f3b1a8-dedf-4372-918a-2a280f7745fa/recommendation/d8a42d71-bdb9-46bd-a71c-1fe1226897b4/entry";
      },
      getVersionCount: function() {
        return 3;
      },
      
      getCurrentVersionLabel: function () {
        return 3;
      },

      getRatingCount: function () {
        return 8;
      },
      
      getCommentCount: function () {
        return 1;
      },

      getTimesDownloaded: function () {
        return 13;
      },

      getTimesDownloadedAnonymously: function () {
        return 7;
      },
      getDescription: function() {
        return "Test Desc.";
      },
      getTags: function() {
        var tags = ["testtag1"];
        return tags[0];
      },
      
      isExternal: function () {
        return false;
      }
   };
});
