/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.widget.ThumbnailFactorySpec");
   dojo.require("dojo.cache");
   dojo.require("dojo.date.stamp");
   dojo.require("lconn.share.widget.ThumbnailFactory");
   dojo.require("lconn.share.test.util.TestHelper");
   
   var ThumbnailFactory = lconn.share.widget.ThumbnailFactory;
   var stamp = dojo.date.stamp;
   var TestHelper = lconn.share.test.util.TestHelper;
   
   var fileData = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/File/Published_WithoutDraft_Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/File/Published_WithoutDraft_Entry.xml")
   };
   
   var lockedFileData = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml")
   };
   
   var folderData = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/Folder/Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/Folder/Entry.xml")
   };
   
   describe("lconn.share.widget.ThumbnailFactory.createThumbnail", function() {
      
      it("should create a thumbnail widget for a file with basic data and a download callback", function() {
         var bean = TestHelper.loadFileContent(fileData);
         var spyDownload = jasmine.createSpy("Download");
         var spyPreview = jasmine.createSpy("Preview");
         var spySummary = jasmine.createSpy("Summary");
         var actions = {download: spyDownload,
                        preview: spyPreview,
                        summary: spySummary};
         var datePublished = stamp.fromISOString("2014-10-14T21:04:42.996Z");
         var dateUpdated = stamp.fromISOString("2014-10-15T14:25:09.984Z");

         var thumbnailWidget = ThumbnailFactory.createThumbnail(bean, 1, actions);   

         var callbackCounter = {};
         var i;
         for (i = 0; i < thumbnailWidget.value.actionListValue.length; i++) {
            if (thumbnailWidget.value.actionListValue[i].name == "Download") {
               expect(thumbnailWidget.value.actionListValue[i].callback).toBe(spyDownload);
               callbackCounter.download = true;
            }
            if (thumbnailWidget.value.actionListValue[i].name == "Preview") {
               expect(thumbnailWidget.value.actionListValue[i].callback).toBe(spyPreview);
               callbackCounter.preview = true;
            }
            if (thumbnailWidget.value.actionListValue[i].name == "Summary") {
               expect(thumbnailWidget.value.actionListValue[i].callback).toBe(spySummary);
               callbackCounter.summary = true;
            }
         }

         expect(thumbnailWidget.value.index).toBe(1);
         expect(thumbnailWidget.value.role).toBe("listitem");
         expect(thumbnailWidget.value.fileName).toBe("fish.jpg");
         expect(thumbnailWidget.value.fileAuthor.name).toBe("Amadou Alain");
         expect(thumbnailWidget.value.fileAuthor.id).toBe("81e18b48-1378-4850-b758-7212d0f6f479");
         expect(thumbnailWidget.value.fileModifier.name).toBe("Amadou Alain");
         expect(thumbnailWidget.value.fileModifier.id).toBe("81e18b48-1378-4850-b758-7212d0f6f479");
         expect(thumbnailWidget.value.fileType).toBe("jpg");
         expect(thumbnailWidget.value.fileDateModified).toBe(stamp.toISOString(dateUpdated));
         expect(thumbnailWidget.value.fileDatePublished).toBe(stamp.toISOString(datePublished));
         expect(callbackCounter.download).toBe(true);
         expect(callbackCounter.preview).toBe(true);
         expect(callbackCounter.summary).toBe(true);
      });
      it("should create a thumbnail widget for a file with a download link", function() {
         var bean = TestHelper.loadFileContent(fileData);
         var downloadHref = "http://benson.rtp.raleigh.ibm.com/dm/atom/library/612CF724-89EA-4562-8EB0-F7DBAA7187EA%3BA6FC234C-06ED-42E3-9442-E34B1A1AA9CC/document/%7B4E42E29B-B2AF-4AE4-BA30-3CB7793693B3%7D/media/%54%75%6c%69%70%73%2e%6a%70%67?follow=true";
         var actions = {download: downloadHref};
         
         var thumbnailWidget = ThumbnailFactory.createThumbnail(bean, 1, actions);   

         var callbackCounter = {};
         var i;
         for (i = 0; i < thumbnailWidget.value.actionListValue.length; i++) {
            if (thumbnailWidget.value.actionListValue[i].name == "Download") {
               expect(thumbnailWidget.value.actionListValue[i].href).toBe(downloadHref);
               callbackCounter.download = true;
            }
         }
         
         expect(callbackCounter.download).toBe(true);
      });
      it("should create a thumbnail widget for a folder with basic data", function() {
         var bean = TestHelper.loadFileContent(folderData);
         var spyOpen = jasmine.createSpy("Open");
         var actions = {open: spyOpen};
         var datePublished = stamp.fromISOString("2014-11-04T19:45:17.941Z");
         var dateUpdated = stamp.fromISOString("2014-11-04T19:45:17.941Z");
         
         var thumbnailWidget = ThumbnailFactory.createThumbnail(bean, 1, actions); 
         
         var callbackCounter = {};
         var i;
         for (i = 0; i < thumbnailWidget.value.actionListValue.length; i++) {
            if (thumbnailWidget.value.actionListValue[i].name == "Open") {
               if (thumbnailWidget.value.actionListValue[i].callback == spyOpen) {
                  callbackCounter.open = true;
               }
            }
         }

         expect(thumbnailWidget.value.index).toBe(1);
         expect(thumbnailWidget.value.role).toBe("listitem");
         expect(thumbnailWidget.value.fileName).toBe("Uploaded Docs Files");
         expect(thumbnailWidget.value.fileAuthor.name).toBe("Amadou Alain");
         expect(thumbnailWidget.value.fileAuthor.id).toBe("81e18b48-1378-4850-b758-7212d0f6f479");
         expect(thumbnailWidget.value.fileModifier.name).toBe("Amadou Alain");
         expect(thumbnailWidget.value.fileModifier.id).toBe("81e18b48-1378-4850-b758-7212d0f6f479");
         expect(thumbnailWidget.value.fileDateModified).toBe(stamp.toISOString(dateUpdated));
         expect(thumbnailWidget.value.fileDatePublished).toBe(stamp.toISOString(datePublished));
         expect(callbackCounter.open).toBe(true);
      });
      
    //TODO: Add Test case: IBM Docs logic to use view instead of preview

   });
   
   describe("lconn.share.widget.ThumbnailFactory._getFileLockStatus", function() {
      var authUser = {id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"};
      var anonymousUser = null;
      var anonymousUser2 = {};
      var anonymousUser3 = {id: ""};
      
      function checkFileVisibilityStatus(/* Object */ fileData, /* Integer */ i, /* String */ status, /* Object*/ authUser) {
         var bean = TestHelper.loadFileContent(fileData, i);
         if(status) {
           expect(ThumbnailFactory._getFileLockStatus(bean, authUser)).toBe(status);
         } else {
            expect(ThumbnailFactory._getFileLockStatus(bean, authUser)).toBeFalsy();
         }
      }
      
      it("should return undefined for file visibility string when the document is not locked", function() {
         checkFileVisibilityStatus(lockedFileData, 0, null, authUser);
      });
      it("should return 'locked' for file visibility string in the case of a different user", function() {
         checkFileVisibilityStatus(lockedFileData, 1, "locked", authUser);
      });
      it("should return 'locked' for file visibility string in the case of an anonymous user", function() {
         checkFileVisibilityStatus(lockedFileData, 1, "locked", anonymousUser);
      });
      it("should return 'locked' for file visibility string in the case of an anonymous user 2", function() {
         checkFileVisibilityStatus(lockedFileData, 1, "locked", anonymousUser2);
      });
      it("should return 'locked' for file visibility string in the case of an anonymous user 3", function() {
         checkFileVisibilityStatus(lockedFileData, 1, "locked", anonymousUser3);
      });
      it("should return 'lockedByMe' for file visibility string in the case or the same user", function() {
         checkFileVisibilityStatus(lockedFileData, 2, "lockedByMe", authUser);
      });
   });
}());
