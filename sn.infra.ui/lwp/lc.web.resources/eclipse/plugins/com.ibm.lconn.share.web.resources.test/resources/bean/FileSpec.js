/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.bean.FileSpec");
   dojo.require("dojo.cache");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.share.bean.File");
   dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
   dojo.require("lconn.share.test.util.TestHelper");

   var File = lconn.share.bean.File;
   var services = lconn.core.config.services;
   var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;
   var TestHelper = lconn.share.test.util.TestHelper;
   
   var draftEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/File/Draft_Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/File/Draft_Entry.xml")
   };
   
   var pendingDraftEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/File/Draft_Pending_Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/File/Draft_Pending_Entry.xml")
   };
   
   var rejectedDraftEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/File/Draft_Rejected_Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/File/Draft_Rejected_Entry.xml")
   };
   
   var nonDraftEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/File/Published_WithoutDraft_Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/File/Published_WithoutDraft_Entry.xml")
   };
   
   var ccmFileEntry = nonDraftEntry;
   
   var lockedFileFeed = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml"),
         content: dojo.cache("lconn.share.test", "data/Libraries/Library/Locked_Feed.xml")
   };

   var filesFileEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Files/File/Entry.xml"),
         content: dojo.cache("lconn.share.test", "data/Files/File/Entry.xml")
   };
   var personalFilesFileEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Files/File/Entry_Personal.xml"),
         content: dojo.cache("lconn.share.test", "data/Files/File/Entry_Personal.xml")
   };
   var filesFileEntry_NoThumbnail = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Files/File/Entry_NoThumbnail.xml"),
         content: dojo.cache("lconn.share.test", "data/Files/File/Entry_NoThumbnail.xml")
   };
   
   var filesMalwareUnscannedEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Files/File/Entry_MalwareUnscanned.xml"),
         content: dojo.cache("lconn.share.test", "data/Files/File/Entry_MalwareUnscanned.xml")
   };
   
   var filesMalwareCleanEntry = {
         templatePath: dojo.moduleUrl("lconn.share.test", "data/Files/File/Entry_MalwareClean.xml"),
         content: dojo.cache("lconn.share.test", "data/Files/File/Entry_MalwareClean.xml")
   };
   
   var viewServiceBaseName = "viewer";
   var mockViewerService = {
      
   };
   var originalViewerService = services.viewer;
   var viewerServiceMockedOut = false;

   var thumbnailData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
   var thumbnailData2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC";
   var emptyThumbnailData = null;
   var validSizeFormat = ThumbnailConstants.thumbnailSizes.small;
   var invalidSizeFormat = "Not a valid size format.";
   var emptySizeFormat = "";
   var sampleRepositoryName = "repositoryName";
   var emptyRepositoryName = null;
   var libraryContext = File.CONTEXTS.ECM.slice(-1)[0]; //This is specifically the classifier that the Thumbnail Widget will currently recognize.
   
   function mockOutViewerService() {
      services.viewer = mockViewerService;
      viewerServiceMockedOut = true;
   }
   function removeViewerService() {
      services.viewer = undefined;
      viewerServiceMockedOut = true;
   }
   function restoreViewerService() {
      services.viewer = originalViewerService;
      viewerServiceMockedOut = false;
   }
   
   describe("lconn.share.bean.File.getLibraryId", function() {
      var filesLibraryId = "73fba047-9982-49c9-be7c-a593dd32dd9b";
      function checkLibraryId(/* Object */ fileData, /* String */ id) {
         var bean = TestHelper.loadFileContent(fileData); 
            expect(bean.getLibraryId()).toBe(id);
      }
      it("should get the Library Id from a Files data entry", function() {
         checkLibraryId(filesFileEntry, filesLibraryId);
      });
      
      var exception = "Library id not returned in element";
      function checkNullFilesLibraryId(/* Object */ fileData) {
         var bean = TestHelper.loadFileContent(fileData); 
            expect( function() {bean.getLibraryId(); }).toThrow();
      }
      it("should throw exception when there is no files Library id", function() {
         checkNullFilesLibraryId(draftEntry);
      });
      
      function checkCcmLibraryId(/* Object */ fileData) {
         var bean = TestHelper.loadFileContent(fileData);
         bean._libraryType = "library";
         expect(bean.getLibraryId()).toBeFalsy();
      }
      it("should return null from ccm data entry", function() {
         checkCcmLibraryId(lockedFileFeed);
      });
   });

   describe("lconn.share.bean.File.getDraftStatus", function() {
      function checkDraftStatus(/* Object */ fileData, /* String */ status) {
         var bean = TestHelper.loadFileContent(fileData);
         expect(bean.getDraftStatus()).toBe(status);
      }
      
      it("should return a draft status", function() {
         checkDraftStatus(draftEntry, "draft");
      });
      it("should return a draft in review status", function() {
         checkDraftStatus(pendingDraftEntry, "draftReview");
      });
      it("should return a draft rejected status", function() {
         checkDraftStatus(rejectedDraftEntry, "draftRejected");
      });
      it("should return with no draft status", function() {
         checkDraftStatus(nonDraftEntry, null);
      });
   });
   
   describe("lconn.share.bean.File.getLockOwner", function() {
      function checkLockOwner(/* Object */ fileData, /* Integer */ i, /* String */ uid) {
         var bean = TestHelper.loadFileContent(fileData, i);
         if (uid) {
            expect(bean.getLockOwner().id).toBe(uid);
         } else {
            expect(bean.getLockOwner()).toBeFalsy();
         }
      }
      
      it("should return a lock owner for the first file", function() {
         checkLockOwner(lockedFileFeed, 1, "81e18b48-1378-4850-b758-7212d0f6f479");
      });
      it("should return a lock owner for the second file", function() {
         checkLockOwner(lockedFileFeed, 2, "d8a42d71-bdb9-46bd-a71c-1fe1226897b4");
      });
      it("should not return a lock owner", function() {
         checkLockOwner(lockedFileFeed, 0);
      });
   });
   
   // Data Methods
   
   
   describe("lconn.share.bean.File.(get|set)ThumbnailData functions", function() {
      var file;

      function checkThumbnailData(sizeFormat) {
         expect(file.getThumbnailData(sizeFormat)).toBeFalsy();

         // First run of setting data
         file.setThumbnailData(sizeFormat, thumbnailData);
         expect(file.getThumbnailData(sizeFormat)).toBe(thumbnailData);

         // Second run of setting data
         file.setThumbnailData(sizeFormat, thumbnailData2);
         expect(file.getThumbnailData(sizeFormat)).toBe(thumbnailData2);
      }
      
      function generateSetThumbnailFunctionWithParameters(/* Object */ file, /* String */ sizeFormat, /* String */ thumbnailData) {
         return dojo.hitch(file, "setThumbnailData", sizeFormat, thumbnailData);
      }
      
      beforeEach(function() {
         file = new File();
      });

      it("should correctly set \"small\" thumbnail data", function() {
         checkThumbnailData(ThumbnailConstants.thumbnailSizes.small);
      });
      it("should correctly set \"medium\" thumbnail data", function() {
         checkThumbnailData(ThumbnailConstants.thumbnailSizes.medium);
      });
      it("should correctly set \"large\" thumbnail data", function() {
         checkThumbnailData(ThumbnailConstants.thumbnailSizes.large);
      });
      it("should throw an error for an invalid size format", function() {
         expect(generateSetThumbnailFunctionWithParameters(file, invalidSizeFormat, thumbnailData)).toThrow();
      });
      it("should throw an error for an empty size format", function() {
         expect(generateSetThumbnailFunctionWithParameters(file, emptySizeFormat, thumbnailData)).toThrow();
      });
      it("should not break when using a valid size format to set 'empty' thumbnail data", function() {
         expect(generateSetThumbnailFunctionWithParameters(file, validSizeFormat, emptyThumbnailData)).not.toThrow();
         expect(file.getThumbnailData(validSizeFormat)).toBe(emptyThumbnailData);
      });
      //TODO: Why did I need the otherThumbnailSizes function for this test case??
   });
   
   describe("lconn.share.bean.File.(get|set)RepositoryName", function() {
      var file;
      
      function checkRepositoryName(/* String */ repositoryName) {
         expect(file.getRepositoryName()).toBeFalsy();
         file.setRepositoryName(repositoryName);
         expect(file.getRepositoryName()).toBe(repositoryName);
      }
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(filesFileEntry);
      });
      
      it("should successfully store and retrieve the repository name given", function() {
         checkRepositoryName(sampleRepositoryName);
      });
      it("should successfully store and retrieve an 'empty' repository name given", function() {
         checkRepositoryName(emptyRepositoryName);
      });
   });
   
   describe("lconn.share.bean.File.is(Files|Library)Context", function() {
      var file;
      
      beforeEach(function() {
         file = new File();
      });

      it("should report 'true' for a personal Files context", function() {
         file = TestHelper.loadFileContent(personalFilesFileEntry);
         expect(file.isFilesContext()).toBeTruthy();
         expect(file.isLibraryContext()).toBeFalsy();
      });
      it("should report 'true' for a community Files context", function() {
         file = TestHelper.loadFileContent(filesFileEntry);
         expect(file.isFilesContext()).toBeTruthy();
         expect(file.isLibraryContext()).toBeFalsy();
      });
      it("should report 'true' for a Library context", function() {
         file = TestHelper.loadFileContent(ccmFileEntry);
         file._libraryType = libraryContext; // The current workaround without IC Task 134136.  Remove when that is implemented.
         expect(file.isFilesContext()).toBeFalsy();
         expect(file.isLibraryContext()).toBeTruthy();
      });
      it("should report 'false' for any context", function() {
         expect(file.isFilesContext()).toBeFalsy();
         expect(file.isLibraryContext()).toBeFalsy();
      });
   });
   
   
   // URL Methods
   
   
   describe("lconn.share.bean.File.buildThumbnailUrl", function() {
      var file = new File();
      var sizeFormat = ThumbnailConstants.thumbnailSizes.medium;
      var emptyContext = "";
      var invalidContext = "invalidContext";
      
      function setupFile(
               /* Object */ file,
               /* Object */ fileData,
               /* Boolean */ repositoryName,
               /* String */ context) {
         
         if(fileData) {
            // Load file information from data entry
            // This will give us the CMIS Version Series Id
            file = TestHelper.loadFileContent(fileData);
         }
         
         if(repositoryName) {
            // Setting repository name that is needed to build the URL
            file.setRepositoryName(repositoryName);
         }
         
         if(context) {
            // This will allow us to build a URL for a CCM File
            // Files files currently will not build a URL, and it should return empty with any errors.
            file._libraryType = context;
         }
         
         return file;
      }
      
      beforeEach(function() {
         file = new File();
      });

      it("should not throw an error and not build a thumbnail for a Files file currently", function() {
         var url;
         file = setupFile(file, filesFileEntry);
         
         url = file.buildThumbnailUrl(sizeFormat);
         expect(url).toBeFalsy();
      });

      it("should not throw an error and build a thumbnail URL with all parameters", function() {
         var url;
         var expectedCMISVersionSeriesId = "idv_26438941-F5CC-41FD-929D-6249C7244D0D";
         mockOutViewerService();
         file = setupFile(file, ccmFileEntry, sampleRepositoryName, libraryContext);
         
         url = file.buildThumbnailUrl(sizeFormat);
         expect(url.indexOf(expectedCMISVersionSeriesId) > -1).toBeTruthy();
         expect(url.indexOf(sampleRepositoryName) > -1).toBeTruthy();
         expect(url.indexOf(sizeFormat) > -1).toBeTruthy();
         restoreViewerService();
      });
      
      it("sould not throw an error and not try to build a URL for a file without a context", function() {
         var url;
         file = setupFile(file, null, null, emptyContext);
         url = file.buildThumbnailUrl(sizeFormat);
         expect(url).toBeFalsy();
      });
      it("sould not throw an error and not try to build a URL for a file with an invalid context", function() {
         var url;
         file = setupFile(file, null, null, invalidContext);
         url = file.buildThumbnailUrl(sizeFormat);
         expect(url).toBeFalsy();
      });
      
      it("should throw an error and not be able to build a thumbnail URL without a respository name", function() {
         file = setupFile(file, ccmFileEntry, null, libraryContext);
         
         expect(function() {file.buildThumbnailUrl(sizeFormat);}).toThrow();
      });
      it("should throw an error and not be able to build a thumbnail URL with an 'empty' respository name", function() {
         file = setupFile(file, ccmFileEntry, emptyRepositoryName, libraryContext);
         
         expect(function() {file.buildThumbnailUrl(sizeFormat);}).toThrow();
      });
      
      it("should not throw an error and not be able to build a thumbnail URL without a cmisVersionSeriesId", function() {
         var url;
         file = setupFile(file, draftEntry, sampleRepositoryName, libraryContext);
         
         url = file.buildThumbnailUrl(sizeFormat);
         expect(url).toBeFalsy();
      });
      
      it("should throw an error and not be able to build a thumbnail URL without a size format specified", function() {
         file = setupFile(file, ccmFileEntry, sampleRepositoryName, libraryContext);
         expect(function() {file.buildThumbnailUrl();}).toThrow();
      });
      it("should throw an error and not be able to build a thumbnail URL with an 'empty' size format specified", function() {
         file = setupFile(file, ccmFileEntry, sampleRepositoryName, libraryContext);
         expect(function() {file.buildThumbnailUrl(emptySizeFormat);}).toThrow();
      });

      it("should throw an error and not be able to build a thumbnail URL when the Viewer service is not installed", function() {
         removeViewerService();
         file = setupFile(file, ccmFileEntry, sampleRepositoryName, libraryContext);
         
         expect(function() {file.buildThumbnailUrl(sizeFormat);}).toThrow();
         restoreViewerService();
      });
   });
   
   describe("lconn.share.bean.File.getThumbnailUrl", function() {
      var file;
      var sizeFormat = ThumbnailConstants.thumbnailSizes.medium;
      var fileThumbnailURL = "http://garner.rtp.raleigh.ibm.com/files/form/anonymous/api/library/73fba047-9982-49c9-be7c-a593dd32dd9b/document/0e520ee3-6146-4585-ae5c-eb090b66670d/thumbnail?renditionKind=mediumview";
      
      function setupSources(
               /* Object */ file,
               /* Boolean */ setThumbnailData,
               /* Object */ fileData,
               /* Boolean */ setRepositoryName) {
         
         if(fileData) {
            // Setting file data entry as the 2nd source
            file = TestHelper.loadFileContent(fileData);
         }
         
         if(setThumbnailData) {
            // Setting explicit thumbnail data as the 1st source
            file.setThumbnailData(sizeFormat, thumbnailData);
         }
         
         if(setRepositoryName) {
            // Setting repository name that is needed to build the URL as the 3rd source
            file.setRepositoryName(sampleRepositoryName);
         }
         
         return file;
      }
      
      beforeEach(function() {
         file = new File();
      });

      it("should retrieve the stored \"medium\" thumbnail data", function() {
         file = setupSources(file, true, null, true);
         
         expect(file.getThumbnailUrl(sizeFormat)).toBe(thumbnailData);
      });
      it("should retrieve the stored \"medium\" thumbnail data", function() {
         file = setupSources(file, true, null, true);
         
         expect(file.getThumbnailUrl(sizeFormat)).toBe(thumbnailData);
      });
      it("should retrieve the stored \"medium\" thumbnail data even when the thumbnail URL exists on the data entry", function() {
         file = setupSources(file, true, filesFileEntry, true);
         
         expect(file.getThumbnailUrl(sizeFormat)).toBe(thumbnailData);
      });
      it("should retrieve the \"medium\" thumbnail URL from the data entry with the meaningless \"size\" parameter, when the thumbnail data isn't set", function() {
         file = setupSources(file, false, filesFileEntry, true);
         
         expect(file.getThumbnailUrl(sizeFormat)).toBe(fileThumbnailURL);
      });
      it("should retrieve the \"medium\" thumbnail URL from the data entry without the meaningless \"size\" parameter, when the thumbnail data isn't set", function() {
         file = setupSources(file, false, filesFileEntry, true);
         
         expect(file.getThumbnailUrl()).toBe(fileThumbnailURL);
      });
      it("should build the \"medium\" thumbnail URL when operating on a CCM file with the cmisVersionSeriesId, when the thumbnail data isn't set or the thumbnail URL isn't present on the data entry", function() {
         mockOutViewerService();
         file = setupSources(file, false, ccmFileEntry, true);
         file._libraryType = libraryContext;
         
         expect(file.getThumbnailUrl(sizeFormat)).toBe(file.buildThumbnailUrl(sizeFormat));
         removeViewerService();
      });
      it("should return an 'empty' thumbnail URL for a Files file", function() {
         var url;
         file = setupSources(file, false, filesFileEntry_NoThumbnail, false);
         
         url = file.getThumbnailUrl(sizeFormat);
         expect(url).toBeFalsy();
      });
      it("should throw an error when the thumbnail data is not set beforehand, the data entry does not have a thumbnail URL, and the repository name is not set", function() {
         file = setupSources(file, false, ccmFileEntry, false);
         file._libraryType = libraryContext;
         
         expect(function(){file.getThumbnailUrl(sizeFormat);}).toThrow();
      });
   });
   
   
   // Id Methods
   
   
   describe("lconn.share.bean.File.getVersionId", function() {
      var file;
      var expectedVersionId = "838125a3-b340-4eba-8172-fb4389d1e011";
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(filesFileEntry);
      });
      it("should get the Version Id from a Files data entry", function() {
         expect(file.getVersionId()).toBe(expectedVersionId);
      });
   });
   
   // Note: As of FNCS 2.0.3, this tag does not naturally occur in the response data.
   // When a fix pack of the same major version, or a newer major version is integrated
   //  into Connections, update this test.
   describe("lconn.share.bean.File.getCMISVersionId", function() {
      var file;
      var expectedCMISVersionId = ""; // TODO: Change string literal to value found in file
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(); // TODO: Change to a file that contains a CMIS Version Id
      });
      xit("should get the CMIS Version Id from a CCM data entry", function() {
         expect(file.getCMISVersionId()).toBe(expectedCMISVersionId);
      });
   });
   describe("lconn.share.bean.File.getCMISVersionSeriesId", function() {
      var file;
      var expectedCMISVersionSeriesId = "idv_26438941-F5CC-41FD-929D-6249C7244D0D";
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(nonDraftEntry);
      });
      it("should get the CMIS Version Series Id from a CCM data entry", function() {
         expect(file.getCMISVersionSeriesId()).toBe(expectedCMISVersionSeriesId);
      });
   });
   describe("lconn.share.bean.File.getCMISDocumentId", function() {
      var file;
      var expectedCMISDocumentId = "idd_B3F0C71F-2ADC-4BCB-8EC8-E9E8F1976F71";
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(draftEntry);
      });
      it("should get the CMIS Document Id from a CCM data entry", function() {
         expect(file.getCMISDocumentId()).toBe(expectedCMISDocumentId);
      });
   });
   describe("lconn.share.bean.File.getVersionIdFromNexusId", function() {
      var file;
      var expectedVersionId = "idd_B3F0C71F-2ADC-4BCB-8EC8-E9E8F1976F71";
      
      beforeEach(function() {
         file = TestHelper.loadFileContent(draftEntry);
      });
      it("should get the Version Id from a CCM data entry by building it from the Nexus Id", function() {
         expect(file.getVersionIdFromNexusId()).toBe(expectedVersionId);
      });
   });
   describe("lconn.share.bean.File.getBatchThumbnailId", function() {
      var file;
      
      it("should get the Version Id from a Files data entry", function() {
         file = TestHelper.loadFileContent(filesFileEntry);
         expect(file.getBatchThumbnailId()).toBe(file.getVersionId());
      });
      // Note: As of FNCS 2.0.3, this tag does not naturally occur in the response data.
      //       When a fix pack of the same major version, or a newer major version is integrated
      //        into Connections, update this test.
      xit("should get the CMIS Version Id from a CCM data entry", function() {
         file = TestHelper.loadFileContent(); // TODO: Change to a file that contains a CMIS Version Id
         expect(file.getBatchThumbnailId()).toBe(file.getCMISVersionId());
      });
      it("should get the CMIS Document Id from a CCM data entry", function() {
         file = TestHelper.loadFileContent(draftEntry);
         expect(file.getBatchThumbnailId()).toBe(file.getCMISDocumentId());
      });
      it("should get the Version Id from a CCM data entry by building it from the Nexus Id", function() {
         file = TestHelper.loadFileContent(draftEntry);
         expect(file.getBatchThumbnailId()).toBe(file.getVersionIdFromNexusId());
      });
   });
   describe("lconn.share.bean.File.getSingleThumbnailId", function() {
      var file;
      
      it("should get the CMIS Version Series Id from a CCM data entry", function() {
         file = TestHelper.loadFileContent(nonDraftEntry);
         expect(file.getSingleThumbnailId()).toBe(file.getCMISVersionSeriesId());
      });
   });
   describe("lconn.share.bean.File.getPublishedTitle", function() {
      function checkPublishedTitle(/* Object */ fileData, /* String */ publishedTitle) {
         var bean = TestHelper.loadFileContent(fileData);
         expect(bean.getPublishedTitle()).toBe(publishedTitle);
      }
      it("should return a published title for draft", function() {
         var expectedTitle1 = "gallery_accessibility_issues.odp";
         checkPublishedTitle(draftEntry, expectedTitle1);
      });
      it("should return a published title for rejected draft", function() {
         var expectedTitle2 = "fishdance.gif";
         checkPublishedTitle(rejectedDraftEntry, expectedTitle2);
      });
      it("should return a published title for published file", function() {
         var expectedTitle3 = "fish.jpg";
         checkPublishedTitle(nonDraftEntry, expectedTitle3);
      });
   });
   
   describe("lconn.share.bean.File.getMalwareScanState", function() {
      function checkPublishedTitle(/* Object */ fileData, /* String */ expectedState) {
         var bean = TestHelper.loadFileContent(fileData);
         expect(bean.getMalwareScanState()).toBe(expectedState);
      }
      it("should return 'unscanned' for malware scan state", function() {
        var expectedState = "unscanned";
         checkPublishedTitle(filesMalwareUnscannedEntry, expectedState);
      });
      it("should return 'clean' for malware scan state", function() {
          var expectedState = "clean";
           checkPublishedTitle(filesMalwareCleanEntry, expectedState);
        });
   });
}());
