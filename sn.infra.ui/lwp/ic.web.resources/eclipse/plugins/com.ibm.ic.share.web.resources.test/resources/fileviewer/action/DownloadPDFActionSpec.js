/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/action/DownloadPDFAction",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/topic",
   "dojo/string",
   "dojo/when",
   "dojox/lang/functional/object",
   "../MockFileBean",
   "ic-share/fileviewer/config/globals",
   "ic-share/fileviewer/util/network",
   "ic-share/fileviewer/util/ibmDocs"
], function (DownloadPDFAction, i18n, lang, array, topic, string, when, object, MockFileBean, globals, networkUtil, ibmDocs) {
   "use strict";

   var mainNLS = i18n.ACTION.DOWNLOAD_AS_PDF;

   describe("ic-share/fileviewer/action/DownloadPDFAction", function () {

      var mockFileNotDocs = {
        bean: MockFileBean
      };
      // TODO: See if we can get clone to work instead.  Fails with "TypeError: Illegal constructor".
      //var mockFileNotDocs = lang.clone(mockFileNotDocs);
      /*var mockFileNotDocs = {
        bean: MockFileBean
      }*/
      //mockFileNotDocs.bean.set("isDocsFile", true);
      
      

      // Testing class (static) functional members

      var originalIsDocsFile, _beanModified;
      function getDownloadPDFAction(useDocsBean) {
        if(_beanModified) {
          throw "Error: \"getDownloadPDFAction\" called when bean has already been modified.  Please restore the bean when a test is complete.";
        }
        var downloadPDFAction;
        if (useDocsBean) {
          originalIsDocsFile = mockFileNotDocs.bean.get("isDocsFile");
          mockFileNotDocs.bean.set("isDocsFile", true);
          _beanModified = true;
        }
        downloadPDFAction = DownloadPDFAction.create({file: mockFileNotDocs});

        return downloadPDFAction;
      }

      function restoreBeanState() {
        if(_beanModified) {
          mockFileNotDocs.bean.set("isDocsFile", originalIsDocsFile);
          _beanModified = false;
        } else {
          throw "Error: \"restoreBeanState\" called when bean has not been modified.";
        }
      }

      describe("create", function () {
        it("should create our DownloadPDFAction with the appropriate properties set", function () {
          var downloadPDFAction = getDownloadPDFAction(false);
          expect(downloadPDFAction).not.toBeFalsy();
          expect(downloadPDFAction.nls).not.toBeFalsy();
          expect(downloadPDFAction.name).not.toBeFalsy();
          expect(downloadPDFAction.title).not.toBeFalsy();
          expect(downloadPDFAction.a11y).not.toBeFalsy();
          expect(downloadPDFAction.groupId).toBeDefined();
        });
      });
      
      describe("isValid", function () {
        var originalIsDocsFile;
        
        beforeEach(function () {
          originalIsDocsFile = mockFileNotDocs.bean.get("isDocsFile");
        });
        
        afterEach(function () {
          mockFileNotDocs.bean.set("isDocsFile", originalIsDocsFile);
        });
        
        
        it("should return false for an environment without IBM Docs, and also when it is looking at a non-IBM Docs file", function () {
          spyOn(ibmDocs, "isDocsEnabled").and.returnValue(false);
          when(DownloadPDFAction.isValid(mockFileNotDocs), function (value) {
            expect(value).toBeFalsy();
          });
        });

        it("should return false for an environment with IBM Docs, but when it is looking at a non-IBM Docs file", function () {
          spyOn(ibmDocs, "isDocsEnabled").and.returnValue(true);
          when(DownloadPDFAction.isValid(mockFileNotDocs), function (value) {
            expect(value).toBeFalsy();
          });
        });

        it("should return false for an environment without IBM Docs, even when it is looking at an IBM Docs file", function () {
          spyOn(ibmDocs, "isDocsEnabled").and.returnValue(false);
          mockFileNotDocs.bean.set("isDocsFile", true);
          when(DownloadPDFAction.isValid(mockFileNotDocs), function (value) {
            expect(value).toBeFalsy();
          });
        });

        it("should return true for an environment with IBM Docs, and when it is looking at an IBM Docs file", function () {
          spyOn(ibmDocs, "isDocsEnabled").and.returnValue(true);
          mockFileNotDocs.bean.set("isDocsFile", true);
          when(DownloadPDFAction.isValid(mockFileNotDocs), function (value) {
            expect(value).toBeTruthy();
          });
        });
      });

      describe("getClassName", function () {
        it("should return the classname to use for the action's styling or UI automation anchor", function () {
          expect(DownloadPDFAction.getClassName()).not.toBeFalsy();
        });
      });



      // Testing instance functional members

      describe("onLinkClicked", function () {
        it("should not attempt to make any download call for a file that is unable to be downloaded as a PDF", function () {
          var downloadPDFAction = getDownloadPDFAction(false);
          spyOn(downloadPDFAction, "doDownload");
          spyOn(downloadPDFAction, "canDownloadAsPDF").and.returnValue(false);
          downloadPDFAction.onLinkClicked();
          expect(downloadPDFAction.canDownloadAsPDF).toHaveBeenCalled();
          expect(downloadPDFAction.doDownload).not.toHaveBeenCalled();
        });
        it("should attempt to make a normal download call for a file that is able to be downloaded as a PDF", function () {
          var downloadPDFAction = getDownloadPDFAction(true);
          spyOn(downloadPDFAction, "doDownload");
          spyOn(downloadPDFAction, "canDownloadAsPDF").and.returnValue(true);
          downloadPDFAction.onLinkClicked();
          expect(downloadPDFAction.doDownload).toHaveBeenCalled();
          restoreBeanState();
        });
      });

      describe("canDownloadAsPDF", function () {
        var originalFileSize;
        var fileViewerUIMessageTopicName = "ic-fileviewer/push/messages";
        
        beforeEach(function () {
          originalFileSize = mockFileNotDocs.bean.get("size");
        });
        
        afterEach(function () {
          mockFileNotDocs.bean.set("size", originalFileSize);
        });
        
        it("should publish an error message topic with the approriate parameters when called", function () {
          var downloadPDFAction = getDownloadPDFAction(false);
          spyOn(topic, "publish");
          mockFileNotDocs.bean.set("size", 0);
          expect(downloadPDFAction.canDownloadAsPDF()).toBeFalsy();
          expect(topic.publish).toHaveBeenCalled();
          expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerUIMessageTopicName);
          expect(topic.publish.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
            type: "error",
            message: mainNLS.DOCS_ERRORS.NO_PUBLISHED_OR_EMPTY,
            cancelable: true
          }));
        });
          
         it("should not publish an error message topic, and instead", function () {
           var downloadPDFAction = getDownloadPDFAction(false);
           spyOn(topic, "publish");
           mockFileNotDocs.bean.set("size", 1);
           expect(downloadPDFAction.canDownloadAsPDF()).toBeTruthy();
           expect(topic.publish).not.toHaveBeenCalled();
         });
      });

      describe("doDownload", function () {
        it("should publish an error message topic with the approriate parameters when called", function () {
          var downloadPDFAction = getDownloadPDFAction(false);
          spyOn(window, "open");
          spyOn(downloadPDFAction, "getDocsLink");
          downloadPDFAction.doDownload();
          expect(window.open).toHaveBeenCalled();
          expect(window.open.calls.argsFor(0)[1]).toEqual("_blank");
        });
      });

      describe("getDocsLink", function () {
        it("should publish an error message topic with the approriate parameters when called", function () {
          var downloadPDFAction = getDownloadPDFAction(false);
          spyOn(string, "substitute");
          var fakeServicesSpyObj = jasmine.createSpyObj('services', ['getDocsUrl']);
          downloadPDFAction.services = fakeServicesSpyObj;
          var docsLinkUrl = downloadPDFAction.getDocsLink(mockFileNotDocs.bean.get("id"));
          expect(downloadPDFAction.services.getDocsUrl).toHaveBeenCalled();
          expect(string.substitute).toHaveBeenCalled();
          expect(string.substitute.calls.argsFor(0)[0].indexOf("${id}") > -1).toBeTruthy();
          expect(string.substitute.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
            id: mockFileNotDocs.bean.get("id")
          }));
          expect(docsLinkUrl).toBeTruthy();
          expect(docsLinkUrl.indexOf("asFormat=pdf") > -1);
        });
      });
   });
});